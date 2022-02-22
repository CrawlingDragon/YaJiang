<template>
  <div class="find_password-container">
    <Header :indexHeader="false"></Header>
    <div class="title">找回密码</div>
    <van-form @submit="onSubmit" class="from">
      <van-field
        v-model="findPhone"
        name="findPhone"
        type="tel"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请输入手机号' },
          { validator: validatorPhone, message: '请输入正确的手机号' }
        ]"
      />
      <van-field
        v-model="findCode"
        name="findCode"
        center
        clearable
        placeholder="请输入4位验证码"
        maxlength="4"
        :rules="[{ required: true, message: '请输入4位验证码' }]"
      >
        <template #button>
          <div class=" btn" v-if="showBtn" @click="start">发送验证码</div>
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
        v-model="findPassword"
        type="password"
        name="findPassword"
        placeholder="请输入密码（6-20位）"
        maxlength="20"
        :rules="[
          {
            required: true,
            message: '请输入密码（6-20位）'
          },
          {
            validator: passwordLengValidator,
            message: passwordLengthMessage
          }
        ]"
        :formatter="value => value.replace(/\s/g, '')"
      />
      <van-field
        v-model="findPassword2"
        type="password"
        name="findPassword2"
        placeholder="请确认密码"
        maxlength="20"
        :formatter="value => value.replace(/\s/g, '')"
        :rules="[
          { required: true, message: '新输入密码不一致' },
          { validator: validatorPw2, message: '新输入密码不一致' }
        ]"
      />
      <div style="margin: 16px;margin-top:45px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          class="sub"
          :class="{
            success: findPhone && findCode && findPassword && findPassword2
          }"
        >
          保存
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import Header from "@/components/header/header";
import { mapActions } from "vuex";
import { useMeta } from "vue-meta";

export default {
  setup() {
    useMeta({
      title: "找回密码"
    });
    // const formatterPwd = () => {
    //   return;
    // };
  },

  name: "findPassword",
  components: { Header },
  props: {},
  data() {
    return {
      showBtn: true,
      clickTrue: false,
      findPhone: "",
      findCode: "",
      findPassword: "",
      findPassword2: "",
      passwordLengthMessage: "密码长度不能少于6位"
    };
  },
  created() {},
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    ...mapActions(["saveUserInfo"]),
    validatorPhone(val) {
      // 验证手机号码
      if (/^1(3|4|5|6|7|8|9)\d{9}$/.test(val)) {
        this.clickTrue = true;
      } else {
        this.clickTrue = false;
      }
      return /^1(3|4|5|6|7|8|9)\d{9}$/.test(val);
    },
    passwordLengValidator() {
      // 密码长度6-20
      // console.log("this.findPassword.length", this.findPassword.length);
      if (this.findPassword.length <= 5) {
        this.passwordLengthMessage = "密码长度不能少于6位";
        // console.log("this.passwordLengthMessage", this.passwordLengthMessage);
        return false;
      }
      if (this.findPassword.length >= 21) {
        this.passwordLengthMessage = "密码长度不能多于20位";
        return false;
      }
      // return true;
    },
    validatorPw2() {
      if (this.findPassword2 != "" && this.findPassword2 == this.findPassword) {
        return true;
      } else {
        return false;
      }
    },
    finish() {
      this.$refs.countDown.reset();
      this.showBtn = true;
      this.clickTrue = true;
    },
    onSubmit() {
      this.lookForPwd(this.findPhone, this.findCode, this.findPassword);
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
        .fetchPost("Mobile/Member/ServerSmsCode", {
          mobile: this.findPhone
        })
        .then(res => {
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
                confirmButtonText: "知道了",
                confirmButtonColor: "#338aff"
              })
              .then(() => {
                // on close
              });
          }
        });
    },
    lookForPwd(mobile, code, password) {
      this.$axios
        .fetchPost("/Mobile/Member/BackupPasswd", { mobile, code, password })
        .then(res => {
          if (res.data.code == 0) {
            this.saveUserInfo(res.data.data);

            this.$toast(res.data.message);
            setTimeout(() => {
              this.$router.push({
                path: "/"
              });
            }, 200);
          } else {
            this.$dialog
              .alert({
                message: res.data.message,
                confirmButtonText: "知道了",
                confirmButtonColor: "#338aff"
              })
              .then(() => {
                // on close
              });
          }
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.find_password-container
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
    span
      margin-left 19px
      font-size 15px
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
