(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["index"],{"01cd":function(t,e,i){t.exports=i.p+"img/49.ad48e08d.png"},"0fed":function(t,e,i){"use strict";i("f989")},"1e94":function(t,e,i){"use strict";i.d(e,"a",(function(){return l}));var n=i("1da1"),c=(i("96cf"),i("e096")),s=i("75e6"),o=i("7a23"),r=i("5502"),a="浙江省,杭州市";function l(){return u.apply(this,arguments)}function u(){return u=Object(n["a"])(regeneratorRuntime.mark((function t(){var e,i,n,l;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e=Object(r["f"])(),i=Object(o["f"])((function(){return e.state.userInfoLocation})),t.next=4,Object(c["c"])();case 4:n=t.sent,l="",6===n?(i.value?(s["a"].alert({title:"定位失败",message:"检测到你未打开定位服务，已使用位置".concat(i.value),confirmButtonText:"好的",confirmButtonColor:"#155BBB"}),l=i.value):(s["a"].alert({title:"定位失败",message:"检测到你未打开定位服务，已使用默认位置".concat(a),confirmButtonText:"好的",confirmButtonColor:"#155BBB"}),l=a),e.commit("setAxiosAddress",l)):99===n&&(i.value?(s["a"].alert({title:"定位失败",message:"抱歉未定位到您的所在地,已使用位置".concat(i.value),confirmButtonText:"好的",confirmButtonColor:"#155BBB"}),l=i):(s["a"].alert({title:"定位失败",message:"检测到你未打开定位服务，已使用默认位置".concat(a),confirmButtonText:"好的",confirmButtonColor:"#155BBB"}),l=a),e.commit("setAxiosAddress",l));case 7:case"end":return t.stop()}}),t)}))),u.apply(this,arguments)}},2343:function(t,e,i){},"2e9c":function(t,e,i){"use strict";var n=i("7a23");Object(n["K"])("data-v-7b92d3c6");var c={class:"top"},s={class:"right"},o={class:"name"},r={class:"title"},a={key:0,class:"address"},l={key:1,class:"address time"},u={key:0,class:"kind"},d={class:"join"};function b(t,e,i,b,j,O){var p=Object(n["P"])("van-image");return Object(n["H"])(),Object(n["j"])("div",{class:"recommend_expert-container",onClick:e[0]||(e[0]=function(t){return O.goToExpert(i.list.uid)})},[Object(n["k"])("div",c,[Object(n["n"])(p,{class:"img",src:i.list.avatar,fit:"cover"},null,8,["src"]),Object(n["k"])("div",s,[Object(n["k"])("div",o,Object(n["T"])(i.list.realname),1),Object(n["k"])("div",r,Object(n["T"])(i.list.groupname),1),i.list.company?(Object(n["H"])(),Object(n["j"])("div",a,Object(n["T"])(i.list.company),1)):Object(n["i"])("",!0),i.list.addtime&&"index"!=j.routeName&&"/"!=j.routeName?(Object(n["H"])(),Object(n["j"])("div",l,Object(n["T"])(i.list.addtime),1)):Object(n["i"])("",!0)])]),""!=i.list.skill&&"暂未设置"!=i.list.skill?(Object(n["H"])(),Object(n["j"])("div",u,[(Object(n["H"])(!0),Object(n["j"])(n["b"],null,Object(n["N"])(O.skillArr,(function(t){return Object(n["H"])(),Object(n["j"])("div",{class:"item",key:t},Object(n["T"])(t),1)})),128))])):Object(n["i"])("",!0),Object(n["k"])("div",d,[Object(n["ab"])(Object(n["k"])("div",{class:"answer-number"},Object(n["T"])(i.list.cnt_answer)+"次解答 ",513),[[n["X"],0!=i.list.cnt_answer]]),i.list.cnt_joinhospital>=1?Object(n["ab"])((Object(n["H"])(),Object(n["j"])("div",{key:0,class:Object(n["y"])(["join-number",{noBorder:0==i.list.cnt_answer||0==i.list.cnt_joinhospital}])},Object(n["T"])(i.list.cnt_joinhospital)+"家加入医院 ",3)),[[n["X"],!i.isSelfExpert]]):Object(n["i"])("",!0)])])}Object(n["I"])();i("ac1f"),i("1276"),i("b0c0");var j={name:"Recommend_expert",components:{},props:{list:{type:Object,default:function(){return{}}},isSelfExpert:{type:Boolean,default:!1}},data:function(){return{routeName:""}},computed:{skillArr:function(){if(!this.list.skill)return[];var t=this.list.skill,e=t.split(",");return e}},watch:{},mounted:function(){this.routeName=this.$route.name},methods:{goToExpert:function(t){this.$router.push({path:"/expert",query:{id:t}})}}},O=(i("8997"),i("d959")),p=i.n(O);const f=p()(j,[["render",b],["__scopeId","data-v-7b92d3c6"]]);e["a"]=f},"37f9":function(t,e,i){"use strict";i.r(e);var n=i("7a23"),c=i("01cd"),s=i.n(c);Object(n["K"])("data-v-d7ed7856");var o={class:"index-container",ref:"index"},r={class:"swiper-box",ref:"swiper"},a={class:"nav-box"},l=Object(n["k"])("div",{class:"icon i1"},null,-1),u=Object(n["k"])("p",null,"找答案",-1),d={class:"item"},b=Object(n["k"])("div",{class:"icon i2"},null,-1),j=Object(n["k"])("p",null,"找农资",-1),O=[b,j],p=Object(n["k"])("div",{class:"icon i3"},null,-1),f=Object(n["k"])("p",null,"找专家",-1),m=Object(n["k"])("div",{class:"icon i4"},null,-1),v=Object(n["k"])("p",null,"找基地",-1),h=Object(n["k"])("div",{class:"icon i5"},null,-1),k=Object(n["k"])("p",null,"看直播",-1),g={class:"hospital-box"},x={class:"title"},w=Object(n["k"])("div",{class:"h1-title"},"推荐医院",-1),y=Object(n["k"])("div",{class:"small-title"},"加入新型庄稼医院，免费享受会员服务",-1),T=Object(n["k"])("div",{class:"icon"},null,-1),A={class:"h-ul"},_=Object(n["m"])("加载中..."),H=Object(n["k"])("img",{src:s.a,alt:""},null,-1),I=[H],S={class:"hospital-box"},C={class:"title"},P=Object(n["k"])("div",{class:"h1-title"},"推荐专家",-1),B={class:"small-title"},$=Object(n["m"])("加载中..."),E={class:"e-ul"},M={class:"online-box"},R={class:"title"},D=Object(n["m"])(" 网诊 "),z={class:"o-ul"},N=Object(n["m"])("加载中...");function Z(t,e,i,c,s,b){var j=Object(n["P"])("Header"),H=Object(n["P"])("van-image"),Z=Object(n["P"])("van-swipe-item"),G=Object(n["P"])("van-swipe"),L=Object(n["P"])("router-link"),F=Object(n["P"])("RecommendHospital"),X=Object(n["P"])("van-loading"),q=Object(n["P"])("RecommendExpert"),K=Object(n["P"])("OnlineItem"),V=Object(n["P"])("Foot");return Object(n["H"])(),Object(n["j"])("div",o,[Object(n["n"])(j),Object(n["k"])("div",r,[s.life?(Object(n["H"])(),Object(n["h"])(G,{key:0,autoplay:3e3,style:Object(n["z"])({height:s.h}),ref:"swiperRef"},{default:Object(n["Z"])((function(){return[(Object(n["H"])(!0),Object(n["j"])(n["b"],null,Object(n["N"])(c.swiperArr,(function(t){return Object(n["H"])(),Object(n["h"])(Z,{key:t.id,fit:"cover",onClick:function(e){return b.goToMessageDetail(t)}},{default:Object(n["Z"])((function(){return[Object(n["n"])(H,{fit:"cover",src:t.logo,"lazy-load":""},null,8,["src"])]})),_:2},1032,["onClick"])})),128))]})),_:1},8,["style"])):Object(n["i"])("",!0)],512),Object(n["k"])("div",a,[Object(n["n"])(L,{to:"/index_online",class:"item"},{default:Object(n["Z"])((function(){return[l,u]})),_:1}),Object(n["k"])("div",d,[Object(n["k"])("div",{onClick:e[0]||(e[0]=function(){return c.lookForStore&&c.lookForStore.apply(c,arguments)}),style:{display:"block",color:"#000"}},O)]),Object(n["n"])(L,{to:"/look_expert",class:"item"},{default:Object(n["Z"])((function(){return[p,f]})),_:1}),Object(n["n"])(L,{to:"/whole_base_list",class:"item"},{default:Object(n["Z"])((function(){return[m,v]})),_:1}),Object(n["n"])(L,{to:"/live?from=index",class:"item"},{default:Object(n["Z"])((function(){return[h,k]})),_:1}),Object(n["i"])("",!0),Object(n["i"])("",!0)]),Object(n["k"])("div",g,[Object(n["k"])("div",x,[w,y,Object(n["k"])("div",{class:"look-bar",onClick:e[1]||(e[1]=function(){return b.lookMoreHospital&&b.lookMoreHospital.apply(b,arguments)})},"找医院 >"),Object(n["k"])("div",{class:"nowAddress",onClick:e[2]||(e[2]=function(){return b.goToArea&&b.goToArea.apply(b,arguments)})},[Object(n["k"])("div",null,Object(n["T"])(t.viewAddress),1),T])]),Object(n["k"])("ul",A,[(Object(n["H"])(!0),Object(n["j"])(n["b"],null,Object(n["N"])(s.hospitalArr,(function(t){return Object(n["H"])(),Object(n["j"])("li",{key:t.id},[Object(n["n"])(F,{list:t},null,8,["list"])])})),128)),s.hospitalArr?Object(n["i"])("",!0):(Object(n["H"])(),Object(n["h"])(X,{key:0,size:"24px",class:"loading"},{default:Object(n["Z"])((function(){return[_]})),_:1}))])]),Object(n["k"])("div",{class:"vip-box",onClick:e[3]||(e[3]=function(){return b.goToVip&&b.goToVip.apply(b,arguments)})},I),Object(n["k"])("div",S,[Object(n["k"])("div",C,[P,Object(n["k"])("div",B,Object(n["T"])(t.viewSecondAddress)+"优秀专家，精准答疑解惑 ",1),Object(n["k"])("div",{class:"look-bar",onClick:e[4]||(e[4]=function(){return b.goToExpert&&b.goToExpert.apply(b,arguments)})},"找专家 >")]),s.expertArr?Object(n["i"])("",!0):(Object(n["H"])(),Object(n["h"])(X,{key:0,size:"24px",class:"loading"},{default:Object(n["Z"])((function(){return[$]})),_:1})),Object(n["k"])("ul",E,[(Object(n["H"])(!0),Object(n["j"])(n["b"],null,Object(n["N"])(s.expertArr,(function(t){return Object(n["H"])(),Object(n["j"])("li",{key:t.id},[Object(n["n"])(q,{list:t},null,8,["list"])])})),128))])]),Object(n["k"])("div",M,[Object(n["k"])("div",R,[D,Object(n["k"])("div",{class:"look-bar",onClick:e[5]||(e[5]=function(){return b.goToAnswer&&b.goToAnswer.apply(b,arguments)})},"找答案 >")]),Object(n["k"])("ul",z,[(Object(n["H"])(!0),Object(n["j"])(n["b"],null,Object(n["N"])(s.onlineArr,(function(t){return Object(n["H"])(),Object(n["j"])("li",{key:t.id,ref:"li"},[Object(n["n"])(K,{list:t,onPreImage:b.preverImg},null,8,["list","onPreImage"])],512)})),128)),s.onlineArr?Object(n["i"])("",!0):(Object(n["H"])(),Object(n["h"])(X,{key:0,size:"24px",class:"loading"},{default:Object(n["Z"])((function(){return[N]})),_:1}))]),Object(n["k"])("div",{class:"look-bar2",onClick:e[6]||(e[6]=function(){return b.goToAnswer&&b.goToAnswer.apply(b,arguments)})},"更多网诊 >")]),Object(n["n"])(V)],512)}Object(n["I"])();var G=i("5530"),L=i("1da1"),F=(i("96cf"),i("f392")),X=i("78d1"),q=i("8a30"),K=i("2e9c"),V=i("6751"),J=i("ba6a");function W(){return Object(J["b"])("/Mobile/Index/getAdlist")}var Q=i("482f"),U=i("5502"),Y=i("f536"),tt=i("1e94"),et={setup:function(){var t=Object(Y["a"])("http://yth.mvip.114nz.com/"),e=t.lookForStore,i=Object(n["M"])([]);function c(){return s.apply(this,arguments)}function s(){return s=Object(L["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,W();case 2:e=t.sent,i.value=e;case 4:case"end":return t.stop()}}),t)}))),s.apply(this,arguments)}return Object(n["E"])((function(){c()})),{lookForStore:e,adlist:c,swiperArr:i}},name:"index",components:{Header:F["a"],RecommendHospital:X["a"],OnlineItem:q["a"],Foot:V["a"],RecommendExpert:K["a"]},props:{},data:function(){return{hospitalArr:"",expertArr:"",onlineArr:"",scrollInit:!1,h:0,life:!0}},created:function(){},computed:Object(G["a"])(Object(G["a"])({},Object(U["e"])(["initMid","uId","axiosAddress","userInfo"])),Object(U["c"])(["viewAddress","viewSecondAddress"])),watch:{uId:function(){this.indexDataAxios()},axiosAddress:function(){this.indexDataAxios()}},mounted:function(){var t=this;return Object(L["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:document.title="益农宝·为农服务平台",t.getIndexData(),t.initSwiperHeight(),window.addEventListener("resize",t.initSwiperHeight);case 4:case"end":return e.stop()}}),e)})))()},updated:function(){document.title="益农宝·为农服务平台"},activated:function(){this.life=!0},deactivated:function(){this.life=!1,window.removeEventListener("resize",this.initSwiperHeight)},unmounted:function(){window.removeEventListener("resize",this.initSwiperHeight)},methods:Object(G["a"])(Object(G["a"])({},Object(U["d"])(["setMid","setLatelyAddressArray"])),{},{initSwiperHeight:function(){var t=this.$refs.swiper.offsetWidth;if(t>=640&&(t=640),this.h=t/(750/188)+"px","0px"===this.h){var e=document.clientWidth;this.h=e/(750/188)+"px"}},getIndexData:function(){var t=this;return Object(L["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(tt["a"])();case 2:t.indexDataAxios();case 3:case"end":return e.stop()}}),e)})))()},indexDataAxios:function(){var t=this;this.$axios.fetchPost("/Mobile/Index/index",{location:this.axiosAddress,uId:this.uId}).then((function(e){0==e.data.code&&(t.setLatelyAddressArray(t.axiosAddress),t.hospitalArr=e.data.data.list_mpublic,t.expertArr=e.data.data.list_expert,t.onlineArr=e.data.data.list_wen,t.scrollInit=!0)}))},goToLive:function(){this.setMid(this.initMid),this.$router.push({path:"/live",query:{from:"index"}})},preverImg:function(t){Object(Q["a"])({images:t.arr,startPosition:t.index,closeable:!0})},goToAnswer:function(){this.$router.push({path:"/index_online"}).catch((function(t){return t}))},goToExpert:function(){this.$router.push({path:"/look_expert"}).catch((function(t){return t}))},lookMoreHospital:function(){this.$router.push({path:"/into_hospital"}).catch((function(t){return t}))},goToArea:function(){this.$router.push({path:"/area"}).catch((function(t){return t}))},goToVip:function(){this.$router.push({path:"/vip"}).catch((function(t){return t}))},goToMessageDetail:function(t){var e=this;switch(t.module){case"mp":this.setMid(t.mid),setTimeout((function(){e.$router.push({path:"/hospital"})}));break;case"webview":window.open(t.mid,"_blank");break;case"news":this.$router.push({path:"/message_detail",query:{id:t.mid,catid:t.catid}});break}}})},it=(i("0fed"),i("d959")),nt=i.n(it);const ct=nt()(et,[["render",Z],["__scopeId","data-v-d7ed7856"]]);e["default"]=ct},"78d1":function(t,e,i){"use strict";var n=i("7a23");Object(n["K"])("data-v-6f35d518");var c={class:"p1"},s={class:"p2"},o={class:"number"},r={key:0,class:"expert"},a={class:"line"},l={key:1,class:"online"},u={class:"line",style:{"margin-left":"10px"}},d={key:2,class:"online"};function b(t,e,i,b,j,O){var p=Object(n["P"])("van-image");return Object(n["H"])(),Object(n["j"])("div",{class:"recommend-hospital-wrap",onClick:e[0]||(e[0]=function(){return O.goToIndexHospital&&O.goToIndexHospital.apply(O,arguments)})},[Object(n["n"])(p,{src:i.list.logo,fit:"cover",class:"image","lazy-load":""},null,8,["src"]),Object(n["k"])("p",c,Object(n["T"])(i.list.title),1),Object(n["k"])("p",s,Object(n["T"])(i.list.level)+"·"+Object(n["T"])(i.list.issort),1),Object(n["ab"])(Object(n["k"])("p",{class:"p3"},"科室："+Object(n["T"])(i.list.zuowu),513),[[n["X"],"暂未设置"!=i.list.zuowu]]),Object(n["k"])("div",o,[0!=i.list.num_expert?(Object(n["H"])(),Object(n["j"])("div",r," 专家 "+Object(n["T"])(i.list.num_expert),1)):Object(n["i"])("",!0),Object(n["ab"])(Object(n["k"])("div",a," | ",512),[[n["X"],0!=i.list.num_expert&&0!=i.list.num_chufang]]),0!=i.list.num_chufang?(Object(n["H"])(),Object(n["j"])("div",l," 处方 "+Object(n["T"])(i.list.num_chufang),1)):Object(n["i"])("",!0),Object(n["ab"])(Object(n["k"])("div",u," | ",512),[[n["X"],0!=i.list.num_wen&&0==i.list.isstore]]),0!=i.list.num_wen&&0==i.list.isstore?(Object(n["H"])(),Object(n["j"])("div",d," 网诊 "+Object(n["T"])(i.list.num_wen),1)):Object(n["i"])("",!0)])])}Object(n["I"])();var j=i("5530"),O=i("5502"),p={name:"Recommend_hospital",components:{},props:{list:{type:Object,default:function(){return{}}}},data:function(){return{}},computed:{},watch:{},mounted:function(){},methods:Object(j["a"])(Object(j["a"])({},Object(O["d"])(["setMid","setHospitalName","setHospitalIsStore"])),{},{goToIndexHospital:function(){this.setMid(this.list.mid),this.setHospitalName(this.list.title),this.setHospitalIsStore(this.list.isstore),this.$router.push({path:"/hospital"})}})},f=(i("b6cf"),i("d959")),m=i.n(f);const v=m()(p,[["render",b],["__scopeId","data-v-6f35d518"]]);e["a"]=v},8279:function(t,e,i){},8709:function(t,e,i){},8997:function(t,e,i){"use strict";i("2343")},"8a30":function(t,e,i){"use strict";i("b0c0");var n=i("7a23");Object(n["K"])("data-v-7b5921a4");var c={class:"recommend_online-container"},s={class:"name"},o={class:"time"},r={class:"img-list"},a=["onClick"],l={class:"left"},u=Object(n["k"])("div",{class:"icon icon1"},null,-1),d={class:"content"},b={class:"right"},j=Object(n["k"])("div",{class:"icon icon2"},null,-1),O={class:"content"};function p(t,e,i,p,f,m){var v=Object(n["P"])("van-image");return Object(n["H"])(),Object(n["j"])("div",c,[Object(n["k"])("div",{class:"top",onClick:e[0]||(e[0]=function(t){return m.goToExpert(i.list.authorid)})},[Object(n["n"])(v,{round:"",class:"avator",src:i.list.avatar},null,8,["src"]),Object(n["k"])("div",s,[Object(n["m"])(Object(n["T"])(i.list.author)+" ",1),Object(n["k"])("div",o,[Object(n["m"])(Object(n["T"])(i.list.addtime)+" ",1),Object(n["ab"])(Object(n["k"])("span",null,"·",512),[[n["X"],i.list.area]]),Object(n["m"])(" "+Object(n["T"])(i.list.area),1)])])]),Object(n["i"])("",!0),Object(n["k"])("div",{class:"text",onClick:e[1]||(e[1]=function(){return m.goToDetail&&m.goToDetail.apply(m,arguments)})},Object(n["T"])(i.list.title),1),Object(n["k"])("div",r,[(Object(n["H"])(!0),Object(n["j"])(n["b"],null,Object(n["N"])(i.list.pic_urls_tiny,(function(t,e){return Object(n["H"])(),Object(n["j"])("div",{class:"item",key:t,onClick:function(t){return m.preview(i.list.pic_urls,e)}},[Object(n["n"])(v,{class:"img",fit:"cover",src:t},null,8,["src"])],8,a)})),128))]),Object(n["k"])("div",{class:"bottom",onClick:e[2]||(e[2]=function(){return m.goToDetail&&m.goToDetail.apply(m,arguments)})},[Object(n["k"])("div",l,[u,Object(n["k"])("div",d,Object(n["T"])(i.list.name),1)]),Object(n["k"])("div",b,[j,Object(n["k"])("div",O,"回复 "+Object(n["T"])(i.list.replies),1)])])])}Object(n["I"])();var f={name:"OnlineItem",components:{},props:{list:{type:Object,default:function(){return{}}}},data:function(){return{}},computed:{},watch:{},mounted:function(){},methods:{preview:function(t,e){var i={arr:t,index:e};this.$emit("preImage",i)},goToDetail:function(){this.$router.push({path:"/ask_detail",query:{tid:this.list.tid}})},goToExpert:function(t){this.$router.push({path:"/expert",query:{id:t}})}}},m=(i("b74c"),i("d959")),v=i.n(m);const h=v()(f,[["render",p],["__scopeId","data-v-7b5921a4"]]);e["a"]=h},b6cf:function(t,e,i){"use strict";i("8709")},b74c:function(t,e,i){"use strict";i("8279")},e096:function(t,e,i){"use strict";i.d(e,"c",(function(){return r})),i.d(e,"b",(function(){return a})),i.d(e,"a",(function(){return l}));i("d3b7"),i("b0c0");var n=i("3f15"),c=i.n(n),s=i("5502"),o=i("7a23");function r(){return new Promise((function(t){var e=Object(s["f"])(),i=Object(o["f"])((function(){return e.state.axiosAddress}));if(""===i.value||void 0===i.value){var n=new c.a.Geolocation;n.getCurrentPosition((function(i){if(console.log("this.getStatus()",this.getStatus()),0==this.getStatus()){var n=i.address.province+","+i.address.city+(i.address.district?","+i.address.district:"");e.commit("setAxiosAddress",n),e.commit("setGeoAddress",n),t(n)}else e.commit("setGeoAddress","定位失败"),6===this.getStatus()?t(6):t(99)}))}else t(i.value)}))}function a(){var t=Object(s["f"])();function e(){return new Promise((function(e){var i=new c.a.Geolocation;i.getCurrentPosition((function(i){if(console.log("this.getStatus()",this.getStatus()),0==this.getStatus()){var n=i.address.province+","+i.address.city+(i.address.district?","+i.address.district:"");t.commit("setGeoAddress",n),e(n)}else t.commit("setGeoAddress","定位失败"),6===this.getStatus()?e(6):e(99)}))}))}return{geolocationAgain:e}}function l(){function t(){return new Promise((function(t){var e=new c.a.Geolocation;e.getCurrentPosition((function(e){if(0==this.getStatus()){var i=e.address.province+","+e.address.city+(e.address.district?","+e.address.district:"");t(i)}else 6===this.getStatus()?t(6):t(99)}))}))}return{askGeolocationAgain:t}}},f989:function(t,e,i){}}]);
//# sourceMappingURL=index.1491308c.js.map