<template>
  <div class="ask-container">
    <Header :indexHeader="false"></Header>
    <HospitalHeader v-if="from == 'hospital'" navHeader="提问"></HospitalHeader>
    <div class="title f22">问题描述</div>
    <van-form @submit="onSubmit" class="from">
      <van-field
        v-model="message"
        rows="4"
        autosize
        type="textarea"
        placeholder="请输入具体问题描述"
        class="text"
        show-word-limit
        maxlength="300"
        name="message"
      />
      <van-field name="uploader" class="uploader">
        <template #input>
          <van-uploader
            v-model="uploader"
            :before-read="beforeRead"
            :after-read="afterRead"
            :before-delete="deleteItem"
            accept="image/*"
            :max-count="9"
          >
            <div class="upload-btn"></div>
          </van-uploader>
        </template>
      </van-field>
      <div class="choose-crop" @click="goToChooseCrop">
        <div class="left f22">作物</div>
        <van-field
          v-model="crop"
          readonly
          class="right"
          :class="{ location: crop != '请选择' }"
          input-align="right"
          :border="false"
          name="crop"
        />
        <van-icon name="arrow" class="arrow" />
      </div>
      <div class="list" v-if="expert">
        <div class="left">咨询专家</div>
        <div class="right">{{ expert }}</div>
      </div>
      <Local :propMid="from ? mid : initMid" ref="localRef" v-model:address="address"></Local>
      <div class="sub">
        <van-button round block type="info" native-type="submit" class="btn f20"> 提交 </van-button>
      </div>
    </van-form>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" @getCrop="getCrop" />
      </keep-alive>
    </router-view>
    <Foot></Foot>
  </div>
</template>

