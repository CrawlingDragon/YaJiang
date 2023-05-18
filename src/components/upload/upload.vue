<template>
  <!-- <van-field name="uploader" class="uploader" label="营业执照片">
    <template #input> -->
  <van-uploader
    v-model="uploader"
    :before-read="beforeRead"
    :after-read="afterRead"
    :before-delete="deleteItem"
    accept="image/*"
    :max-count="maxCount"
    :upload-text="uploadText"
    :class="imgClass ? 'img-w' : ''"
  />

  <!-- <div class="upload-btn"></div> -->
  <!-- </van-uploader> -->
  <!-- </template>
  </van-field> -->
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import Compressor from 'compressorjs';
import { Toast } from 'vant';
import { uploadImg } from '@/service/base';
import { useStore } from 'vuex';

const props = defineProps({
  maxCount: {
    type: Number,
    default: 1,
  },
  uploadText: {
    type: String,
    default: '',
  },
  imgClass: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['updateImgs']);

const store = useStore();

const uId = computed(() => store.state.uId);

const uploader = ref([]);
const uploading = ref(false);
const imgShowList = ref<any[]>([]); //用于展示的图片地址
const imgFetchList = ref<any[]>([]); //用于给接口的图片地址

const beforeRead: any = (file: any) => {
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
};
const afterRead = async (file: any) => {
  file.status = 'uploading';
  file.message = '上传中...';
  let formData = new FormData();
  // console.log('file', file);
  formData.append('file', file.file, file.file.name);
  // formData.append('file', file.file);
  formData.append('uId', uId.value);
  uploading.value = false;
  let r = await uploadImg(formData);
  // console.log('r', r);

  if (!r.uploaded) {
    file.status = 'failed';
    file.message = '上传失败';
    Toast(r.error.message);
  } else {
    file.status = 'done';
    file.message = '上传成功';
    imgShowList.value.push(r.url);
    imgFetchList.value.push(r.filepath);
    emits('updateImgs', { imgShowList: imgShowList.value, imgFetchList: imgFetchList.value });
  }
};
const deleteItem = (file: any, val: any) => {
  let index = val.index;
  imgShowList.value.splice(index, 1);
  imgFetchList.value.splice(index, 1);
  emits('updateImgs', { imgShowList: imgShowList.value, imgFetchList: imgFetchList.value });
  return true;
};
</script>
<style lang="scss" scoped>
.uploader {
  padding: 10px 12px;
  // border-bottom: 1px solid #e5e5e5;
  // &.van-cell::after {
  //   display: none;
  // }
  // .upload-btn {
  //   width: 70px;
  //   height: 70px;
  //   background: url('./upload-btn.png') no-repeat center;
  //   background-size: 100% 100%;
  // }
}
.img-w {
  :deep().van-uploader__preview-image,
  :deep().van-uploader__upload {
    width: 140rem;
    height: 140rem;
  }
}
</style>
