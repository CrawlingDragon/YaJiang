var A=Object.defineProperty,S=Object.defineProperties;var y=Object.getOwnPropertyDescriptors;var C=Object.getOwnPropertySymbols;var N=Object.prototype.hasOwnProperty,L=Object.prototype.propertyIsEnumerable;var x=(o,t,a)=>t in o?A(o,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):o[t]=a,_=(o,t)=>{for(var a in t||(t={}))N.call(t,a)&&x(o,a,t[a]);if(C)for(var a of C(t))L.call(t,a)&&x(o,a,t[a]);return o},I=(o,t)=>S(o,y(t));import{a as w,G as h,H as B,J as M,K as V,r as E,o as U,A as z,m as H,s as D,L as O,M as R,c as g,e as m,h as k,k as e,j as n,g as c,v as f,t as j,z as P,x as X,y as Z}from"./index.a3582b47.js";import{_ as q}from"./plugin-vue_export-helper.21dcd24c.js";function G(o){const t=w(),a=h(()=>t.state.uId);function d(){if(!a.value){B.alert({title:"\u63D0\u793A",message:"\u627E\u519C\u8D44,\u8BF7\u5148\u767B\u5F55"}).then(()=>{M()});return}window.location.href=o}return{lookForStore:d}}const J={props:{showFlag:{type:Boolean,default:!0}},setup(o,{emit:t}){const a=w(),d=V(),T=h(()=>a.state.userInfo.username),s=h(()=>a.state.userInfo.avatar),p=h(()=>a.state.uId),l=h(()=>a.state.old),u=E("");U(()=>{u.value=d.name});const{lookForStore:v}=G({}.VUE_APP_SHARE_URL);function i(){t("update:showFlag",!1)}function F(){u.value=="Login"?t("update:showFlag",!1):M()}const b=z("size");return{userName:T,avatar:s,uId:p,pathName:u,lookForStore:v,hide:i,goToLogin:F,size:b,old:l}},name:"fast_nav",components:{},data(){return{}},computed:_({},H(["initMid","aiExpertId","uId"])),methods:I(_(_({},D(["setMid"])),O(["cleanUserInfo"])),{closeBox(){this.$emit("changeFlag",!1)},goToSign(){this.$router.push({path:"/sign"})},loginOutFn(){B.confirm({message:"\u786E\u8BA4\u8981\u9000\u51FA\u767B\u5F55\u5417",cancelButtonColor:"#155BBB",cancelButtonText:"\u786E\u5B9A",confirmButtonText:"\u53D6\u6D88",confirmButtonColor:"#999"}).then(()=>{}).catch(()=>{R(),this.cleanUserInfo()})},goToIndex(){this.$router.push({path:"/"}).catch(o=>o),this.closeBox()},goToHospital(){this.$router.push({path:"/into_hospital"}).catch(o=>o)},goToExpert(){this.setMid(this.initMid),this.$router.push({path:"/look_expert"}).catch(o=>o)},goToMessage(){this.$router.push({path:"/message"}).catch(o=>o)},goToBase(){this.setMid(this.initMid),this.$router.push({path:"/whole_base_list"}).catch(o=>o)},goToAnswer(){this.$router.push({path:"/index_online"}).catch(o=>o)},goToZuoXun(){this.$route.path==="/login"&&this.$emit("update:showFlag",!1),this.$router.push({path:"/whole_zuozhen_list"}).catch(t=>t)},goToCetu(){this.$route.path==="/login"&&this.$emit("update:showFlag",!1),this.$router.push({path:"/whole_cetu_list"})},goToAsk(){this.$route.path==="/login"&&this.$emit("update:showFlag",!1),this.$router.push({path:"/ask"}).catch(t=>t)},goToVideo(){this.$router.push({path:"/video_list"}).catch(o=>o)},goToDiseases(){this.$router.push({path:"/diseases"}).catch(o=>o)},goToAi(){this.$router.push({path:"/expert",query:{from:"ai"}}).catch(o=>o)},goToAboutUs(){this.$router.push({path:"/about_us"}).catch(o=>o)},goToMe(){this.closeBox(),this.$router.push({path:"/me"}).catch(o=>o)}})},r=o=>(X("data-v-713709cf"),o=o(),Z(),o),K={key:0,class:"fast_nav-conatiner"},Q={class:"title van-hairline--top van-hairline--bottom f22"},W=P(" \u5FEB\u901F\u5BFC\u822A "),Y={class:"nav-list"},$=r(()=>e("div",{class:"small-title f18"},"\u690D\u7269\u533B\u9662",-1)),oo=r(()=>e("div",{class:"p f20"},"\u627E\u4E13\u5BB6",-1)),to=r(()=>e("div",{class:"p f20"},"\u627E\u7B54\u6848",-1)),so=r(()=>e("div",{class:"p f20"},"\u5750\u8BCA\u5DE1\u8BCA",-1)),eo=r(()=>e("div",{class:"p f20"},"\u6D4B\u571F\u914D\u65B9",-1)),ao=r(()=>e("div",{class:"p f20"},"\u63D0\u95EE",-1)),io={class:"nav-list"},no=r(()=>e("div",{class:"small-title f18"},"\u5E73\u53F0\u670D\u52A1",-1)),lo=r(()=>e("div",{class:"p f20"},"\u770B\u89C6\u9891",-1)),co=r(()=>e("div",{class:"p f20"},"\u75C5\u866B\u5BB3",-1)),ro=r(()=>e("div",{class:"p f18"},"AI\u667A\u80FD\u4E13\u5BB6",-1)),uo=r(()=>e("div",{class:"p f20"},"\u5173\u4E8E\u6211\u4EEC",-1)),ho={key:0,class:"btns"},_o={key:1,class:"logined"},go=r(()=>e("div",{class:"btn-content"},[e("div",{class:"logo"}),e("div",{class:"name f18"},"\u4E3A\u519C\u670D\u52A1\u5E73\u53F0")],-1)),fo=[go];function po(o,t,a,d,T,s){const p=g("van-icon"),l=g("van-grid-item"),u=g("van-grid"),v=g("van-image");return a.showFlag?(m(),k("div",K,[e("div",Q,[W,n(p,{name:"cross",class:"van-hairline--left",onClick:s.closeBox},null,8,["onClick"])]),e("div",Y,[$,n(u,{"column-num":d.old?3:4,border:!1,style:{}},{default:c(()=>[n(l,null,{default:c(()=>[e("div",{class:"p f20",onClick:t[0]||(t[0]=(...i)=>s.goToHospital&&s.goToHospital(...i))},"\u627E\u533B\u9662")]),_:1}),n(l,{onClick:s.goToExpert},{default:c(()=>[oo]),_:1},8,["onClick"]),f("v-if",!0),n(l,{onClick:s.goToAnswer},{default:c(()=>[to]),_:1},8,["onClick"]),n(l,{onClick:s.goToZuoXun},{default:c(()=>[so]),_:1},8,["onClick"]),n(l,{onClick:s.goToCetu},{default:c(()=>[eo]),_:1},8,["onClick"]),n(l,{onClick:s.goToAsk},{default:c(()=>[ao]),_:1},8,["onClick"])]),_:1},8,["column-num"])]),e("div",io,[no,n(u,{"column-num":d.old?3:4,border:!1},{default:c(()=>[n(l,{onClick:s.goToVideo},{default:c(()=>[lo]),_:1},8,["onClick"]),n(l,{onClick:s.goToDiseases},{default:c(()=>[co]),_:1},8,["onClick"]),f(` <van-grid-item @click="goToLive">
          <div class="p">\u76F4\u64AD</div>
        </van-grid-item> `),n(l,null,{default:c(()=>[e("div",{class:"p f20",onClick:t[1]||(t[1]=(...i)=>s.goToMessage&&s.goToMessage(...i))},"\u8D44\u8BAF")]),_:1}),n(l,{onClick:s.goToAi},{default:c(()=>[ro]),_:1},8,["onClick"]),n(l,{onClick:s.goToAboutUs},{default:c(()=>[uo]),_:1},8,["onClick"])]),_:1},8,["column-num"]),f(' <van-grid :column-num="4" :border="false"> </van-grid> ')]),d.uId?(m(),k("div",_o,[n(v,{width:"35",height:"35",round:"",src:d.avatar,class:"avator",fit:"cover",onClick:s.goToMe},null,8,["src","onClick"]),e("p",{class:"name f20",onClick:t[4]||(t[4]=(...i)=>s.goToMe&&s.goToMe(...i))},j(d.userName),1),e("div",{class:"login-out f16",onClick:t[5]||(t[5]=(...i)=>s.loginOutFn&&s.loginOutFn(...i))},"\u9000\u51FA\u767B\u5F55")])):(m(),k("div",ho,[e("div",{class:"btn1 f20",onClick:t[2]||(t[2]=(...i)=>d.goToLogin&&d.goToLogin(...i))},"\u767B\u5F55"),e("div",{class:"btn2 f20",onClick:t[3]||(t[3]=(...i)=>s.goToSign&&s.goToSign(...i))},"\u6CE8\u518C")])),e("div",{class:"index-btn",onClick:t[6]||(t[6]=(...i)=>s.goToIndex&&s.goToIndex(...i))},fo)])):f("v-if",!0)}var To=q(J,[["render",po],["__scopeId","data-v-713709cf"]]);export{To as f};
