<template>
  <div class="me_edit-container">
    <Header :indexHeader="false"></Header>
    <ul>
      <van-uploader class="upload" accept="image/*" :after-read="afterRead">
        <li>
          <div class="left f20">头像</div>
          <div class="mid">
            <van-image class="avator" fit="cover" round :src="avatar"></van-image>
          </div>
          <van-icon name="arrow" class="arrow" />
        </li>
      </van-uploader>
      <li>
        <div class="left f20">用户名</div>
        <div class="mid f20">{{ userName }}</div>
      </li>
      <li @click="clickName">
        <div class="left f20">名字</div>
        <div class="mid f20">{{ name }}</div>
        <van-icon name="arrow" class="arrow" v-if="identity == 0 && ismember == 0" />
      </li>
      <li @click="sexShow = true">
        <div class="left f20">性别</div>
        <div class="mid f20">{{ sex == '1' ? '男' : '女' }}</div>
        <van-icon name="arrow" class="arrow" />
      </li>
      <li @click="areaShow = true">
        <div class="left f20">所在地</div>
        <div class="mid f20">{{ resideprovince }}{{ residecity }}{{ residedist }}</div>
        <van-icon name="arrow" class="arrow" />
      </li>
      <li v-if="pickCode" @click="goPickCodePage">
        <div class="left f20">我的采摘码</div>
        <div class="mid f20">
          <div class="code-image"></div>
        </div>
        <van-icon name="arrow" class="arrow" />
      </li>
    </ul>
    <van-dialog v-model:show="nameShow" title="修改名字" show-cancel-button @confirm="confirmName">
      <!-- 修改用户名 -->
      <van-field v-model="names" placeholder="请输入用户名" class="name" maxlength="10" />
    </van-dialog>
    <van-action-sheet v-model:show="sexShow" :actions="actions" @select="onSelect" />
    <!-- 选择性别 -->
    <van-popup v-model:show="areaShow" close-icon-position="top-left" position="bottom">
      <van-area
        title="选择所在地"
        :area-list="areaList"
        @confirm="confimArea"
        @cancel="cancelArea"
      />
    </van-popup>
  </div>
