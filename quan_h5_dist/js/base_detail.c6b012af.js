(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["base_detail"],{"1fdf":function(t,e,c){},3829:function(t,e,c){"use strict";c("1fdf")},"39c9":function(t,e,c){},"903f":function(t,e,c){"use strict";c.r(e);c("b0c0");var n=c("7a23");Object(n["K"])("data-v-0f6f4880");var o={class:"base_detail-conatiner"},a={class:"nav-top"},i={class:"company"},s={class:"name"},u={class:"contant-context"},r={class:"item"},l=Object(n["k"])("div",{class:"icon icon01"},null,-1),b=["href"],j={class:"item"},O=Object(n["k"])("div",{class:"icon icon02"},null,-1),d={class:"text"},f={class:"item"},h=Object(n["k"])("div",{class:"icon icon03"},null,-1),p={class:"text1"},k={class:"info"},v={class:"item"},g=Object(n["k"])("p",{class:"p1"},"主要作物",-1),m={class:"p2"},T={class:"item"},C=Object(n["k"])("p",{class:"p1"},"基地面积",-1),_={class:"p2"},y=Object(n["k"])("p",{class:"p1"},"服务医院",-1),w={class:"p3"},$={class:"swiper-box"},x=Object(n["k"])("div",{class:"title"},"基地图片",-1);function Z(t,e,c,Z,M,I){var B=Object(n["P"])("Header"),D=Object(n["P"])("van-image"),H=Object(n["P"])("van-overlay"),P=Object(n["P"])("van-swipe-item"),S=Object(n["P"])("van-swipe"),F=Object(n["P"])("van-empty");return Object(n["H"])(),Object(n["j"])("div",o,[Object(n["n"])(B,{header:"logoHeader"}),Object(n["ab"])(Object(n["k"])("div",a,[Object(n["k"])("div",{class:Object(n["y"])(["status",{glod:"8"==M.base.ctype,base:"6"==M.base.ctype,none:"0"==M.base.ctype}])},Object(n["T"])("8"==M.base.ctype?"金牌认证":"6"==M.base.ctype?"基地认证":"未认证"),3),Object(n["k"])("div",i,[Object(n["n"])(D,{class:"company-avator",round:"",src:M.base.logo},null,8,["src"]),Object(n["k"])("p",s,Object(n["T"])(M.base.name),1),Object(n["k"])("div",{class:"share",onClick:e[0]||(e[0]=function(t){return M.shareShow=!0})}),Object(n["n"])(H,{show:M.shareShow,onClick:e[2]||(e[2]=function(t){return M.shareShow=!1}),"z-index":"1111"},{default:Object(n["Z"])((function(){return[Object(n["k"])("div",{class:"wrapper",onClick:e[1]||(e[1]=Object(n["bb"])((function(){}),["stop"]))},[Object(n["n"])(D,{src:M.base.share_code,fit:"cover",class:"share-img",radius:"5px"},null,8,["src"])])]})),_:1},8,["show"])]),Object(n["ab"])(Object(n["k"])("div",u,[Object(n["k"])("div",r,[l,Object(n["k"])("a",{href:"tel:"+M.base.telephone,class:"text",ref:"tel"},Object(n["T"])(M.base.telephone),9,b),Object(n["k"])("div",{class:"do",onClick:e[3]||(e[3]=function(){return I.clickTel&&I.clickTel.apply(I,arguments)})},"拨打")]),Object(n["k"])("div",j,[O,Object(n["n"])(D,{class:"avator",round:"",src:M.base.avatar},null,8,["src"]),Object(n["k"])("div",d,Object(n["T"])(M.base.linkman),1),Object(n["k"])("div",{class:"do",onClick:e[4]||(e[4]=function(){return I.goToPerson&&I.goToPerson.apply(I,arguments)})},"查看")]),Object(n["k"])("div",f,[h,Object(n["k"])("div",p,[Object(n["m"])(Object(n["T"])(M.base.address)+" ",1),Object(n["k"])("div",{class:"do",onClick:e[5]||(e[5]=function(t){return I.goToLocation(M.base.address)})},"查看")])])],512),[[n["X"],!M.noData]])],512),[[n["X"],!M.noData]]),Object(n["ab"])(Object(n["k"])("div",k,[Object(n["k"])("div",v,[g,Object(n["k"])("p",m,Object(n["T"])(M.base.zwtype),1)]),Object(n["k"])("div",T,[C,Object(n["k"])("p",_,Object(n["T"])(M.base.guimo),1)]),Object(n["k"])("div",{class:"item",onClick:e[6]||(e[6]=function(t){return I.goToHospital(M.base.mid)})},[y,Object(n["k"])("p",w,Object(n["T"])(M.base.mpublic),1)])],512),[[n["X"],!M.noData]]),Object(n["ab"])(Object(n["k"])("div",$,[x,Object(n["ab"])(Object(n["n"])(S,{class:"my-swipe",autoplay:3e3,"indicator-color":"white"},{default:Object(n["Z"])((function(){return[(Object(n["H"])(!0),Object(n["j"])(n["b"],null,Object(n["N"])(M.base.pic,(function(t){return Object(n["H"])(),Object(n["h"])(P,{key:t.id},{default:Object(n["Z"])((function(){return[Object(n["n"])(D,{src:t,class:"img"},null,8,["src"])]})),_:2},1024)})),128))]})),_:1},512),[[n["X"],M.base.pic]])],512),[[n["X"],!M.noData]]),Object(n["ab"])(Object(n["n"])(F,{description:"暂无基地"},null,512),[[n["X"],M.noData]])])}Object(n["I"])();var M=c("5530"),I=c("3a6a"),B=c("5502"),D=c("213a"),H={setup:function(){Object(D["c"])({title:"基地详情"})},name:"baseDetail",components:{Header:I["a"]},props:{},data:function(){return{id:this.$route.query.id,base:"",shareShow:!1,noData:!0}},computed:{},created:function(){},watch:{$route:function(){}},mounted:function(){this.getBaseData()},methods:Object(M["a"])(Object(M["a"])({},Object(B["d"])(["setMid"])),{},{clickTel:function(){this.$refs.tel.click()},getBaseData:function(){var t=this;this.$axios.fetchPost("/Mobile/Mpublic/getBaseDetail",{id:this.id}).then((function(e){0==e.data.code?(t.noData=!1,t.base=e.data.data):201==e.data.code&&(t.noData=!0)}))},goToPerson:function(){this.$router.push({path:"/expert",query:{id:this.base.uId}})},goToLocation:function(t){this.$router.push({path:"/base_location",query:{location:t}})},goToHospital:function(t){this.setMid(t),this.$router.push({path:"/hospital"})}})},P=(c("3829"),c("d959")),S=c.n(P);const F=S()(H,[["render",Z],["__scopeId","data-v-0f6f4880"]]);e["default"]=F},d4c37:function(t,e,c){"use strict";var n=c("7a23");Object(n["K"])("data-v-72b5a2a7");var o={key:0,class:"fast_nav-conatiner"},a={class:"title van-hairline--top van-hairline--bottom"},i=Object(n["m"])(" 快速导航 "),s={class:"nav-list"},u=Object(n["k"])("div",{class:"small-title"},"新型庄稼医院",-1),r=Object(n["k"])("div",{class:"p"},"找专家",-1),l=Object(n["k"])("div",{class:"p"},"找基地",-1),b=Object(n["k"])("div",{class:"p"},"专享商城",-1),j=Object(n["k"])("div",{class:"p"},"找答案",-1),O=Object(n["k"])("div",{class:"p"},"坐诊巡诊",-1),d=Object(n["k"])("div",{class:"p"},"测土配方",-1),f=Object(n["k"])("div",{class:"p"},"提问",-1),h={class:"nav-list"},p=Object(n["k"])("div",{class:"small-title"},"平台服务",-1),k=["href"],v=Object(n["k"])("div",{class:"p"},"培训视频",-1),g=Object(n["k"])("div",{class:"p"},"病虫害",-1),m=Object(n["k"])("div",{class:"p"},"直播",-1),T=Object(n["k"])("div",{class:"p"},"AI智能专家",-1),C=Object(n["k"])("div",{class:"p"},"关于我们",-1),_={key:0,class:"btns"},y={key:1,class:"logined"},w=Object(n["k"])("div",{class:"btn-content"},[Object(n["k"])("div",{class:"logo"}),Object(n["k"])("div",{class:"name"},"益农宝·为农服务平台")],-1),$=[w];function x(t,e,c,w,x,Z){var M=Object(n["P"])("van-icon"),I=Object(n["P"])("van-grid-item"),B=Object(n["P"])("van-grid"),D=Object(n["P"])("van-image");return c.showFlag?(Object(n["H"])(),Object(n["j"])("div",o,[Object(n["k"])("div",a,[i,Object(n["n"])(M,{name:"cross",class:"van-hairline--left",onClick:Z.closeBox},null,8,["onClick"])]),Object(n["k"])("div",s,[u,Object(n["n"])(B,{"column-num":4,border:!1,style:{}},{default:Object(n["Z"])((function(){return[Object(n["n"])(I,null,{default:Object(n["Z"])((function(){return[Object(n["k"])("div",{class:"p",onClick:e[0]||(e[0]=function(){return Z.goToHospital&&Z.goToHospital.apply(Z,arguments)})},"找医院")]})),_:1}),Object(n["n"])(I,{onClick:Z.goToExpert},{default:Object(n["Z"])((function(){return[r]})),_:1},8,["onClick"]),Object(n["n"])(I,{onClick:Z.goToBase},{default:Object(n["Z"])((function(){return[l]})),_:1},8,["onClick"]),Object(n["i"])("",!0),Object(n["n"])(I,{onClick:e[1]||(e[1]=function(t){return w.lookForStore()})},{default:Object(n["Z"])((function(){return[b]})),_:1})]})),_:1}),Object(n["n"])(B,{"column-num":4,border:!1},{default:Object(n["Z"])((function(){return[Object(n["n"])(I,{onClick:Z.goToAnswer},{default:Object(n["Z"])((function(){return[j]})),_:1},8,["onClick"]),Object(n["n"])(I,{onClick:Z.goToZuoXun},{default:Object(n["Z"])((function(){return[O]})),_:1},8,["onClick"]),Object(n["n"])(I,{onClick:Z.goToCetu},{default:Object(n["Z"])((function(){return[d]})),_:1},8,["onClick"]),Object(n["n"])(I,{onClick:Z.goToAsk},{default:Object(n["Z"])((function(){return[f]})),_:1},8,["onClick"])]})),_:1})]),Object(n["k"])("div",h,[p,Object(n["n"])(B,{"column-num":4,border:!1},{default:Object(n["Z"])((function(){return[Object(n["n"])(I,null,{default:Object(n["Z"])((function(){return[Object(n["k"])("a",{href:x.fromStoreUrl,class:"p",target:"_blank"},"农资商城",8,k)]})),_:1}),Object(n["n"])(I,{onClick:Z.goToVideo},{default:Object(n["Z"])((function(){return[v]})),_:1},8,["onClick"]),Object(n["n"])(I,{onClick:Z.goToDiseases},{default:Object(n["Z"])((function(){return[g]})),_:1},8,["onClick"]),Object(n["n"])(I,{onClick:Z.goToLive},{default:Object(n["Z"])((function(){return[m]})),_:1},8,["onClick"]),Object(n["n"])(I,null,{default:Object(n["Z"])((function(){return[Object(n["k"])("div",{class:"p",onClick:e[2]||(e[2]=function(){return Z.goToMessage&&Z.goToMessage.apply(Z,arguments)})},"资讯")]})),_:1}),Object(n["n"])(I,{onClick:Z.goToAi},{default:Object(n["Z"])((function(){return[T]})),_:1},8,["onClick"]),Object(n["n"])(I,{onClick:Z.goToAboutUs},{default:Object(n["Z"])((function(){return[C]})),_:1},8,["onClick"])]})),_:1}),Object(n["n"])(B,{"column-num":4,border:!1})]),w.uId?(Object(n["H"])(),Object(n["j"])("div",y,[Object(n["n"])(D,{width:"35",height:"35",round:"",src:w.avatar,class:"avator",fit:"cover",onClick:Z.goToMe},null,8,["src","onClick"]),Object(n["k"])("p",{class:"name",onClick:e[5]||(e[5]=function(){return Z.goToMe&&Z.goToMe.apply(Z,arguments)})},Object(n["T"])(w.userName),1),Object(n["k"])("div",{class:"login-out",onClick:e[6]||(e[6]=function(){return Z.loginOut&&Z.loginOut.apply(Z,arguments)})},"退出登录")])):(Object(n["H"])(),Object(n["j"])("div",_,[Object(n["k"])("div",{class:"btn1",onClick:e[3]||(e[3]=function(){return w.goToLogin&&w.goToLogin.apply(w,arguments)})},"登录"),Object(n["k"])("div",{class:"btn2",onClick:e[4]||(e[4]=function(){return Z.goToSign&&Z.goToSign.apply(Z,arguments)})},"注册")])),Object(n["k"])("div",{class:"index-btn",onClick:e[7]||(e[7]=function(){return Z.goToIndex&&Z.goToIndex.apply(Z,arguments)})},$)])):Object(n["i"])("",!0)}Object(n["I"])();var Z=c("5530"),M=(c("b0c0"),c("5502")),I=c("75e6"),B=c("6c02"),D=c("f536"),H={props:{showFlag:{type:Boolean,default:!1}},setup:function(t,e){var c=e.emit,o=Object(M["f"])(),a=Object(B["c"])(),i=Object(B["d"])(),s=Object(n["f"])((function(){return o.state.userInfo.username})),u=Object(n["f"])((function(){return o.state.userInfo.avatar})),r=Object(n["f"])((function(){return o.state.uId})),l=Object(n["M"])("");Object(n["E"])((function(){l.value=a.name}));var b=Object(D["a"])("http://yth.mvip.114nz.com/",O),j=b.lookForStore;function O(){c("update:showFlag",!1)}function d(){"Login"==l.value?c("update:showFlag",!1):i.push({path:"/login"})}return{userName:s,avatar:u,uId:r,pathName:l,lookForStore:j,hide:O,goToLogin:d}},name:"fast_nav",components:{},data:function(){return{fromStoreUrl:"http://yth.mall.114nz.com/",shareUrl:"http://yth.mvip.114nz.com/"}},computed:Object(Z["a"])({},Object(M["e"])(["initMid","aiExpertId","uId"])),methods:Object(Z["a"])(Object(Z["a"])(Object(Z["a"])({},Object(M["d"])(["setMid"])),Object(M["b"])(["cleanUserInfo"])),{},{closeBox:function(){this.$emit("changeFlag",!1)},goToSign:function(){this.$router.push({path:"/sign"})},loginOut:function(){var t=this;I["a"].confirm({message:"确认要退出登录吗",cancelButtonColor:"#155BBB",cancelButtonText:"确定",confirmButtonText:"取消",confirmButtonColor:"#999"}).then((function(){})).catch((function(){t.cleanUserInfo(),t.$router.push({path:"/login"})}))},goToIndex:function(){this.$router.push({path:"/"}).catch((function(t){return t})),this.closeBox()},goToHospital:function(){this.$router.push({path:"/into_hospital"}).catch((function(t){return t}))},goToExpert:function(){this.setMid(this.initMid),this.$router.push({path:"/look_expert"}).catch((function(t){return t}))},goToLive:function(){this.setMid(this.initMid),this.$router.push({path:"/live",query:{from:"index"}}).catch((function(t){return t}))},goToMessage:function(){this.$router.push({path:"/message"}).catch((function(t){return t}))},goToBase:function(){this.setMid(this.initMid),this.$router.push({path:"/whole_base_list"}).catch((function(t){return t}))},goToAnswer:function(){this.$router.push({path:"/index_online"}).catch((function(t){return t}))},goToZuoXun:function(){var t=this.$route.path;"/login"===t&&this.$emit("update:showFlag",!1),this.$router.push({path:"/whole_zuozhen_list"}).catch((function(t){return t}))},goToCetu:function(){var t=this.$route.path;"/login"===t&&this.$emit("update:showFlag",!1),this.$router.push({path:"/whole_cetu_list"})},goToAsk:function(){var t=this.$route.path;"/login"===t&&this.$emit("update:showFlag",!1),this.$router.push({path:"/ask"}).catch((function(t){return t}))},goToVideo:function(){this.$router.push({path:"/video_list"}).catch((function(t){return t}))},goToDiseases:function(){this.$router.push({path:"/diseases"}).catch((function(t){return t}))},goToAi:function(){this.$router.push({path:"/expert",query:{from:"ai"}}).catch((function(t){return t}))},goToAboutUs:function(){this.$router.push({path:"/about_us"}).catch((function(t){return t}))},goToMe:function(){this.closeBox(),this.$router.push({path:"/me"}).catch((function(t){return t}))}})},P=(c("fafa"),c("d959")),S=c.n(P);const F=S()(H,[["render",x],["__scopeId","data-v-72b5a2a7"]]);e["a"]=F},f536:function(t,e,c){"use strict";c.d(e,"a",(function(){return s}));var n=c("75e6"),o=c("5502"),a=c("7a23"),i=c("6c02");function s(t,e){var c=Object(o["f"])(),s=Object(a["f"])((function(){return c.state.uId})),u=Object(i["d"])(),r=Object(i["c"])();function l(){var c=r.path;s.value?window.location.href=t:n["a"].alert({title:"提示",message:"找农资,请先登录"}).then((function(){u.push({path:"/login"}),"/login"==c&&e&&e()}))}return{lookForStore:l}}},fafa:function(t,e,c){"use strict";c("39c9")}}]);
//# sourceMappingURL=base_detail.c6b012af.js.map