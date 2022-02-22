<template>
  <div class="login-container">
    <Header :indexHeader="false"></Header>

    <div class="title-bar">
      账号密码登录<router-link to="/sign" class="sign">注册</router-link>
    </div>
    <van-form @submit="onSubmit" class="from">
      <van-field
        v-model="username"
        type="text"
        name="phone"
        placeholder="请输入手机号"
        :rules="[
          { validator: validatorPhone, message: '手机格式不正确' },
          { required: true }
        ]"
      />
      <van-field
        v-model="password"
        type="password"
        name="pwd"
        placeholder="请输入密码"
        :rules="[{ required: true }]"
      />
      <router-link class="forget" to="/find_password">忘记密码？</router-link>
      <Deal v-model:checked="checked"></Deal>
      <div style="margin: 16px;">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          class="sub"
          :class="{ success: username && password && clickTrue && checked }"
        >
          登录
        </van-button>
      </div>
    </van-form>
    <router-link class="message-login" to="m_login">短信快捷登录></router-link>
  </div>
</template>
<script>
import Header from "@/components/header/header";
import Deal from "@/components/base/deal/deal.vue";
import { useMeta } from "vue-meta";
import { mapMutations, mapState, mapActions } from "vuex";
export default {
  setup() {
    useMeta({ title: "登录" });
  },
  name: "Login",
  components: { Header, Deal },
  props: {},
  data() {
    return {
      username: "",
      password: "",
      checked: false,
      clickTrue: false,
      userAgreement: {}
    };
  },
  created() {},
  computed: {
    ...mapState(["uId"])
  },
  watch: {},
  mounted() {},
  unmounted() {},
  methods: {
    ...mapMutations(["setUid", "setLogined"]),
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
    onSubmit() {
      if (!this.checked) {
        this.$toast("必须先同意用户协议和隐私政策");
        return;
      }
      this.$axios
        .fetchPost("Mobile/Member/login", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          const data = res.data;
          if (data.code == 0) {
            this.saveUserInfo(data.data);
            this.$toast(data.message);
            setTimeout(() => {
              this.$router.push({
                path: "/index"
              });
            }, 500);
          } else {
            this.$dialog
              .alert({
                title: "登录失败",
                message: data.message,
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
.login-container
  height 100%
  background #fff
  position absolute
  bottom 0
  left 0
  right 0
  .title-bar
    font-size 24px
    color #333
    text-align center
    margin 80px 0 40px
    .sign
      font-size 15px
      display inline
      margin-left 19px
      color #333
  .from
    width 80%
    margin 0 auto
    position relative
    .sub
      background #BBBBBB
      border none
      &.success
        background #ff6600
        color #fff
  .forget
    text-align right
    font-size 12px
    color $theme-color
    margin-top 20px
    margin-bottom 30px
  .message-login
    color #FF6600
    text-align center
    font-size 15px
    position relative
    padding-top 10px
  .line
    color #333333
    font-size 12px
    width 80%
    margin 20px auto
  .wechat
    width 60px
    height 60px
    margin 15px auto
    border-radius 100%
    overflow hidden
    background #e5e5e5
</style>
