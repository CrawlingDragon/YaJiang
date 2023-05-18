<template>
  <div class="container">
    <van-form @submit="onSubmit" ref="ruleFormRef">
      <van-cell-group>
        <div class="reason-box">
          <div class="title">选择投诉原因<i style="color: red;">*</i></div>
          <van-field name="uploader" :rules="[{ required: true, message: '请选择投诉原因' }]" v-model="reasonShow"
            class="uploader">
            <template #input>
              <div class="content">
                <div class="item" :class="reasonShow == '卖家承诺不履行' ? 'reasonActive' : ''" @click="getReason('卖家承诺不履行')">
                  卖家承诺不履行
                </div>
                <div class="item" :class="reasonShow == '卖家服务态度' ? 'reasonActive' : ''" @click="getReason('卖家服务态度')">
                  卖家服务态度
                </div>
                <div class="item" :class="reasonShow == '卖家诱导交易欺诈' ? 'reasonActive' : ''" @click="getReason('卖家诱导交易欺诈')">
                  卖家诱导交易欺诈
                </div>
                <div class="item" :class="reasonShow == '市场规划不合理' ? 'reasonActive' : ''" @click="getReason('市场规划不合理')">
                  市场规划不合理
                </div>
                <div class="item" :class="reasonShow == '市场管理人员服务态度' ? 'reasonActive' : ''"
                  @click="getReason('市场管理人员服务态度')">市场管理人员服务态度
                </div>
                <div class="item" :class="reasonShow == '市场经营问题' ? 'reasonActive' : ''" @click="getReason('市场经营问题')">
                  市场经营问题
                </div>
                <div class="item" :class="reasonShow == '其他' ? 'reasonActive' : ''" @click="getReason('其他')">其他</div>
              </div>
            </template>
          </van-field>
        </div>
        <div class="main">
          <div class="complaint-object">
            <div class="label">投诉对象<i style="color: red;">*</i></div>
            <div class="text">
              <van-field autocomplete="off" v-model="obj" :rules="[{ required: true, message: '请填写投诉对象' }]"
                placeholder="商户名/姓名等身份信息" name="obj" />
            </div>
          </div>
          <div class="description">
            <div class="label">投诉说明<i style="color: red;">*</i></div>
            <div class="text">
              <van-field autocomplete="off" v-model="description" rows="4" autosize type="textarea"
                placeholder="请描述具体情况，有助于客服更快处理" class="text" show-word-limit maxlength="300" name="message" />
            </div>
          </div>
          <div class="voucher">
            <div class="label">凭证</div>
            <div class="text">
              <van-field name="uploader" class="uploader">
                <template #input>
                  <van-uploader v-model="uploader" :before-read="beforeRead" :after-read="afterRead"
                    :before-delete="deleteItem" accept="image/*" :max-count="9">
                    <div class="upload-btn">
                      <div class="box-up">
                        <img src="./img.png" alt="#">
                        <p class="tips">最多9图</p>
                      </div>
                    </div>
                  </van-uploader>
                </template>
              </van-field>
            </div>
          </div>
        </div>
        <div class="tel">
          <div class="label">联系电话<i style="color: red;">*</i></div>
          <div class="text">
            <van-field autocomplete="off" type="tel" v-model="tel" :rules="[{ required: true, message: '请输入电话号码' }]"
              placeholder="请输入电话号码" name="obj" />
          </div>
        </div>
      </van-cell-group>
    </van-form>
    <div class="fotter">
      <div class="button" @click="onSubmit(ruleFormRef)">提交</div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Compressor from 'compressorjs';
import { Toast } from 'vant';
import axios from '@/http';
import { useTitles } from '@/common/js/useTitles';
import { getComplaint } from '@/service/getComplaint';
import { useRouter } from 'vue-router'

useTitles('投诉市场');
const router = useRouter();
const ruleFormRef = ref();//投资者form表单
const obj = ref();//投诉对象
const description = ref();//投资说明
const uploader = ref();//凭证
const uploading = ref(false);//上传
const imgList = ref([]);//图片
const imgListTiny = ref([]);//图片
const tel = ref();//联系电话
const reasonShow = ref('')//投诉原因
const getReason = (index) => {
  reasonShow.value = index
}

// 提交
const onSubmit = (formEl) => {
  if (!formEl) return;
  formEl.validate().then(() => {
    postComplaint()
  }).catch(() => {
    Toast.fail('提交失败，请补全信息');
  })
}
const postComplaint = async () => {
  let par = {
    reason: reasonShow.value,//投诉原因
    respondent: obj.value,//投诉对象
    description: description.value,//投诉说明
    images: imgList.value.join(';'),//凭证,传图片链接
    mobile: tel.value//联系电话
  }
  const res = await getComplaint(par)
  if (res.length == 0) {
    router.push({
      path: '/complaint_success'
    })
  }
}

