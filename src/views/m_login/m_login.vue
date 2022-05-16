<template>
  <div class="m_login-container">
    <Header :indexHeader="false"></Header>
    <div class="title">
      短信快捷登录<router-link to="/sign" class="small-title">注册</router-link>
    </div>
    <van-form @submit="onSubmit" class="from">
      <van-field
        v-model="mPhone"
        name="phone"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请填写手机号' },
          { validator: validatorPhone, message: '手机号码格式不正确' },
        ]"
      />
      <van-field
        v-model="mCode"
        name="code"
        center
        clearable
        placeholder="请输入4位验证码"
        maxlength="4"
        :rules="[{ required: true, message: '验证码不能为空' }]"
      >
        <template #button>
          <div class="btn" v-show="showBtn" @click="start">发送验证码</div>
          <div v-show="!showBtn">
            <van-count-down
              ref="countDown"
              millisecond
              :time="60000"
              :auto-start="false"
              format="ss秒后重试"
              @finish="finish"
            />
          </div>
        </template>
      </van-field>
      <div style="margin-top: 30px; margin-left: 16px">
        <Deal v-model:checked="checked"></Deal>
      </div>
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          class="sub"
          :class="{ success: this.mPhone && this.mCode && checked }"
        >
          登录
        </van-button>
      </div>
    </van-form>
    <router-link class="go-login" to="/login">账号密码登录</router-link>
  </div>
</template>
<script>
import Header from '@/components/header/header';
import { mapActions } from 'vuex';
import { useTitles } from '@/common/js/useTitles';
import Deal from '@/components/base/deal/deal.vue';
export default {
  name: 'mLogin',
  setup() {
    useTitles('短信快捷登录');
  },
  components: { Header, Deal },
  props: {},
  data() {
    return {
      showBtn: true,
      clickTrue: false,
      success: false,
      mPhone: '',
      mCode: '',
      checked: false,
    };
  },

  methods: {
    ...mapActions(['saveUserInfo']),
    validatorPhone(val) {
      // 验证手机号码
      if (/^1(3|4|5|6|7|8|9)\d{9}$/.test(val)) {
        this.clickTrue = true;
      } else {
        this.clickTrue = false;
      }
      return /^1(3|4|5|6|7|8|9)\d{9}$/.test(val);
    },
    finish() {
      this.$refs.countDown.reset();
      this.showBtn = true;
      this.clickTrue = true;
    },
    onSubmit() {
      if (!this.checked) {
        this.$toast('必须先同意用户协议和隐私政策');
        return;
      }
      this.lgoinFn(this.mCode, this.mPhone);
    },
    start() {
      if (!this.clickTrue) {
        this.$toast('请先输入手机号');
        return;
      }
      this.sendPhone();
    },
    sendPhone() {
      //发送验证码
      this.$axios
        .fetchPost('Mobile/Member/ServerSmsCode', {
          mobile: this.mPhone,
          action: 'login',
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.$toast(res.data.message);
            this.clickTrue = false;
            this.showBtn = false;
            setTimeout(() => {
              this.$refs.countDown.start();
            }, 100);
          } else {
            this.$dialog
              .alert({
                message: res.data.message,
                confirmButtonText: '知道了',
                confirmButtonColor: '#338aff',
              })
              .then(() => {
                // on close
              });
          }
        });
    },
    lgoinFn(code, username) {
      this.$axios
        .fetchPost('Mobile/Member/codelogin', {
          code,
          username,
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.saveUserInfo(res.data.data);
            this.$toast(res.data.message);
            this.$router.push({
              path: '/',
            });
          } else {
            this.$dialog
              .alert({
                title: '登录失败',
                message: res.data.message,
                confirmButtonColor: '#338aff',
                confirmButtonText: '知道了',
              })
              .then(() => {
                // on close
              });
          }
        });
    },
  },
};
</script>
<style lang="stylus" scoped>
.m_login-container
  height 100%
  position absolute
  left 0
  right 0
  background #fff
  .title
    font-size 24px
    color #333333
    text-align center
    margin 40px 0
    padding-left 40px
    .small-title
      margin-left 19px
      font-size 15px
      display inline
      color #333
  .from
    width 80%
    margin 0 auto
    .sub
      background #BBBBBB
      border none
      &.success
        background #ff6600
        color #fff
  .go-login
    margin 15px 0
    text-align center
    color #ff6600
    font-size 15px
  .van-count-down
    color #999
    font-size 13px
</style>
