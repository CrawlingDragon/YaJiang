<template>
  <div class="sign-container">
    <Header :indexHeader="false"></Header>
    <div class="title">快速注册</div>
    <van-form @submit="onSubmit2" class="from">
      <van-field
        v-model="username"
        name="phone"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '手机号不能为空' },
          { validator: validatorPhone, message: '手机号码格式不正确' },
        ]"
      />
      <van-field
        v-model="sms"
        center
        clearable
        name="code"
        placeholder="请输入4位验证码"
        maxlength="4"
        :rules="[{ required: true, message: '验证码不能为空' }]"
      >
        <template #button>
          <div class="btn" v-if="showBtn" @click="start">发送验证码</div>
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
      <van-field
        v-model="password"
        type="password"
        name="pwd"
        placeholder="请输入密码（6-20位）"
        minlength="6"
        maxlength="20"
        :rules="[
          {
            required: true,
            message: '密码不能为空',
          },
          { validator: passwordLengValidator, message: passwordLengthMessage },
        ]"
      />
      <div style="margin-top:30px;margin-left:16px">
        <Deal v-model:checked="checked"></Deal>
      </div>
      <div style="margin: 16px;">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          class="sub"
          :class="{ success: checked && password && username && sms }"
        >
          注册
        </van-button>
      </div>
    </van-form>
    <div class="go-login" @click="goLogin">已有益农宝账号，去登录</div>
  </div>
</template>
<script>
import Header from '@/components/header/header';
import { mapActions } from 'vuex';
import { useMeta } from 'vue-meta';
import { login } from '@/common/js/getToken';
import Deal from '@/components/base/deal/deal.vue';
export default {
  name: 'sign',
  components: { Header, Deal },
  setup() {
    useMeta({
      title: '注册',
    });
  },
  props: {},
  data() {
    return {
      showBtn: true,
      clickTrue: false,
      username: '',
      sms: '',
      password: '',
      checked: false,
      passwordLengthMessage: '密码长度不能少于6位',
    };
  },
  created() {},
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    ...mapActions(['saveUserInfo']),
    passwordLengValidator() {
      // 密码长度6-20
      // console.log("this.findPassword.length", this.findPassword.length);
      if (this.password.length <= 5) {
        this.passwordLengthMessage = '密码长度不能少于6位';
        // console.log("this.passwordLengthMessage", this.passwordLengthMessage);
        return false;
      }
      if (this.password.length >= 21) {
        this.passwordLengthMessage = '密码长度不能多于20位';
        return false;
      }
      // return true;
    },
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
    onSubmit2() {
      if (!this.checked) {
        this.$toast('必须先同意用户协议和隐私政策');
        return;
      }
      this.signFn(this.username, this.password, this.sms);
    },
    signFn(username, password, code) {
      this.$axios
        .fetchPost('Mobile/Member/register', {
          username,
          password,
          code,
        })
        .then((res) => {
          const data = res.data;
          this.$toast(res.data.message);
          if (data.code == 0) {
            this.saveUserInfo(data.data);
            setTimeout(() => {
              this.$router.push({ path: '/index' });
            }, 500);
          }
        });
    },
    start() {
      if (!this.clickTrue) {
        return;
      }
      this.sendPhone();
    },
    sendPhone() {
      //发送验证码
      this.$axios
        .fetchPost('Mobile/Member/ServerSmsCode', {
          mobile: this.username,
          action: 'reg',
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
    goLogin() {
      login();
    },
  },
};
</script>
<style lang="stylus" scoped>
.sign-container
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
  .from
    width 80%
    margin 0 auto
  .go-login
    margin 15px 0
    text-align center
    color #ff6600
    font-size 15px
  .van-count-down
    color #999
    font-size 13px
.sub
  &.success
    background #ff6600
    color #fff
</style>