<script>
import Header from '@/components/header/header';
import HospitalHeader from '@/components/hospital_header/hospital_header';
import Foot from '@/components/foot/foot';
import Local from '@/components/local/local.vue';
import { useTitles } from '@/common/js/useTitles';
import { mapState, mapGetters } from 'vuex';
import Compressor from 'compressorjs';
import { onActivated, onMounted } from 'vue';
export default {
  setup() {
    useTitles('提问');
  },
  name: 'ask',
  components: { Header, Foot, HospitalHeader, Local },

  data() {
    return {
      address: '定位中···',
      message: '',
      crop: '请选择',
      fid: '',
      uploader: [],
      imgList: [],
      imgListTiny: [],
      ismember: '',
      isShaoxing: '',
      userInfo: '',
      locationTime: 'first',
      submitBoolean: true,
      uploading: false,
    };
  },
  mounted() {
    this.crop = this.getterDefaultCrop.name ? this.getterDefaultCrop.name : '请选择';
    this.fid = this.getterDefaultCrop.num;
  },
  computed: {
    ...mapState(['uId', 'mid', 'hospitalName']),
    ...mapGetters(['initMid', 'getterDefaultCrop']),
    from() {
      return this.$route.query.from;
    },
    expert() {
      return this.$route.query.expert;
    },
    expertId() {
      return this.$route.query.expertId;
    },
    // localRef() {
    //   return this.$refs.localRef.addressObj;
    // },
    ...mapState(['uId']),
  },

  methods: {
    onSubmit(values) {
      if (values.message == '') {
        this.$toast('问题描述不能为空');
        return;
      } else if (values.message.length <= 9) {
        this.$toast('问题描述不能少余10个字');
        return;
      } else if (this.address == '定位中···') {
        this.$toast('地址定位中,请稍等');
        return;
      }
      this.subAsk();
    },
    goToChooseCrop() {
      //选择作物
      this.$router.push({
        path: '/ask/ask_choose_crop',
        query: { crop: this.crop == '请选择' ? '' : this.crop },
      });
    },
    getCrop(crop) {
      //选择作物
      this.crop = crop.name;
      this.fid = crop.fid;
    },
    beforeRead(file) {
      // 上传图片之前，压缩图片
      return new Promise((resolve) => {
        new Compressor(file, {
          quality: 0.2,
          success(result) {
            resolve(result);
          },
          error(err) {
            console.log(err.message);
          },
        });
      });
    },
    afterRead(file) {
      // console.log('after-file', file);
      file.status = 'uploading';
      file.message = '上传中...';
      let formData = new FormData();
      // console.log('result', result);
      formData.append('urls[]', file.file, file.name);
      this.uploading = true;
      this.$axios.fetchPost('/Mobile/Wen/OssUploadFile', formData).then((res) => {
        if (res.data.code == 0) {
          this.imgList.push(res.data.data);
          this.imgListTiny.push(res.data.data_tiny);
          file.status = 'done';
          file.message = '上传成功';
          // that.uploader.push({ url: res.data.data, name: 'img' });
        } else {
          file.status = 'failed';
          file.message = '上传失败';
          this.$toast(res.data.message);
          // let index = detail.index;
          // this.uploader.splice(index, 1);
        }
        this.uploading = false;
      });

      // 图片上传
      // let that = this;
      // new Compressor(file.file, {
      //   quality: 0.4,
      //   success(result) {
      //     let formData = new FormData();
      //     console.log('result', result);
      //     formData.append('urls[]', result, result.name);
      //     that.$axios.fetchPost('/Mobile/Wen/OssUploadFile', formData).then((res) => {
      //       // alert(res.data.message);
      //       if (res.data.code == 0) {
      //         that.imgList.push(res.data.data);
      //         that.imgListTiny.push(res.data.data_tiny);
      //         // this.uploader.push({url:res.data.data,name:'img'})
      //       } else {
      //         that.$toast(res.data.message);
      //         let index = detail.index;
      //         that.uploader.splice(index, 1);
      //       }
      //     });
      //   },
      // });
    },
    deleteItem(file, val) {
      let index = val.index;
      this.imgList.splice(index, 1);
      this.imgListTiny.splice(index, 1);
      return true;
    },
    subAsk() {
      let obj = {
        mId: this.from ? this.mid : this.initMid, //mId
        uId: this.uId, //用户ID
        content: this.message, //发布内容
        fId: this.fid, //作物ID
        expertId: this.expertId,
        picurl: this.imgList.join(','),
        picurl_tiny: this.imgListTiny.join(','),
        location: this.address === '抱歉未定位到' ? '定位失败' : this.address,
      };
      if (this.submitBoolean) {
        // 判断是否在上传图片
        if (this.uploading) {
          this.$toast('图片上传中，稍后尝试');
          return;
        }
        this.submitBoolean = false;
        this.$axios.fetchPost('Mobile/Wen/addWenQuestion', obj).then((res) => {
          this.$toast(res.data.message);
          if (res.data.code == 0) {
            setTimeout(() => {
              this.$router.push({
                path: '/index_online',
              });
              this.submitBoolean = true;
            }, 1000);
          } else {
            this.submitBoolean = true;
          }
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.old {
  .ask-container {
    .from {
      .uploader {
        height: auto !important;
        .upload-btn {
          width: 100px;
          height: 100px;
        }
      }
      .choose-crop {
        height: 56px;
      }
      .sub {
        .btn {
          height: 48px;
        }
      }
    }
  }
}
.ask-container {
  height: 100%;
  background: #fff;
  position: relative;
  padding-bottom: 0px;
  .title {
    background: #fff;
    color: #333333;
    font-size: 16px;
    line-height: 16px;
    padding: 15px 12px 10px 12px;
  }
  .from {
    background: #fff;
    .text {
      margin-right: 12px;
      margin-left: 12px;
      width: auto;
      height: 140px;
      font-size: 12px;
      border: 1px solid $border-color;
    }
    .uploader {
      padding: 10px 12px;
      border-bottom: 1px solid #e5e5e5;
      &.van-cell::after {
        display: none;
      }
      .upload-btn {
        width: 70px;
        height: 70px;
        background: url('./upload-btn.png') no-repeat center;
        background-size: 100% 100%;
      }
    }
    .choose-crop {
      border-bottom: 1px solid #e5e5e5;
      display: flex;
      align-items: center;
      height: 50px;
      padding: 0 12px;
      .left {
        width: 106px;
        color: #333333;
        font-size: 16px;
      }
      .right {
        flex: 1;
        color: #363a44;
        text-align: right;
        :deep().van-field__control {
          color: #999;
          font-size: 16px;
        }
        &.location {
          color: #333;
          &.fail {
            color: #999;
            :deep().van-field__control {
              color: #999;
            }
          }
          :deep().van-field__control {
            color: #333;
          }
        }
        .arrow {
          font-size: 12px;
          color: #363a44;
          margin: 0 12px;
        }
      }
    }
    .list {
      height: 50px;
      line-height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      color: #333;
      padding: 0 35px 0 12px;
      border-bottom: 1px solid #e5e5e5;
    }
    .sub {
      background: #f6f7f8;
      padding: 16px;
      padding-bottom: 60px;
      .btn {
        margin-right: 12px;
        border-radius: 29px;
        background: $theme-color;
        font-size: 15px;
        color: #fff;
        width: 100%;
        border: none;
      }
    }
  }
}
:deep().van-uploader__preview-image {
  width: 70px;
  height: 70px;
}
</style>
