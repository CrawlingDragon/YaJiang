(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["m_login"],{"3e4c":function(e,t,n){},"5dea":function(e,t,n){"use strict";n.r(t);var c=n("7a23");Object(c["K"])("data-v-031f8816");var o={class:"m_login-container"},a={class:"title"},i=Object(c["m"])(" 短信快捷登录"),s=Object(c["m"])("注册"),r={style:{"margin-top":"30px","margin-left":"16px"}},l={style:{margin:"16px"}},u=Object(c["m"])(" 登录 "),d=Object(c["m"])("账号密码登录");function b(e,t,n,b,h,f){var j=this,m=Object(c["P"])("Header"),O=Object(c["P"])("router-link"),v=Object(c["P"])("van-field"),p=Object(c["P"])("van-count-down"),k=Object(c["P"])("Deal"),g=Object(c["P"])("van-button"),w=Object(c["P"])("van-form");return Object(c["H"])(),Object(c["j"])("div",o,[Object(c["n"])(m,{indexHeader:!1}),Object(c["k"])("div",a,[i,Object(c["n"])(O,{to:"/sign",class:"small-title"},{default:Object(c["Z"])((function(){return[s]})),_:1})]),Object(c["n"])(w,{onSubmit:f.onSubmit,class:"from"},{default:Object(c["Z"])((function(){return[Object(c["n"])(v,{modelValue:h.mPhone,"onUpdate:modelValue":t[0]||(t[0]=function(e){return h.mPhone=e}),name:"phone",placeholder:"请输入手机号",rules:[{required:!0,message:"请填写手机号"},{validator:f.validatorPhone,message:"手机号码格式不正确"}]},null,8,["modelValue","rules"]),Object(c["n"])(v,{modelValue:h.mCode,"onUpdate:modelValue":t[2]||(t[2]=function(e){return h.mCode=e}),name:"code",center:"",clearable:"",placeholder:"请输入4位验证码",maxlength:"4",rules:[{required:!0,message:"验证码不能为空"}]},{button:Object(c["Z"])((function(){return[Object(c["ab"])(Object(c["k"])("div",{class:"btn",onClick:t[1]||(t[1]=function(){return f.start&&f.start.apply(f,arguments)})},"发送验证码",512),[[c["X"],h.showBtn]]),Object(c["ab"])(Object(c["k"])("div",null,[Object(c["n"])(p,{ref:"countDown",millisecond:"",time:6e4,"auto-start":!1,format:"ss秒后重试",onFinish:f.finish},null,8,["onFinish"])],512),[[c["X"],!h.showBtn]])]})),_:1},8,["modelValue"]),Object(c["k"])("div",r,[Object(c["n"])(k,{checked:h.checked,"onUpdate:checked":t[3]||(t[3]=function(e){return h.checked=e})},null,8,["checked"])]),Object(c["k"])("div",l,[Object(c["n"])(g,{round:"",block:"",type:"info","native-type":"submit",class:Object(c["y"])(["sub",{success:j.mPhone&&j.mCode&&h.checked}])},{default:Object(c["Z"])((function(){return[u]})),_:1},8,["class"])])]})),_:1},8,["onSubmit"]),Object(c["n"])(O,{class:"go-login",to:"/login"},{default:Object(c["Z"])((function(){return[d]})),_:1})])}Object(c["I"])();var h=n("5530"),f=n("f392"),j=n("5502"),m=n("213a"),O=n("68fa"),v={name:"mLogin",setup:function(){Object(m["c"])({title:"短信快捷登录"})},components:{Header:f["a"],Deal:O["a"]},props:{},data:function(){return{showBtn:!0,clickTrue:!1,success:!1,mPhone:"",mCode:"",checked:!1}},methods:Object(h["a"])(Object(h["a"])({},Object(j["b"])(["saveUserInfo"])),{},{validatorPhone:function(e){return/^1(3|4|5|6|7|8|9)\d{9}$/.test(e)?this.clickTrue=!0:this.clickTrue=!1,/^1(3|4|5|6|7|8|9)\d{9}$/.test(e)},finish:function(){this.$refs.countDown.reset(),this.showBtn=!0,this.clickTrue=!0},onSubmit:function(){this.checked?this.lgoinFn(this.mCode,this.mPhone):this.$toast("必须先同意用户协议和隐私政策")},start:function(){this.clickTrue?this.sendPhone():this.$toast("请先输入手机号")},sendPhone:function(){var e=this;this.$axios.fetchPost("Mobile/Member/ServerSmsCode",{mobile:this.mPhone,action:"login"}).then((function(t){0==t.data.code?(e.$toast(t.data.message),e.clickTrue=!1,e.showBtn=!1,setTimeout((function(){e.$refs.countDown.start()}),100)):e.$dialog.alert({message:t.data.message,confirmButtonText:"知道了",confirmButtonColor:"#338aff"}).then((function(){}))}))},lgoinFn:function(e,t){var n=this;this.$axios.fetchPost("Mobile/Member/codelogin",{code:e,username:t}).then((function(e){0==e.data.code?(n.saveUserInfo(e.data.data),n.$toast(e.data.message),n.$router.push({path:"/"})):n.$dialog.alert({title:"登录失败",message:e.data.message,confirmButtonColor:"#338aff",confirmButtonText:"知道了"}).then((function(){}))}))}})},p=(n("c44d"),n("d959")),k=n.n(p);const g=k()(v,[["render",b],["__scopeId","data-v-031f8816"]]);t["default"]=g},"68fa":function(e,t,n){"use strict";var c=n("7a23"),o={class:"deal-box"},a=Object(c["m"])(" 我已阅读并同意"),i=Object(c["m"])("与"),s=["innerHTML"],r=["innerHTML"];function l(e,t,n,l,u,d){var b=Object(c["P"])("van-checkbox"),h=Object(c["P"])("van-icon"),f=Object(c["P"])("van-overlay");return Object(c["H"])(),Object(c["j"])(c["b"],null,[Object(c["k"])("div",o,[Object(c["n"])(b,{modelValue:l.checkbox,"onUpdate:modelValue":t[0]||(t[0]=function(e){return l.checkbox=e}),"icon-size":"20px",class:"checkbox","checked-color":"#338aff"},null,8,["modelValue"]),a,Object(c["k"])("span",{onClick:t[1]||(t[1]=function(e){return l.show=!0})},"用户协议"),i,Object(c["k"])("span",{onClick:t[2]||(t[2]=function(e){return l.privacyShow=!0})},"隐私政策")]),Object(c["n"])(f,{show:l.show,onClick:t[5]||(t[5]=function(e){return l.show=!1}),"z-index":"20","lock-scroll":!1},{default:Object(c["Z"])((function(){return[Object(c["k"])("div",{class:"wrapper",onClick:t[4]||(t[4]=Object(c["bb"])((function(){}),["stop"]))},[Object(c["k"])("div",{class:"close-btn",onClick:t[3]||(t[3]=function(){return l.closeDeal&&l.closeDeal.apply(l,arguments)})},[Object(c["n"])(h,{name:"cross"})]),Object(c["k"])("h3",null,Object(c["T"])(u.privacyData.title),1),Object(c["k"])("p",{class:"text",innerHTML:u.privacyData.content},null,8,s)])]})),_:1},8,["show"]),Object(c["n"])(f,{show:l.privacyShow,onClick:t[8]||(t[8]=function(e){return l.privacyShow=!1}),"z-index":"20","lock-scroll":!1},{default:Object(c["Z"])((function(){return[Object(c["k"])("div",{class:"wrapper",onClick:t[7]||(t[7]=Object(c["bb"])((function(){}),["stop"]))},[Object(c["k"])("div",{class:"close-btn",onClick:t[6]||(t[6]=function(){return l.closePrivacy&&l.closePrivacy.apply(l,arguments)})},[Object(c["n"])(h,{name:"cross"})]),Object(c["k"])("h3",null,Object(c["T"])(u.dealData.title),1),Object(c["k"])("p",{class:"text",innerHTML:u.dealData.content},null,8,r)])]})),_:1},8,["show"])],64)}var u={props:{checked:{type:Boolean,default:!1}},setup:function(e,t){var n=t.emit,o=Object(c["M"])(!1),a=Object(c["M"])(!1),i=Object(c["M"])(!1);function s(){a.value=!1}function r(){i.value=!1}return Object(c["Y"])(o,(function(e){n("update:checked",e)})),{checkbox:o,show:a,privacyShow:i,closeDeal:s,closePrivacy:r}},data:function(){return{dealData:{},privacyData:{}}},created:function(){this.getUserAgreement(),this.getUserPrivacy()},methods:{getUserAgreement:function(){var e=this;this.$axios.fetchGet("/Mobile/User/user_agreement").then((function(t){0===t.data.code&&(e.dealData=t.data.data)}))},getUserPrivacy:function(){var e=this;this.$axios.fetchGet("/Mobile/User/service_agreement").then((function(t){0===t.data.code&&(e.privacyData=t.data.data)}))}}},d=(n("b954"),n("d959")),b=n.n(d);const h=b()(u,[["render",l]]);t["a"]=h},b954:function(e,t,n){"use strict";n("3e4c")},c44d:function(e,t,n){"use strict";n("de41")},de41:function(e,t,n){}}]);
//# sourceMappingURL=m_login.f1ea64dc.js.map