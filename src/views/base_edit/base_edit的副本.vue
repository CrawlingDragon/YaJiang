<template>
  <div class="base_edit-container">
    <Header :haveBackIcon="true">
      <div class="icon" @click="goBack">
        <van-icon name="arrow-left" class="back-icon" />
        <span class="back">返回</span>
      </div>
    </Header>
    <div class="edit-container">
      <van-form @submit="onSubmit">
        <van-field
          class="case"
          clickable
          autosize
          name="case"
          type="textarea"
          rows="1"
          v-model="type_desc"
          label="类型"
          placeholder="如：施肥、用药、整地、修枝、采摘等"
          :rules="[{ required: true, message: '类型不能为空' }]"
        />
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
          />
          <van-field
            v-model="message"
            name="content"
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
              />
            </template>
          </van-field>
        </div>
        <div class="use-medicine" v-if="medicineColumns">
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
                v-model="item.product_name"
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
                v-model="item.spec_name"
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
              v-model="item.nums"
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
            >{{ id ? '保存' : '发布' }}</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import Header from '@/components/header/header';
import { mapState } from 'vuex';
// import EXIF from "exif-js";
import Compressor from 'compressorjs';
import { useTitles } from '@/common/js/useTitles';
export default {
  setup() {
    useTitles('发布农事');
  },

  name: 'base_edit',
  components: { Header },
  props: {},
  data() {
    return {
      eitdObj: '', //编辑内容对象
      caseValue: '',
      // caseId: "",
      type_desc: '',
      date: '',
      minDate: new Date(2021, 1, 1),
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
        if (this.medicine[this.chooseDrugSizeActive].product_id == item.product_id) {
          arr = item.spec_list;
        }
      });
      return arr;
    },
    druginfo_product_ids() {
      // 调整用药product_id数组，用于发布数据使用
      let arr = [];
      this.medicine.forEach((item) => {
        arr.push(item.product_id);
      });
      return arr;
    },
    druginfo_spec_ids() {
      // 调整用药规格id数组，用于发布数据使用
      let arr = [];
      this.medicine.forEach((item) => {
        arr.push(item.spec_id);
      });
      return arr;
    },
    druginfo_product_nums() {
      // 调整用药数量id数组，用于发布数据使用
      let arr = [];
      this.medicine.forEach((item) => {
        arr.push(item.nums);
      });
      return arr;
    },
    druginfo_product_names() {
      let arr = [];
      this.medicine.forEach((item) => {
        arr.push(item.product_name);
      });
      return arr;
    },
    druginfo_spec_names() {
      let arr = [];
      this.medicine.forEach((item) => {
        arr.push(item.spec_name);
      });
      return arr;
    },
    editCase() {
      return this.$route.query.editCase;
    },
  },
  watch: {},
  mounted() {
    // this.getCase();
    this.getDrugChooseCase();
    if (this.id) {
      this.getEditData();
    }
    if (this.classId) {
      this.getOneCaseData();
    }
  },
  methods: {
    afterRead(file, detail) {
      // 图片上传
      let that = this;
      new Compressor(file.file, {
        quality: 0.4,
        success(result) {
          let formData = new FormData();
          formData.append('urls[]', result, result.name);
          that.$axios.fetchPost('/Mobile/Wen/OssUploadFile', formData).then((res) => {
            if (res.data.code == 0) {
              that.imgList.push(res.data.data);
            } else {
              that.$toast(res.data.message);
              let index = detail.index;
              that.uploader = that.uploader.splice(0, index, 1);
            }
          });
        },
      });
    },
    deleteItem(file, val) {
      let index = val.index;
      this.imgList = this.imgList.splice(0, index, 1);
      return true;
    },
    getEditData() {
      // 获取整条农事数据
      this.$axios
        .fetchPost('Mobile/gbase/getFarmerDetail', {
          uId: this.uId,
          id: this.id,
        })
        .then((res) => {
          if (res.data.code == 0) {
            let data = res.data.data;
            this.type_desc = data.type_desc;
            this.date = `${data.startdate}/${data.enddate}`;
            this.message = data.content;
            this.medicine = data.products || [];
            data.thumb_urls.forEach((item) => {
              this.uploader.push({ url: item });
              this.imgList.push(item);
            });
          }
        });
    },
    getOneCaseData() {
      //已经弃用
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
            this.date = `${data.startdate}/${data.enddate}`;
            this.message = data.content;
            this.medicine = data.druginfo;
            if (data.thumb_urls) {
              data.thumb_urls.forEach((item) => {
                this.uploader.push({ url: item });
                this.imgList.push(item);
              });
            }
          }
        });
    },

    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    onTimeConfirm(value) {
      // 日历的确定操作
      const [start, end] = value;
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
          uId: this.uId,
          type_desc: this.type_desc,
          id: this.id,
          startdate: this.date.split('/')[0],
          enddate: this.date.split('/')[1],
          content: this.message,
          picurl: this.imgList.join(','),
          spec_ids: this.druginfo_product_ids,
          product_ids: this.druginfo_spec_ids,
          product_nums: this.druginfo_product_nums,
          product_names: this.druginfo_product_names,
          spec_names: this.druginfo_spec_names,
        };
        sucessMessage = '修改成功';
        url = 'Mobile/gbase/editFarmerData';
      } else {
        // 发布农事接口参数
        options = {
          type_desc: this.type_desc,
          uId: this.uId,
          startdate: this.date.split('/')[0],
          enddate: this.date.split('/')[1],
          content: this.message,
          picurl: this.imgList.join(','),
          spec_ids: this.druginfo_product_ids,
          product_ids: this.druginfo_spec_ids,
          product_nums: this.druginfo_product_nums,
          product_names: this.druginfo_product_names,
          spec_names: this.druginfo_spec_names,
          rtype: this.classId ? 'plan' : '',
        };
        sucessMessage = '发布成功';
        url = 'Mobile/gbase/addFarmerData';
      }
      this.$axios.fetchPost(url, options).then((res) => {
        if (res.data.code == 0) {
          this.$toast.success(sucessMessage);
          setTimeout(() => {
            this.$router.go(-1);
          }, 500);
        } else {
          this.$toast.fail(res.data.message);
        }
      });
    },
    getDrugChooseCase() {
      //获取用药的方案内容数组
      this.$axios
        .fetchPost('Mobile/gbase/getBaseDruginfo', { uId: this.uId })
        .then((res) => {
          let data = res.data;
          if (data.code === 0) {
            this.medicineColumns = data.data;
          } else {
            this.medicineColumns = false;
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
      console.log(val);
      this.drugPicker = false;
      //选中的用药的index -》 判断出当前index的规格-》用这个规格去对比val.规格数组-> true 就不操作，false就选择数组的【0】位
      this.medicine[this.chooseDrugActiveIndex].product_name = val.product_name;
      this.medicine[this.chooseDrugActiveIndex].product_id = val.product_id;
      let spec_name = this.medicine[this.chooseDrugActiveIndex].spec_name;
      let r = val.spec_list.filter((item) => {
        return item.spec_name == spec_name;
      });
      if (r.length == 0) {
        this.medicine[this.chooseDrugActiveIndex].spec_name = val.spec_list[0].spec_name;
        this.medicine[this.chooseDrugActiveIndex].spec_id = val.spec_list[0].spec_id;
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
      this.medicine[this.chooseDrugActiveIndex].spec = val.spec_name;
      this.medicine[this.chooseDrugActiveIndex].specid = val.spec_id;
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
        product_name: '',
        spec_name: '',
        spec_id: '',
        product_nums: '',
        drugId: '',
        product_id: '',
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
    color: #363A44;
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
          color: #363A44;
          font-size 20px
          z-index 9
          padding 5px
      & > .title
        margin-left 12px
        font-size: 15px;
        font-family: Microsoft YaHei;
        color: #333333;
        margin-bottom 5px
      :deep().van-field__body
        border 1px solid #e5e5e5
        padding 5px
      .number
        :deep().van-field__body
          width 50%
    .add-btn-title
      height 50px
      line-height 50px
      background #fff
      padding-left 12px
      color: #363A44;

  .submit-wrap
    margin 35px 12px 0
    padding-bottom 35px
    overflow hidden
  :deep().van-field__label
    width 50px
</style>
