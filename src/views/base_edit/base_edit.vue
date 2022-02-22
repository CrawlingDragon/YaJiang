<template>
  <div class="base_edit-container">
    <Header :indexHeader="false">
      <div class="icon" @click="goBack">
        <van-icon name="arrow-left" class="back-icon" />
        <span class="back">返回</span>
      </div>
    </Header>
    <div class="edit-container">
      <van-form @submit="onSubmit">
        <van-field
          class="case"
          readonly
          clickable
          autosize
          name="case"
          type="textarea"
          rows="1"
          v-model="caseValue"
          label="方案"
          placeholder="请选择"
          @click="clickCase"
          :rules="[{ required: true, message: '方案不能为空' }]"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-picker
            ref="casePick"
            show-toolbar
            :columns="caseColumns"
            @confirm="onCaseConfirm"
            @cancel="showPicker = false"
            :key="caseValue"
          />
        </van-popup>
        <div>
          <van-field
            readonly
            clickable
            name="datetime"
            v-model="date"
            label="时间"
            placeholder="添加时间"
            @click="show = true"
            :rules="[{ required: true, message: '时间不能为空' }]"
          />
          <van-calendar
            title="请选择开始和结束日期"
            v-model:show="show"
            type="range"
            :allow-same-day="true"
            @confirm="onTimeConfirm"
            color="#155BBB"
            :min-date="minDate"
            :max-date="maxDate"
          />
          <van-field
            v-model="message"
            rows="2"
            autosize
            label="记录"
            type="textarea"
            maxlength="500"
            placeholder="文字添加记录内容"
            show-word-limit
            :rules="[{ required: true, message: '记录不能为空' }]"
          />
          <van-field name="uploader" label="照片">
            <template #input>
              <van-uploader
                v-model="uploader"
                :after-read="afterRead"
                :before-delete="deleteItem"
                accept="image/*"
                :max-count="6"
                :before-read="beforeRead"
              />
            </template>
          </van-field>
        </div>
        <div class="use-medicine">
          <div class="title">用药</div>
          <div
            class="add-box van-hairline--bottom"
            v-for="(item, index) in medicine"
            :key="item.specid"
          >
            <van-icon name="cross" class="cross" @click="closeMedicine(index)" />
            <div class="medicine-li">
              <van-field
                readonly
                clickable
                name="picker"
                v-model="item.name"
                label="名称"
                placeholder="请选择药品"
                @click="clickChooseDrug(index)"
                :rules="[{ required: true, message: '药品名称不能为空' }]"
              />
              <van-popup v-model:show="drugPicker" position="bottom">
                <!-- 选择药品 -->
                <van-picker
                  show-toolbar
                  :columns="medicineColumns"
                  @confirm="onDrugConfirm"
                  @cancel="drugPicker = false"
                />
              </van-popup>
            </div>
            <div>
              <van-field
                readonly
                clickable
                name="picker"
                v-model="item.spec"
                label="规格"
                placeholder="请选择规格"
                @click="clickChooseDrugSize(index)"
                :rules="[{ required: true, message: '规格不能为空' }]"
              />
              <van-popup v-model:show="guigeShow" position="bottom">
                <van-picker
                  show-toolbar
                  :columns="afterDrugSizeColumns"
                  @confirm="onDrugSizeConfirm"
                  @cancel="guigeShow = false"
                />
              </van-popup>
            </div>
            <van-field
              v-model="item.quantity"
              name="用量/用法"
              label="用量/用法"
              placeholder="请输入用量/用法"
              class="number"
              :rules="[{ required: true, message: '用量/用法不能为空' }]"
            />
          </div>
          <div class="add-btn-title" @click="addMedicine">增加</div>
        </div>
        <div class="submit-wrap">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            class="submit"
            color="#155BBB"
            >发布</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import Header from '@/components/header/header.vue';
