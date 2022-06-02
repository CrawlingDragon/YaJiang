var q=Object.defineProperty;var L=Object.getOwnPropertySymbols;var O=Object.prototype.hasOwnProperty,V=Object.prototype.propertyIsEnumerable;var w=(s,t,h)=>t in s?q(s,t,{enumerable:!0,configurable:!0,writable:!0,value:h}):s[t]=h,b=(s,t)=>{for(var h in t||(t={}))O.call(t,h)&&w(s,h,t[h]);if(L)for(var h of L(t))V.call(t,h)&&w(s,h,t[h]);return s};import{H as B}from"./header.d5316539.js";import{O as U}from"./online_item.56032ee1.js";import{R as z}from"./recommend_hospital.27e1d6f2.js";import{m as F,I as N,O as R,c as u,e as a,h as n,j as d,k as l,z as c,t as r,v as p,g as f,f as m,l as j,B as W,F as x,i as k,C as S,D as T,x as J,y as Y}from"./index.3518e5b0.js";import{u as G}from"./useTitles.54f46820.js";import{_ as K}from"./plugin-vue_export-helper.21dcd24c.js";import"./fast_nav.40db65c6.js";var E=0;const Q={setup(){G("\u4E13\u5BB6")},name:"expert",components:{Header:B,OnlineItem:U,RecommendHospital:z},props:{},data(){return{active:0,identity:0,expertid:"",expertData:"",askedList:[],askMeList:[],hospitalList:[],status:"",loading:!0,finished:!1,page:0,noData:!1,loading2:!1,finished2:!1,page2:0,noData2:!1,loading3:!1,finished3:!1,page3:0,noData3:!1,skillShow:!1,scollType:"",num:0,isSelf:0}},computed:b({id(){return this.$route.query.id},from(){return this.$route.query.from}},F(["uId","aiExpertId"])),created(){},watch:{"$route.query.id"(){this.page=0,this.page2=0,this.page3=0,this.askedList=[],this.askMeList=[],this.hospitalList=[],this.getExpertData(this.id)},scollType(s){s=="down"?this.num=0:this.num=40}},mounted(){window.addEventListener("scroll",this.scrollHandler),this.getExpertData(this.id)},unmounted(){window.removeEventListener("scroll",this.scrollHandler)},methods:{scroll(){},onLoad(){this.getIAsked()},onLoad2(){this.getAskMe()},onLoad3(){this.getHospitalList()},getExpertData(s){this.$axios.fetchPost("Mobile/user/homepage",{from:this.from,id:this.from==="ai"?this.aiExpertId:this.from==="my"?this.uId:s,uId:this.uId}).then(t=>{t.data.code==0&&(this.identity=t.data.data.identity,this.expertData=t.data.data,this.status=t.data.data.status,this.expertid=t.data.data.uid,document.title=this.expertData.name,this.isSelf=t.data.data.isme,setTimeout(()=>{this.getIAsked(),this.getAskMe(),this.getHospitalList()},100))})},getIAsked(){this.page+=1,this.noData=!1,this.$axios.fetchPost("/Mobile/user/getWenList",{uId:this.isSelf===1?this.uId:this.expertid,isuser:this.isSelf,page:this.page,pagesize:12,action:"answer"}).then(s=>{s.data.code==0?(this.loading=!1,this.askedList=this.askedList.concat(s.data.data)):s.data.code==201&&(this.page==1&&(this.noData=!0),this.loading=!1,this.finished=!0)})},getAskMe(){this.page2+=1,this.noData2=!1,this.$axios.fetchPost("/Mobile/user/getWenList",{uId:this.isSelf===1?this.uId:this.expertid,isuser:this.isSelf,page:this.page2,pagesize:12,action:"ask"}).then(s=>{s.data.code==0?(this.loading2=!1,this.askMeList=s.data.data):s.data.code==201&&(this.page2==1&&(this.noData2=!0),this.finished2=!1,this.finished2=!0)})},getHospitalList(){this.page3+=1,this.noData3=!1,this.$axios.fetchPost("/Mobile/user/myJoinHospital",{uId:this.isSelf===1?this.uId:this.expertid,isuser:this.isSelf,page:this.page3}).then(s=>{s.data.code==0?(this.hospitalList=s.data.data.list,this.loading3=!1):s.data.code==201&&(this.page3==1&&(this.noData3=!0),this.loading3=!1,this.finished3=!0)})},preverImg(s){N({images:s.arr,startPosition:s.index,closeable:!0})},goToAsk(){this.$router.push({path:"/ask",query:{expert:this.expertData.name,expertId:this.expertData.id}})},goToMeEdit(){this.$router.push({path:"/me_edit"})},goToPersondetail(){this.$router.push({path:"expert_detail",query:{id:this.expertData.id,uid:this.uId}})},attention(){if(this.status==1)this.$axios.fetchPost("/Mobile/User/addOrCancelAttention",{uId:this.uId,followId:this.expertData.id,action:"cancel"}).then(t=>{t.data.code==0&&(this.status=0)});else{if(!this.uId){R();return}this.$axios.fetchPost("/Mobile/User/addOrCancelAttention",{uId:this.uId,followId:this.expertData.id,action:"add"}).then(t=>{t.data.code==0&&(this.status=1)})}},goToCrop(){this.skillShow=!0},scrollHandler(){var s=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,t=s-E;if(t==0)return!1;this.scollType=t>0?"down":"up",E=s}}},H=s=>(J("data-v-ef45d2f6"),s=s(),Y(),s),X={class:"expert-container"},Z={class:"person-box"},$={class:"name-bar"},ee={class:"name f30"},te={key:0,class:"f16"},se={class:"avatar-box"},ie={class:"avatar-p1 f16"},ae={class:"crop-lis"},oe=H(()=>l("div",{class:"left f16"},"\u79CD\u690D\u4F5C\u7269",-1)),ne={class:"crop f16"},le={class:"p1 f16"},re={class:"btns"},de=c("\u63D0\u95EE "),pe={class:"fans"},he={class:"item f17"},fe={class:"item f17"},ue={key:0,class:"person-info"},ce=c(" \u4E2A\u4EBA\u7B80\u4ECB "),me=H(()=>l("div",{class:"look-more"},"\u8BE6\u7EC6\u8D44\u6599 >",-1)),ge=[ce,me],_e={key:0,class:"goodat f20"},ve={key:1,class:"explan f16"},xe={key:1,class:"answer-ul"},ke={key:1,class:"answer-ul"},ye={key:1,class:"hospital-ul"};function De(s,t,h,Ie,e,o){const C=u("Header"),y=u("van-image"),M=u("van-overlay"),D=u("van-icon"),g=u("van-empty"),I=u("OnlineItem"),_=u("van-list"),v=u("van-tab"),P=u("RecommendHospital"),A=u("van-tabs");return a(),n("div",X,[d(C,{indexHeader:!1}),l("div",Z,[l("div",$,[d(y,{class:"avator",src:e.expertData.avatar},null,8,["src"]),l("div",ee,[c(r(e.expertData.name)+" ",1),e.identity==1&&o.id!=s.aiExpertId?(a(),n("span",te,r(e.expertData.groupname),1)):p("v-if",!0)]),e.identity==0?(a(),n("div",{key:0,onClick:t[0]||(t[0]=(...i)=>o.goToCrop&&o.goToCrop(...i)),class:"name-bar-crop f16"},r(e.expertData.forum),1)):p("v-if",!0),d(M,{show:e.skillShow,onClick:t[3]||(t[3]=i=>e.skillShow=!1)},{default:f(()=>[l("div",{class:"wrapper",onClick:[t[1]||(t[1]=W(()=>{},["stop"])),t[2]||(t[2]=i=>e.skillShow=!1)]},[l("div",se,[d(y,{src:e.expertData.avatar,fit:"cover",radius:"5px"},null,8,["src"]),l("p",ie,r(e.expertData.name),1)]),l("div",ae,[oe,l("div",ne,r(e.identity==1?e.expertData.skill:e.expertData.forum),1)])])]),_:1},8,["show"]),l("div",le,r(e.expertData.company)+" "+r(e.expertData.position),1)]),l("div",re,[s.$route.query.from!="my"&&e.expertData.isme==0?(a(),n("div",{key:0,class:"btn-look f17",onClick:t[4]||(t[4]=(...i)=>o.attention&&o.attention(...i))},[e.status==0?(a(),m(D,{key:0,name:"plus",class:"plus"})):p("v-if",!0),c(r(e.status==1?"\u5DF2\u5173\u6CE8":"\u5173\u6CE8"),1)])):p("v-if",!0),e.expertData.identity==1&&s.$route.query.from!="my"&&o.id!=s.aiExpertId&&e.expertData.isme!=1?(a(),n("div",{key:1,class:"btn-ask f17",onClick:t[5]||(t[5]=(...i)=>o.goToAsk&&o.goToAsk(...i))},[d(D,{name:"records",class:"records"}),de])):p("v-if",!0),s.$route.query.from=="my"||e.expertData.isme==1?(a(),n("div",{key:2,class:"edit f17",onClick:t[6]||(t[6]=(...i)=>o.goToMeEdit&&o.goToMeEdit(...i))}," \u7F16\u8F91\u8D44\u6599 ")):p("v-if",!0)]),l("div",pe,[p(' <div class="item f17">\u8D5E {{ expertData.digzan }}</div> '),l("div",he,"\u5173\u6CE8 "+r(e.expertData.tofollower),1),l("div",fe,"\u7C89\u4E1D "+r(e.expertData.follower),1)])]),e.expertData.identity==1&&(e.expertData.skill!=""||e.expertData.introduce!="")?(a(),n("div",ue,[l("div",{class:"title-bar f17",onClick:t[7]||(t[7]=(...i)=>o.goToPersondetail&&o.goToPersondetail(...i))},ge),e.expertData.skill?(a(),n("p",_e,"\u64C5\u957F\uFF1A"+r(e.expertData.skill),1)):p("v-if",!0),e.expertData.introduce?(a(),n("p",ve,r(e.expertData.introduce),1)):p("v-if",!0)])):p("v-if",!0),d(A,{modelValue:e.active,"onUpdate:modelValue":t[11]||(t[11]=i=>e.active=i),sticky:"",class:j(["tabs",{aiTab:o.id==s.aiExpertId}]),color:"#0D90FF","offset-top":e.num,onScroll:o.scroll},{default:f(()=>[d(v,null,{title:f(()=>[c(" \u89E3\u7B54 "+r(e.expertData.posts),1)]),default:f(()=>[e.noData?(a(),m(g,{key:0,description:"\u6682\u65E0\u89E3\u7B54"})):(a(),n("ul",xe,[d(_,{loading:e.loading,"onUpdate:loading":t[8]||(t[8]=i=>e.loading=i),finished:e.finished,"finished-text":"\u6CA1\u6709\u66F4\u591A\u4E86",onLoad:o.onLoad,"immediate-check":!1},{default:f(()=>[(a(!0),n(x,null,k(e.askedList,i=>(a(),n("li",{key:i.id},[d(I,{list:i,onPreImage:o.preverImg},null,8,["list","onPreImage"])]))),128))]),_:1},8,["loading","finished","onLoad"])]))]),_:1}),o.id!=s.aiExpertId?(a(),m(v,{key:0,sticky:""},{title:f(()=>[c(" \u63D0\u95EE "+r(e.expertData.threads),1)]),default:f(()=>[e.noData2?(a(),m(g,{key:0,description:"\u6682\u65E0\u63D0\u95EE"})):S((a(),n("ul",ke,[d(_,{loading:e.loading2,"onUpdate:loading":t[9]||(t[9]=i=>e.loading2=i),finished:e.finished2,"finished-text":"\u6CA1\u6709\u66F4\u591A\u4E86",onLoad:o.onLoad2,"immediate-check":!1},{default:f(()=>[(a(!0),n(x,null,k(e.askMeList,i=>(a(),n("li",{key:i.id},[d(I,{list:i,onPreImage:o.preverImg},null,8,["list","onPreImage"])]))),128))]),_:1},8,["loading","finished","onLoad"])],512)),[[T,o.id!=s.aiExpertId]])]),_:1})):p("v-if",!0),o.id!=s.aiExpertId?(a(),m(v,{key:1,sticky:""},{title:f(()=>[c(" \u52A0\u5165\u7684\u533B\u9662 "+r(e.expertData.join),1)]),default:f(()=>[e.noData3?(a(),m(g,{key:0,description:"\u6682\u672A\u52A0\u5165\u533B\u9662"})):S((a(),n("ul",ye,[d(_,{loading:e.loading3,"onUpdate:loading":t[10]||(t[10]=i=>e.loading3=i),finished:e.finished3,onLoad:o.onLoad3,"immediate-check":!1},{default:f(()=>[(a(!0),n(x,null,k(e.hospitalList,i=>(a(),n("li",{key:i.id},[d(P,{list:i},null,8,["list"])]))),128))]),_:1},8,["loading","finished","onLoad"])],512)),[[T,o.id!=s.aiExpertId]])]),_:1})):p("v-if",!0)]),_:1},8,["modelValue","offset-top","class","onScroll"])])}var Me=K(Q,[["render",De],["__scopeId","data-v-ef45d2f6"]]);export{Me as default};