</template>
<script>
import Header from '@/components/header/header';
import { mapMutations, mapState, mapGetters } from 'vuex';
import areaList from '@/common/js/area.js';
import { useTitles } from '@/common/js/useTitles';
import Compressor from 'compressorjs';
import { useRouter } from 'vue-router';
export default {
  name: 'meEdit',
  components: { Header },
  setup() {
    useTitles('编辑资料');
    const router = useRouter();
    function goPickCodePage() {
      router.push({ path: '/pick_code' });
    }
    return {
      goPickCodePage,
    };
  },
  data() {
    return {
      updated: false,
      info: '',
      avatar: '',
      userName: '',
      name: '', // 名字
      sex: '请选择', // 性别
      nameShow: false,
      sexShow: false,
      areaShow: false,
      names: '',
      actions: [
        { name: '男', id: 1 },
        { name: '女', id: 0 },
      ],
      areaList: areaList,
      resideprovince: '', // 省
      residecity: '', // 市
      residedist: '', // 区
      identity: 0, // 1是专家，不允许改名字，0是普通人
      ismember: 0, // 1是会员，不允许改名字，0可以修改
      pickCode: false,
    };
  },
  computed: { ...mapState(['uId', 'mid']), ...mapGetters(['initMid']) },
  watch: {
    name(newVal, oldVal) {
      if (oldVal == '') {
        return false;
      }
      this.upDate();
    },
    sex(newVal, oldVal) {
      if (oldVal == '请选择') {
        return;
      }
      this.upDate();
    },
    residedist(newVal, oldVal) {
      if (oldVal == '') {
        return;
      }
      this.upDate();
    },
    residecity(newVal, oldVal) {
      if (oldVal == '') {
        return;
      }
      this.upDate();
    },
    resideprovince(newVal, oldVal) {
      if (oldVal == '') {
        return;
      }
      this.upDate();
    },
  },
  mounted() {
    this.getInfo();
  },
  created() {},
  updated() {
    // this.upDate();
    // this.getUserInfo();
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    getUserInfo() {
      if (this.updated) {
        this.$axios
          .fetchPost('Mobile/User/userCenter', {
            uId: this.uId,
            mId: this.initMid,
          })
          .then((res) => {
            if (res.data.code == 0) {
              // this.setIsMember(res.data.data.ismember);
              this.setUserInfo(res.data.data);
            }
          });
      }
    },
    afterRead(file) {
      let that = this;
      new Compressor(file.file, {
        quality: 0.1,
        success(result) {
          let formData = new FormData();
          formData.append('urls[]', result, result.name);
          formData.append('uId', that.uId);
          that.$axios.fetchPost('/Mobile/Wen/OssUploadFile', formData).then((res) => {
            // console.log("res :>> ", res);
            if (res.data.code == 0) {
              that.avatar = res.data.data;
              that.updated = true;
              that.getUserInfo();
            }
            that.$toast(res.data.message);
          });
        },
      });
    },
    getInfo() {
      this.$axios
        .fetchPost('/Mobile/User/userCenter', {
          uId: this.uId,
          mId: this.initMid,
        })
        .then((res) => {
          if (res.data.code == 0) {
            let data = res.data.data;
            this.avatar = data.avatar;
            this.userName = data.username;
            this.name = data.realname;
            this.sex = data.gender;
            this.resideprovince = data.resideprovince || '请选择';
            this.residecity = data.residecity;
            this.residedist = data.residedist;
            this.identity = data.identity;
            this.ismember = data.ismember;
            this.pickCode = data.pickQrcode;
          }
        });
    },
    upDate() {
      //分开上传
      this.$axios
        .fetchPost('Mobile/User/updateInfo', {
          uId: this.uId,
          gender: this.sex,
          realname: this.name,
          resideprovince: this.resideprovince,
          residecity: this.residecity,
          residedist: this.residedist,
        })
        .then((res) => {
          if (res.data.code == 0) {
            //
            this.updated = true;
          }
          this.$toast(res.data.message);
        });
    },
    clickName() {
      if (this.identity == 1 || this.ismember == 1) {
        return;
      }
      this.nameShow = true;
      this.names = this.name;
    },
    confirmName() {
      this.name = this.names;
    },
    onSelect(item) {
      this.sex = item.id;
      this.sexShow = false;
    },
    confimArea(item) {
      this.areaShow = false;
      this.resideprovince = item[0].name;
      this.residecity = item[1].name;
      this.residedist = item[2].name;
    },
    cancelArea() {
      this.areaShow = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.old {
  .me_edit-container {
    ul {
      li {
        height: 55px;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.me_edit-container {
  ul {
    margin-top: 10px;
    padding-left: 12px;
    background: #fff;
    .upload {
      width: 100%;
      :deep().van-uploader__input-wrapper {
        width: 100%;
      }
    }
    li {
      display: flex;
      align-items: center;
      height: 50px;
      border-bottom: 1px solid $border-color;
      padding-right: 12px;
      &:last-child {
        border: none;
      }
      .left {
        width: 90px;
        color: #333333;
        font-size: 16px;
      }
      .mid {
        flex: 1;
        color: #333333;
        font-size: 16px;
        display: flex;
        justify-content: end;
        margin-right: 4px;
        .avator {
          width: 40px;
          height: 40px;
          margin-top: 5px;
        }
        .code-image {
          width: 20px;
          height: 20px;
          background: url('./code-image.png') no-repeat center;
          background-size: cover;
        }
      }
      .arrow {
        color: #969799;
        min-width: 1em;
        height: 24px;
        font-size: 16px;
        line-height: 24px;
      }
    }
  }
  .name {
    width: 90%;
    margin: 10px auto;
    border: 1px solid $border-color;
    height: 35px;
    line-height: 35px;
    padding: 0 12px;
  }
}
</style>
