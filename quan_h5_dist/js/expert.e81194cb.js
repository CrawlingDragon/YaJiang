(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["expert"],{"027b":function(t,e,i){"use strict";i.r(e);i("b0c0"),i("a15b");var a=i("7a23");Object(a["K"])("data-v-ecac924e");var n={class:"expert-container"},c={class:"person-box"},s={class:"name-bar"},o={class:"name"},r={key:0},l={class:"avatar-box"},d={class:"avatar-p1"},u={class:"crop-lis"},b=Object(a["k"])("div",{class:"left"},"种植作物",-1),j={class:"crop"},O={class:"p1"},p={class:"btns"},f=Object(a["m"])("提问 "),h={class:"fans"},m={class:"item"},k={class:"item"},g={key:0,class:"person-info"},v=Object(a["m"])(" 个人简介 "),x=Object(a["k"])("div",{class:"look-more"},"详细资料 >",-1),y=[v,x],T={key:0,class:"goodat"},D={key:1,class:"explan"},H={key:1,class:"answer-ul"},I={key:1,class:"answer-ul"},w={key:1,class:"hospital-ul"};function L(t,e,i,v,x,L){var _=Object(a["P"])("Header"),P=Object(a["P"])("van-image"),$=Object(a["P"])("van-overlay"),E=Object(a["P"])("van-icon"),C=Object(a["P"])("van-empty"),M=Object(a["P"])("OnlineItem"),q=Object(a["P"])("van-list"),A=Object(a["P"])("van-tab"),Z=Object(a["P"])("RecommendHospital"),S=Object(a["P"])("van-tabs");return Object(a["H"])(),Object(a["j"])("div",n,[Object(a["n"])(_,{indexHeader:!1}),Object(a["k"])("div",c,[Object(a["k"])("div",s,[Object(a["n"])(P,{class:"avator",src:x.expertData.avatar},null,8,["src"]),Object(a["k"])("div",o,[Object(a["m"])(Object(a["T"])(x.expertData.name),1),1==x.identity&&x.id!=t.aiExpertId?(Object(a["H"])(),Object(a["j"])("span",r,Object(a["T"])(x.expertData.groupname),1)):Object(a["i"])("",!0)]),0==x.identity?(Object(a["H"])(),Object(a["j"])("div",{key:0,onClick:e[0]||(e[0]=function(){return L.goToCrop&&L.goToCrop.apply(L,arguments)}),class:"name-bar-crop"},Object(a["T"])(x.expertData.forum),1)):Object(a["i"])("",!0),Object(a["n"])($,{show:x.skillShow,onClick:e[3]||(e[3]=function(t){return x.skillShow=!1})},{default:Object(a["Z"])((function(){return[Object(a["k"])("div",{class:"wrapper",onClick:[e[1]||(e[1]=Object(a["bb"])((function(){}),["stop"])),e[2]||(e[2]=function(t){return x.skillShow=!1})]},[Object(a["k"])("div",l,[Object(a["n"])(P,{src:x.expertData.avatar,fit:"cover",radius:"5px"},null,8,["src"]),Object(a["k"])("p",d,Object(a["T"])(x.expertData.name),1)]),Object(a["k"])("div",u,[b,Object(a["k"])("div",j,Object(a["T"])(1==x.identity?x.expertData.skill:x.expertData.forum),1)])])]})),_:1},8,["show"]),Object(a["k"])("div",O,Object(a["T"])(x.expertData.company)+" "+Object(a["T"])(x.expertData.position),1)]),Object(a["k"])("div",p,["my"!=t.$route.query.from&&0==x.expertData.isme?(Object(a["H"])(),Object(a["j"])("div",{key:0,class:"btn-look",onClick:e[4]||(e[4]=function(){return L.attention&&L.attention.apply(L,arguments)})},[0==x.status?(Object(a["H"])(),Object(a["h"])(E,{key:0,name:"plus",class:"plus"})):Object(a["i"])("",!0),Object(a["m"])(Object(a["T"])(1==x.status?"已关注":"关注"),1)])):Object(a["i"])("",!0),1==x.expertData.identity&&"my"!=t.$route.query.from&&x.id!=t.aiExpertId&&1!=x.expertData.isme?(Object(a["H"])(),Object(a["j"])("div",{key:1,class:"btn-ask",onClick:e[5]||(e[5]=function(){return L.goToAsk&&L.goToAsk.apply(L,arguments)})},[Object(a["n"])(E,{name:"records",class:"records"}),f])):Object(a["i"])("",!0),"my"==t.$route.query.from||1==x.expertData.isme?(Object(a["H"])(),Object(a["j"])("div",{key:2,class:"edit",onClick:e[6]||(e[6]=function(){return L.goToMeEdit&&L.goToMeEdit.apply(L,arguments)})}," 编辑资料 ")):Object(a["i"])("",!0)]),Object(a["k"])("div",h,[Object(a["k"])("div",m,"关注 "+Object(a["T"])(x.expertData.tofollower),1),Object(a["k"])("div",k,"粉丝 "+Object(a["T"])(x.expertData.follower),1)])]),1!=x.expertData.identity||""==x.expertData.skill&&""==x.expertData.introduce?Object(a["i"])("",!0):(Object(a["H"])(),Object(a["j"])("div",g,[Object(a["k"])("div",{class:"title-bar",onClick:e[7]||(e[7]=function(){return L.goToPersondetail&&L.goToPersondetail.apply(L,arguments)})},y),x.expertData.skill?(Object(a["H"])(),Object(a["j"])("p",T,"擅长："+Object(a["T"])(x.expertData.skill),1)):Object(a["i"])("",!0),x.expertData.introduce?(Object(a["H"])(),Object(a["j"])("p",D,Object(a["T"])(x.expertData.introduce),1)):Object(a["i"])("",!0)])),Object(a["n"])(S,{modelValue:x.active,"onUpdate:modelValue":e[11]||(e[11]=function(t){return x.active=t}),sticky:"",class:Object(a["y"])(["tabs",{aiTab:x.id==t.aiExpertId}]),color:"#599524","offset-top":x.num,onScroll:L.scroll},{default:Object(a["Z"])((function(){return[Object(a["n"])(A,null,{title:Object(a["Z"])((function(){return[Object(a["m"])(" 解答 "+Object(a["T"])(x.expertData.posts),1)]})),default:Object(a["Z"])((function(){return[x.noData?(Object(a["H"])(),Object(a["h"])(C,{key:0,description:"暂无解答"})):(Object(a["H"])(),Object(a["j"])("ul",H,[Object(a["n"])(q,{loading:x.loading,"onUpdate:loading":e[8]||(e[8]=function(t){return x.loading=t}),finished:x.finished,"finished-text":"没有更多了",onLoad:L.onLoad,"immediate-check":!1},{default:Object(a["Z"])((function(){return[(Object(a["H"])(!0),Object(a["j"])(a["b"],null,Object(a["N"])(x.askedList,(function(t){return Object(a["H"])(),Object(a["j"])("li",{key:t.id},[Object(a["n"])(M,{list:t,onPreImage:L.preverImg},null,8,["list","onPreImage"])])})),128))]})),_:1},8,["loading","finished","onLoad"])]))]})),_:1}),x.id!=t.aiExpertId?(Object(a["H"])(),Object(a["h"])(A,{key:0,sticky:""},{title:Object(a["Z"])((function(){return[Object(a["m"])(" 提问 "+Object(a["T"])(x.expertData.threads),1)]})),default:Object(a["Z"])((function(){return[x.noData2?(Object(a["H"])(),Object(a["h"])(C,{key:0,description:"暂无提问"})):Object(a["ab"])((Object(a["H"])(),Object(a["j"])("ul",I,[Object(a["n"])(q,{loading:x.loading2,"onUpdate:loading":e[9]||(e[9]=function(t){return x.loading2=t}),finished:x.finished2,"finished-text":"没有更多了",onLoad:L.onLoad2,"immediate-check":!1},{default:Object(a["Z"])((function(){return[(Object(a["H"])(!0),Object(a["j"])(a["b"],null,Object(a["N"])(x.askMeList,(function(t){return Object(a["H"])(),Object(a["j"])("li",{key:t.id},[Object(a["n"])(M,{list:t,onPreImage:L.preverImg},null,8,["list","onPreImage"])])})),128))]})),_:1},8,["loading","finished","onLoad"])],512)),[[a["X"],x.id!=t.aiExpertId]])]})),_:1})):Object(a["i"])("",!0),x.id!=t.aiExpertId?(Object(a["H"])(),Object(a["h"])(A,{key:1,sticky:""},{title:Object(a["Z"])((function(){return[Object(a["m"])(" 加入的医院 "+Object(a["T"])(x.expertData.join),1)]})),default:Object(a["Z"])((function(){return[x.noData3?(Object(a["H"])(),Object(a["h"])(C,{key:0,description:"暂未加入医院"})):Object(a["ab"])((Object(a["H"])(),Object(a["j"])("ul",w,[Object(a["n"])(q,{loading:x.loading3,"onUpdate:loading":e[10]||(e[10]=function(t){return x.loading3=t}),finished:x.finished3,onLoad:L.onLoad3,"immediate-check":!1},{default:Object(a["Z"])((function(){return[(Object(a["H"])(!0),Object(a["j"])(a["b"],null,Object(a["N"])(x.hospitalList,(function(t){return Object(a["H"])(),Object(a["j"])("li",{key:t.id},[Object(a["n"])(Z,{list:t},null,8,["list"])])})),128))]})),_:1},8,["loading","finished","onLoad"])],512)),[[a["X"],x.id!=t.aiExpertId]])]})),_:1})):Object(a["i"])("",!0)]})),_:1},8,["modelValue","offset-top","class","onScroll"])])}Object(a["I"])();var _=i("5530"),P=(i("99af"),i("f392")),$=i("8a30"),E=i("78d1"),C=i("482f"),M=i("5502"),q=i("213a"),A=0,Z={setup:function(){Object(q["c"])({title:"专家"})},name:"expert",components:{Header:P["a"],OnlineItem:$["a"],RecommendHospital:E["a"]},props:{},data:function(){return{active:0,id:this.$route.query.id,from:this.$route.query.from,identity:0,expertid:"",expertData:"",askedList:[],askMeList:[],hospitalList:[],status:"",loading:!0,finished:!1,page:0,noData:!1,loading2:!1,finished2:!1,page2:0,noData2:!1,loading3:!1,finished3:!1,page3:0,noData3:!1,skillShow:!1,scollType:"",num:0}},computed:Object(_["a"])({},Object(M["e"])(["uId","aiExpertId"])),created:function(){},watch:{$route:function(t){this.from=this.$route.query.from,this.id=t.query.id,this.page=0,this.page2=0,this.page3=0,this.askedList=[],this.askMeList=[],this.hospitalList=[],this.getExpertData(this.id)},scollType:function(t){this.num="down"==t?0:40}},mounted:function(){window.addEventListener("scroll",this.scrollHandler),this.getExpertData(this.id)},unmounted:function(){window.removeEventListener("scroll",this.scrollHandler)},methods:{scroll:function(){},onLoad:function(){this.getIAsked()},onLoad2:function(){this.getAskMe()},onLoad3:function(){this.getHospitalList()},getExpertData:function(t){var e=this;this.$axios.fetchPost("Mobile/user/homepage",{from:this.from,id:"ai"===this.from?this.aiExpertId:t,uId:this.uId}).then((function(t){0==t.data.code&&(e.identity=t.data.data.identity,e.expertData=t.data.data,e.status=t.data.data.status,e.expertid=t.data.data.uid,document.title=e.expertData.name,setTimeout((function(){e.getIAsked(),e.getAskMe(),e.getHospitalList()}),100))}))},getIAsked:function(){var t=this;this.page+=1,this.noData=!1,this.$axios.fetchPost("/Mobile/user/getWenList",{uId:this.expertid,page:this.page,pagesize:12,action:"answer"}).then((function(e){0==e.data.code?(t.loading=!1,t.askedList=t.askedList.concat(e.data.data)):201==e.data.code&&(1==t.page&&(t.noData=!0),t.loading=!1,t.finished=!0)}))},getAskMe:function(){var t=this;this.page2+=1,this.noData2=!1,this.$axios.fetchPost("/Mobile/user/getWenList",{uId:this.expertid,page:this.page2,pagesize:12,action:"ask"}).then((function(e){0==e.data.code?(t.loading2=!1,t.askMeList=e.data.data):201==e.data.code&&(1==t.page2&&(t.noData2=!0),t.finished2=!1,t.finished2=!0)}))},getHospitalList:function(){var t=this;this.page3+=1,this.noData3=!1,this.$axios.fetchPost("/Mobile/user/myJoinHospital",{uId:this.expertid,page:this.page3}).then((function(e){0==e.data.code?(t.hospitalList=e.data.data.list,t.loading3=!1):201==e.data.code&&(1==t.page3&&(t.noData3=!0),t.loading3=!1,t.finished3=!0)}))},preverImg:function(t){Object(C["a"])({images:t.arr,startPosition:t.index,closeable:!0})},goToAsk:function(){this.$router.push({path:"/ask",query:{expert:this.expertData.name,expertId:this.expertData.id}})},goToMeEdit:function(){this.$router.push({path:"/me_edit"})},goToPersondetail:function(){this.$router.push({path:"expert_detail",query:{id:this.expertData.id,uid:this.uId}})},attention:function(){var t=this,e=this.status;if(1==e)this.$axios.fetchPost("/Mobile/User/addOrCancelAttention",{uId:this.uId,followId:this.expertData.id,action:"cancel"}).then((function(e){0==e.data.code&&(t.status=0)}));else{if(!this.uId)return void this.$router.push({path:"/login"});this.$axios.fetchPost("/Mobile/User/addOrCancelAttention",{uId:this.uId,followId:this.expertData.id,action:"add"}).then((function(e){0==e.data.code&&(t.status=1)}))}},goToCrop:function(){this.skillShow=!0},scrollHandler:function(){var t=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,e=t-A;if(0==e)return!1;this.scollType=e>0?"down":"up",A=t}}},S=(i("c344"),i("d959")),N=i.n(S);const U=N()(Z,[["render",L],["__scopeId","data-v-ecac924e"]]);e["default"]=U},"78d1":function(t,e,i){"use strict";var a=i("7a23");Object(a["K"])("data-v-6f35d518");var n={class:"p1"},c={class:"p2"},s={class:"number"},o={key:0,class:"expert"},r={class:"line"},l={key:1,class:"online"},d={class:"line",style:{"margin-left":"10px"}},u={key:2,class:"online"};function b(t,e,i,b,j,O){var p=Object(a["P"])("van-image");return Object(a["H"])(),Object(a["j"])("div",{class:"recommend-hospital-wrap",onClick:e[0]||(e[0]=function(){return O.goToIndexHospital&&O.goToIndexHospital.apply(O,arguments)})},[Object(a["n"])(p,{src:i.list.logo,fit:"cover",class:"image","lazy-load":""},null,8,["src"]),Object(a["k"])("p",n,Object(a["T"])(i.list.title),1),Object(a["k"])("p",c,Object(a["T"])(i.list.level)+"·"+Object(a["T"])(i.list.issort),1),Object(a["ab"])(Object(a["k"])("p",{class:"p3"},"科室："+Object(a["T"])(i.list.zuowu),513),[[a["X"],"暂未设置"!=i.list.zuowu]]),Object(a["k"])("div",s,[0!=i.list.num_expert?(Object(a["H"])(),Object(a["j"])("div",o," 专家 "+Object(a["T"])(i.list.num_expert),1)):Object(a["i"])("",!0),Object(a["ab"])(Object(a["k"])("div",r," | ",512),[[a["X"],0!=i.list.num_expert&&0!=i.list.num_chufang]]),0!=i.list.num_chufang?(Object(a["H"])(),Object(a["j"])("div",l," 处方 "+Object(a["T"])(i.list.num_chufang),1)):Object(a["i"])("",!0),Object(a["ab"])(Object(a["k"])("div",d," | ",512),[[a["X"],0!=i.list.num_wen&&0==i.list.isstore]]),0!=i.list.num_wen&&0==i.list.isstore?(Object(a["H"])(),Object(a["j"])("div",u," 网诊 "+Object(a["T"])(i.list.num_wen),1)):Object(a["i"])("",!0)])])}Object(a["I"])();var j=i("5530"),O=i("5502"),p={name:"Recommend_hospital",components:{},props:{list:{type:Object,default:function(){return{}}}},data:function(){return{}},computed:{},watch:{},mounted:function(){},methods:Object(j["a"])(Object(j["a"])({},Object(O["d"])(["setMid","setHospitalName","setHospitalIsStore"])),{},{goToIndexHospital:function(){this.setMid(this.list.mid),this.setHospitalName(this.list.title),this.setHospitalIsStore(this.list.isstore),this.$router.push({path:"/hospital"})}})},f=(i("b6cf"),i("d959")),h=i.n(f);const m=h()(p,[["render",b],["__scopeId","data-v-6f35d518"]]);e["a"]=m},8279:function(t,e,i){},8709:function(t,e,i){},"8a30":function(t,e,i){"use strict";i("b0c0");var a=i("7a23");Object(a["K"])("data-v-7b5921a4");var n={class:"recommend_online-container"},c={class:"name"},s={class:"time"},o={class:"img-list"},r=["onClick"],l={class:"left"},d=Object(a["k"])("div",{class:"icon icon1"},null,-1),u={class:"content"},b={class:"right"},j=Object(a["k"])("div",{class:"icon icon2"},null,-1),O={class:"content"};function p(t,e,i,p,f,h){var m=Object(a["P"])("van-image");return Object(a["H"])(),Object(a["j"])("div",n,[Object(a["k"])("div",{class:"top",onClick:e[0]||(e[0]=function(t){return h.goToExpert(i.list.authorid)})},[Object(a["n"])(m,{round:"",class:"avator",src:i.list.avatar},null,8,["src"]),Object(a["k"])("div",c,[Object(a["m"])(Object(a["T"])(i.list.author)+" ",1),Object(a["k"])("div",s,[Object(a["m"])(Object(a["T"])(i.list.addtime)+" ",1),Object(a["ab"])(Object(a["k"])("span",null,"·",512),[[a["X"],i.list.area]]),Object(a["m"])(" "+Object(a["T"])(i.list.area),1)])])]),Object(a["i"])("",!0),Object(a["k"])("div",{class:"text",onClick:e[1]||(e[1]=function(){return h.goToDetail&&h.goToDetail.apply(h,arguments)})},Object(a["T"])(i.list.title),1),Object(a["k"])("div",o,[(Object(a["H"])(!0),Object(a["j"])(a["b"],null,Object(a["N"])(i.list.pic_urls_tiny,(function(t,e){return Object(a["H"])(),Object(a["j"])("div",{class:"item",key:t,onClick:function(t){return h.preview(i.list.pic_urls,e)}},[Object(a["n"])(m,{class:"img",fit:"cover",src:t},null,8,["src"])],8,r)})),128))]),Object(a["k"])("div",{class:"bottom",onClick:e[2]||(e[2]=function(){return h.goToDetail&&h.goToDetail.apply(h,arguments)})},[Object(a["k"])("div",l,[d,Object(a["k"])("div",u,Object(a["T"])(i.list.name),1)]),Object(a["k"])("div",b,[j,Object(a["k"])("div",O,"回复 "+Object(a["T"])(i.list.replies),1)])])])}Object(a["I"])();var f={name:"OnlineItem",components:{},props:{list:{type:Object,default:function(){return{}}}},data:function(){return{}},computed:{},watch:{},mounted:function(){},methods:{preview:function(t,e){var i={arr:t,index:e};this.$emit("preImage",i)},goToDetail:function(){this.$router.push({path:"/ask_detail",query:{tid:this.list.tid}})},goToExpert:function(t){this.$router.push({path:"/expert",query:{id:t}})}}},h=(i("b74c"),i("d959")),m=i.n(h);const k=m()(f,[["render",p],["__scopeId","data-v-7b5921a4"]]);e["a"]=k},"8f31":function(t,e,i){},b6cf:function(t,e,i){"use strict";i("8709")},b74c:function(t,e,i){"use strict";i("8279")},c344:function(t,e,i){"use strict";i("8f31")}}]);
//# sourceMappingURL=expert.e81194cb.js.map