import { mapState } from 'vuex';
// import EXIF from "exif-js";
import Compressor from 'compressorjs';
export default {
  metaInfo: {
    title: '发布农事',
  },
  name: 'base_edit',
  components: { Header },
  props: {},
  data() {
    return {
      eitdObj: '', //编辑内容对象
      caseValue: '',
      caseId: '',
      caseColumns: [],
      showPicker: false,
      date: '',
      minDate: new Date(2010, 1, 1),
      maxDate: new Date(2030, 1, 1),
      show: false,
      message: '',
      uploader: [],
      imgList: [],
      medicine: [],
      drugValue: '',
      medicineColumns: [],
      drugSizeValue: '', // 规格
      // drugSizeColumns: [],
      drugNumber: 0,
      haveMedicine: false,
      drugPicker: false,
      guigeShow: false,
      chooseDrugActiveIndex: 0, //选中的点击用药索引
      chooseDrugSizeActive: 0,
      pId: 0, //农事记录的id，用于获取农事记录的id
    };
  },
  computed: {
    ...mapState(['mid', 'uId']),
    classId() {
      //获取路由classId参数
      return this.$route.query.classId;
    },
    id() {
      // 获取路由id参数
      return this.$route.query.id;
    },
    afterDrugSizeColumns() {
      // 找到对应的规格pciker数据
      let arr = [];
      this.medicineColumns.forEach((item) => {
        if (this.medicine[this.chooseDrugSizeActive].productid == item.productid) {
          arr = item.spec_list;
        }
      });
      return arr;
    },
    druginfo_product_ids() {
      // 调整用药productid数组，用于发布数据使用
      let arr = [];
      this.medicine.forEach((item) => {
        arr.push(item.productid);
      });
      return arr;
    },
    druginfo_spec_ids() {
      // 调整用药规格id数组，用于发布数据使用
      let arr = [];
      this.medicine.forEach((item) => {
        arr.push(item.specid);
      });
      return arr;
    },
    druginfo_product_quantity() {
      // 调整用药数量id数组，用于发布数据使用
      let arr = [];
      this.medicine.forEach((item) => {
        arr.push(item.quantity);
      });
      return arr;
    },
    editCase() {
      return this.$route.query.editCase;
    },
  },
  watch: {},
  mounted() {
    this.getCase();
    this.getDrugChooseCase();
    if (this.id) {
      this.getEditData();
    }
    if (this.classId) {
      this.getOneCaseData();
    }
  },
  unmounted() {},
  methods: {
    clickCase() {
      //点击选择方案
      if (this.editCase === 'no') return;
      this.showPicker = true;
    },
    beforeRead(file) {
      return new Promise((resolve) => {
        new Compressor(file, {
          quality: 0.6,
          success(result) {
            resolve(result);
          },
          error(err) {
            this.$toast(err.message);
          },
        });
      });
    },
    afterRead(file, detail) {
      // 图片上传
      let formData = new FormData();
      formData.append('urls[]', file.file, file.file.name);
      this.$axios.fetchPost('/Mobile/Wen/OssUploadFile', formData).then((res) => {
        if (res.data.code == 0) {
          this.imgList.push(res.data.data);
        } else {
          this.$toast(res.data.message);
          let index = detail.index;
          this.uploader.splice(index, 1);
        }
      });
    },
    deleteItem(file, val) {
      let index = val.index;
      this.imgList.splice(index, 1);
      return true;
    },
    getEditData() {
      // 获取整条农事数据
      this.$axios
        .fetchGet('/Mobile/Gbase/getfarmerdata', {
          Id: this.id,
        })
        .then((res) => {
          if (res.data.code == 0) {
            let data = res.data.data;
            this.caseValue = data.point_name;
            this.date = `${data.starttime}/${data.endtime}`;
            this.message = data.content;
            this.medicine = data.druginfo;
            data.thumb_urls.forEach((item) => {
              this.uploader.push({ url: item });
              this.imgList.push(item);
            });
          }
        });
    },
    getOneCaseData() {
      // 获取节点农事数据
      this.$axios
        .fetchGet('/Mobile/gbase/getProjectPointData', {
          classId: this.classId,
          uId: this.uId,
        })
        .then((res) => {
          if (res.data.code == 0) {
            let data = res.data.data;
            this.caseValue = data.point_name;
            this.caseId = data.point_name_ids;
            this.date = `${data.starttime}/${data.endtime}`;
            this.message = data.content;
            this.medicine = data.druginfo;
            this.pId = data.point_name_ids.split('_')[0];
            if (data.thumb_urls) {
              data.thumb_urls.forEach((item) => {
                this.uploader.push({ url: item });
                this.imgList.push(item);
              });
            }
          }
        });
    },
    onCaseConfirm() {
      // 选择方案
      let r = this.$refs.casePick.getValues();
      if (r[2].pid == '') {
        this.caseId = r[0].id + '_' + r[1].id;
      } else {
        this.caseId = r[0].id + '_' + r[2].id;
      }
      // console.log('r', r);
      // console.log('this.caseId', this.caseId);
      this.pId = r[0].id;
      this.caseValue = r[0].text + '-' + r[1].text + '-' + r[2].text;
      this.showPicker = false;
    },
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    onTimeConfirm(date) {
      const [start, end] = date;
      this.show = false;
      this.date = `${this.formatDate(start)}/${this.formatDate(end)}`;
    },
    onSubmit(values) {
      console.log('submit', values);
      this.issueFramData();
    },
    issueFramData() {
      //发布农事
      let options = {};
      let sucessMessage = '';
      let url = '';
      if (this.id) {
        // 修改农事 接口参数
        options = {
          planer: this.caseId,
          Id: this.id,
          starttoendtime: this.date,
          content: this.message,
          picurl: this.imgList.join(','),
          druginfo_product_ids: this.druginfo_product_ids,
          druginfo_spec_ids: this.druginfo_spec_ids,
          druginfo_product_quantity: this.druginfo_product_quantity,
        };
        sucessMessage = '修改成功';
        url = '/Mobile/Gbase/subfarmerdata';
      } else {
        // 发布农事接口参数
        options = {
          planer: this.caseId,
          uId: this.uId,
          starttoendtime: this.date,
          content: this.message,
          picurl: this.imgList.join(','),
          druginfo_product_ids: this.druginfo_product_ids,
          druginfo_spec_ids: this.druginfo_spec_ids,
          druginfo_product_quantity: this.druginfo_product_quantity,
          rtype: this.classId ? 'plan' : '',
        };
        sucessMessage = '发布成功';
        url = '/Mobile/Gbase/addfarmerdata';
      }
      this.$axios.fetchPost(url, options).then((res) => {
        if (res.data.code == 0) {
          this.$toast.success(sucessMessage);
          setTimeout(() => {
            if (this.id) {
              this.$router.go(-1);
            } else {
              this.$router.push({
                path: '/cropRecord',
                query: { pId: this.pId },
              });
            }
            // this.$router.go(-1);
          }, 500);
        } else {
          this.$toast.fail(res.data.message);
        }
      });
    },
    getCase() {
      // 获取方案的节点数据
      this.$axios
        .fetchGet('/Mobile/Gbase/getProjectlist', {
          mId: this.mid,
          uId: this.uId,
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.caseColumns = res.data.data;
          }
        });
    },
    getDrugChooseCase() {
      //获取用药的方案内容数组
      this.$axios
        .fetchGet('/Mobile/Gbase/getBaseDruginfo', { uId: this.uId })
        .then((res) => {
          let data = res.data;
          if (data.code === 0) {
            this.medicineColumns = data.data;
          }
        });
    },
    clickChooseDrug(index) {
      //点击选择用药
      this.chooseDrugActiveIndex = index;
      this.drugPicker = true;
      this.chooseDrugSizeActive = index;
    },

    onDrugConfirm(val) {
      // 确认用药
      this.drugPicker = false;
      //选中的用药的index -》 判断出当前index的规格-》用这个规格去对比val.规格数组-> true 就不操作，false就选择数组的【0】位
      this.medicine[this.chooseDrugActiveIndex].name = val.name;
      this.medicine[this.chooseDrugActiveIndex].productid = val.productid;
      let spec = this.medicine[this.chooseDrugActiveIndex].spec;
      let r = val.spec_list.filter((item) => {
        return item.spec == spec;
      });
      if (r.length == 0) {
        this.medicine[this.chooseDrugActiveIndex].spec = val.spec_list[0].spec;
        this.medicine[this.chooseDrugActiveIndex].specid = val.spec_list[0].id;
      }
    },
    clickChooseDrugSize(index) {
      //点击选择规格
      this.chooseDrugSizeActive = index;
      this.chooseDrugActiveIndex = index;
      this.guigeShow = true;
    },
    onDrugSizeConfirm(val) {
      // 选择药品规格
      this.medicine[this.chooseDrugActiveIndex].spec = val.spec;
      this.medicine[this.chooseDrugActiveIndex].specid = val.id;
      this.guigeShow = false;
    },
    closeMedicine(index) {
      // 删除用药
      this.$dialog
        .confirm({
          title: '删除用药',
          message: '是否要删除用药',
        })
        .then(() => {
          // on close
          this.medicine.splice(index, 1);
        });
    },
    addMedicine() {
      this.medicine.push({
        name: '',
        spec: '',
        specid: '',
        quantity: '',
        drugId: '',
        productid: '',
      });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="stylus" scoped>
.base_edit-container
  .icon
    flex 1
    display flex
    align-items center
    color #999
  .back-icon
    font-size 20px
    color: #999999;
    padding-left 12px
    margin-right 5px
  .edit-container
    .case
      margin 10px 0
      height auto
    .use-medicine
      margin-top 15px
      .add-box
        position relative
        padding-right 20px
        background #fff
        .cross
          position absolute
          right 5px
          top 10px
          color: #999999;
          font-size 20px
          z-index 9
          padding 5px
      & > .title
        margin-left 12px
        font-size: 15px;
        font-family: Microsoft YaHei;
        color: #333333;
        margin-bottom 5px
      /deep/.van-field__body
        border 1px solid #e5e5e5
        padding 5px
      .number
        /deep/.van-field__body
          width 50%
    .add-btn-title
      height 50px
      line-height 50px
      background #fff
      padding-left 12px
      color: #999999;

  .submit-wrap
    margin 35px 12px 0
    padding-bottom 35px
    overflow hidden
  /deep/.van-field__label
    width 50px
</style>