const beforeRead = (file) => {
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
}
const afterRead = (file) => {
  file.status = 'uploading';
  file.message = '上传中...';
  let formData = new FormData();
  formData.append('urls[]', file.file, file.name);
  uploading.value = true;
  axios.fetchPost('/Mobile/Wen/OssUploadFile', formData).then((res) => {
    if (res.data.code == 0) {
      imgList.value.push(res.data.data);
      imgListTiny.value.push(res.data.data_tiny);
      file.status = 'done';
      file.message = '上传成功';
    } else {
      file.status = 'failed';
      file.message = '上传失败';
      Toast.fail(res.data.message);
    }
    uploading.value = false;
  });
}
const deleteItem = (file, val) => {
  let index = val.index;
  imgList.value.splice(index, 1);
  imgListTiny.value.splice(index, 1);
  return true;
}

</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: auto;
  background: #F6F6F6;
  position: absolute;
  top: 0;
  left: 0;

  .reason-box {
    width: 700rem;
    height: auto;
    background: #FFFFFF;
    border-radius: 20rem;
    margin: 20rem auto;
    padding: 20rem;

    .title {
      width: 100%;
      font-size: 36rem;
      color: #333333;
    }

    .content {
      width: 100%;
      display: flex;
      flex-wrap: wrap;

      .item {
        height: 90rem;
        line-height: 90rem;
        background: #F6F6F6;
        border-radius: 8rem;
        font-size: 28rem;
        color: #333333;
        padding: 0 26rem;
        margin: 20rem 20rem 0px 0px;
        cursor: pointer;
      }

      .reasonActive {
        background: #FF6600;
        color: #FFFFFF;
      }
    }
  }

  .label {
    width: 160rem;
    height: 65rem;
    font-size: 32rem;
    font-family: Microsoft YaHei;
    color: #333333;
    padding-top: 5rem;
  }

  :deep(.van-cell) {
    padding-top: 0rem;
  }

  :deep(.van-field__control) {
    font-size: 32rem;
  }

  .main {
    width: 700rem;
    height: auto;
    background: #FFFFFF;
    border-radius: 20rem;
    margin: 20rem auto;
    overflow: hidden;


    .complaint-object {
      width: 100%;
      border-bottom: 1px solid #DCDCDC;
      padding: 25rem 20rem 20rem;
      display: flex;


      .text {
        font-size: 32rem;
        width: 500rem;
        padding-top: 8rem;

      }

    }

    .description {
      width: 100%;
      border-bottom: 1px solid #DCDCDC;
      padding: 30rem 20rem 20rem;
      display: flex;

      .text {
        font-size: 32rem;
        width: 500rem;
        // height: 300rem;
        line-height: 50rem;
        padding-top: 3rem;
      }
    }

    .voucher {
      width: 100%;
      padding: 30rem 20rem 20rem;
      display: flex;

      .text {
        padding-top: 8rem;

        :deep(.van-uploader__preview-image) {
          width: 140rem;
          height: 140rem;
        }

        .uploader {
          height: auto !important;

          .upload-btn {
            width: 140rem;
            height: 140rem;
            background: #F6F6F6;
            border: 1px solid #E5E5E5;
            border-radius: 4rem;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;

            .box-up {
              img {
                width: 34rem;
                height: 29rem;
              }

              .tips {
                height: 24rem;
                font-size: 24rem;
                font-family: Microsoft YaHei;
                color: #999999;
                line-height: 30rem;
              }

            }

          }
        }
      }
    }
  }

  .tel {
    width: 700rem;
    background: #FFFFFF;
    border-radius: 20rem;
    margin: 20rem auto 180rem;
    padding: 40rem 20rem 20rem;
    display: flex;

    .text {
      font-size: 32rem;
      width: 500rem;
      line-height: 50rem;
      padding-top: 8rem;
    }
  }

  .fotter {
    width: 750rem;
    height: 102rem;
    background-color: #FFFFFF;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;

    .button {
      width: 597rem;
      height: 60rem;
      background: #FF6600;
      border-radius: 30px;
      text-align: center;
      font-size: 26rem;
      font-family: Microsoft YaHei;
      color: #FFFFFF;
      line-height: 60rem;
      cursor: pointer;
    }
  }


  :deep(.van-cell-group) {
    background: #F6F6F6;
  }
}
</style>