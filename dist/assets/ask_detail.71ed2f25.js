var M=Object.defineProperty,S=Object.defineProperties;var z=Object.getOwnPropertyDescriptors;var x=Object.getOwnPropertySymbols;var H=Object.prototype.hasOwnProperty,U=Object.prototype.propertyIsEnumerable;var y=(e,t,d)=>t in e?M(e,t,{enumerable:!0,configurable:!0,writable:!0,value:d}):e[t]=d,m=(e,t)=>{for(var d in t||(t={}))H.call(t,d)&&y(e,d,t[d]);if(x)for(var d of x(t))U.call(t,d)&&y(e,d,t[d]);return e},b=(e,t)=>S(e,z(t));import{H as q}from"./header.1705d6a2.js";import{m as E,s as N,J as j,I as A,c as p,e as a,h as l,j as u,k as o,z as v,t as n,v as c,C,F as g,i as k,g as F,l as I,x as W,y as J,D as V}from"./index.a3582b47.js";import{u as L}from"./useTitles.0514a601.js";import{_ as Q}from"./rate_popup.d8d29d6f.js";import{_ as G}from"./plugin-vue_export-helper.21dcd24c.js";import"./fast_nav.a53c4cb6.js";import"./index.40ed97f4.js";const K={setup(){L("\u95EE\u7B54\u8BE6\u60C5")},name:"askDetail",components:{Header:q,RatePopup:Q},props:{},data(){return{tid:this.$route.query.tid,from:this.$route.query.from,show:!1,showRote:!1,message:"",roteValue:1,messageRote:"",detail:"",pid:"",author:""}},computed:m({},E(["uId"])),created(){},watch:{$route(){this.tid=this.$route.query.tid,this.getDetail()}},mounted(){this.getDetail()},methods:b(m({},N(["setMid"])),{getDetail(){this.$axios.fetchPost("Mobile/Wen/detail",{tId:this.tid,uId:this.uId}).then(e=>{e.data.code==0&&(this.detail=e.data.data)})},showPopup(){this.uId==""&&j(),this.show=!0},sub(){this.message!=""&&this.$axios.fetchPost("/Mobile/Wen/addQuestionAnswers",{uId:this.uId,content:this.message,tId:this.tid}).then(e=>{e.data.code==0&&(this.getDetail(),this.message=""),this.show=!1,this.$toast(e.data.message)})},showPopupRote(e){this.author=e.name,this.pid=e.pid,this.showRote=!0},subRemark(){this.$axios.fetchPost("Mobile/User/pushAppraises",{uId:this.uId,tId:this.tid,pId:this.pid,score:this.roteValue,comment:this.messageRote}).then(e=>{e.data.code==0&&(this.showRote=!1,this.getDetail(),this.roteValue=1,this.messageRote=""),this.$toast(e.data.message)})},preview(e,t){A({images:e,startPosition:t,closeable:!0})},goToExpert(e,t){e==0||e==1?this.$router.push({path:"/expert",query:{id:t}}):e==2&&(this.setMid(t),this.$router.push({path:"/hospital"}))},benefit(){this.$dialog.alert({message:"\u56DE\u7B54\u8BE5\u95EE\u9898\uFF0C\u80FD\u83B7\u5F97\u5E73\u53F0\u8865\u52A9",confirmButtonText:"\u77E5\u9053\u4E86",confirmButtonColor:"#155BBB"}).then(()=>{})}})},f=e=>(W("data-v-36fdffe5"),e=e(),J(),e),O={class:"online-box"},X={class:"top"},Y={class:"name f20 l-h"},Z={class:"time f18 l-h"},$={key:0},ss={class:"text f20"},es={class:"img-list"},ts=["onClick"],os={class:"bottom"},is={class:"left"},as=f(()=>o("div",{class:"icon icon1"},null,-1)),ls={class:"content"},ns={key:0,class:"right"},rs=f(()=>o("div",{class:"content"},"\u54A8\u8BE2\u4E13\u5BB6",-1)),cs={key:0,class:"answer-box"},ds={class:"title f22"},us={class:"answer-ul"},hs={class:"top"},_s={class:"name f20"},ps={class:"time f18"},vs={class:"text f20 l-h"},fs={class:"image-ul"},ms=["onClick"],gs={class:"lookat-yinongbao"},ks=["onClick"],ws=f(()=>o("div",{class:"icon"},null,-1)),xs=v(" \u8BC4\u5206 "),ys=[ws,xs],bs={key:1,class:"roted-box"},Cs={class:"top"},Is={class:"rig"},Vs={class:"p1 f20 l-h"},Ps={class:"p2 f18 l-h"},Rs={class:"star"},Ds={key:0,class:"f18"},Ts={key:1,class:"f18"},Bs={key:2,class:"f18"},Ms={key:3,class:"f18"},Ss={key:4,class:"f18"},zs={class:"txt f20 l-h"},Hs=f(()=>o("div",{class:"border f20"},"\u6211\u6765\u56DE\u7B54...",-1)),Us=[Hs],qs={class:"message-box"};function Es(e,t,d,Ns,i,r){const P=p("Header"),_=p("van-image"),R=p("van-rate"),D=p("van-field"),T=p("van-popup"),B=p("RatePopup");return a(),l("div",{class:I(["ask_detail-container",{jiashicang:i.from=="jiashicang"}])},[u(P,{indexHeader:!1}),o("div",O,[o("div",X,[u(_,{round:"",class:"avator",src:i.detail.avatar,onClick:t[0]||(t[0]=s=>r.goToExpert(0,i.detail.authorid))},null,8,["src"]),o("div",Y,[v(n(i.detail.author)+" ",1),o("div",Z,[v(n(i.detail.addtime)+" ",1),i.detail.area?(a(),l("span",$,"\xB7")):c("v-if",!0),v(" "+n(i.detail.area),1)])])]),i.detail.isbenefit==1?C((a(),l("div",{key:0,class:"subsidy",onClick:t[1]||(t[1]=(...s)=>r.benefit&&r.benefit(...s))},null,512)),[[V,!1]]):c("v-if",!0),o("div",ss,n(i.detail.content),1),o("div",es,[(a(!0),l(g,null,k(i.detail.urls_tiny,(s,h)=>(a(),l("div",{class:"item",key:s,onClick:w=>r.preview(i.detail.urls,h)},[u(_,{class:"img",fit:"cover",src:s,"lazy-load":""},null,8,["src"])],8,ts))),128))]),o("div",os,[o("div",is,[as,o("div",ls,n(i.detail.name),1)]),i.detail.ishaveexpert?(a(),l("div",ns,[rs,u(_,{class:"icon icon3",src:i.detail.ishaveexpert.avatar,round:"",onClick:t[2]||(t[2]=s=>r.goToExpert(0,i.detail.ishaveexpert.expertid))},null,8,["src"])])):c("v-if",!0)])]),i.detail.replies!=0?(a(),l("div",cs,[o("div",ds,"\u89E3\u7B54 "+n(i.detail.replies),1),o("ul",us,[(a(!0),l(g,null,k(i.detail.answers,s=>(a(),l("li",{key:s.pid},[o("div",hs,[u(_,{round:"",fit:"cover",src:s.avatar,class:"avator",onClick:h=>r.goToExpert(s.isexpert,s.authorid)},null,8,["src","onClick"]),o("div",_s,[v(n(s.name)+" ",1),C(o("span",null,"("+n(s.groupname)+")",513),[[V,s.groupname!=""]])]),o("div",ps,n(s.addtime),1)]),o("div",vs,n(s.content),1),o("div",fs,[(a(!0),l(g,null,k(s.pic_urls_tiny,(h,w)=>(a(),l("div",{class:"item",key:h.id,onClick:js=>r.preview(s.urls,w)},[u(_,{src:h,fit:"cover",class:"answer-img"},null,8,["src"])],8,ms))),128))]),o("div",gs,n(s.add_wenlist_tips),1),i.detail.isself==1&&s.isself==0&&s.score==""&&s.isexpert!=0?(a(),l("div",{key:0,class:"rote f18",onClick:h=>r.showPopupRote(s)},ys,8,ks)):c("v-if",!0),s.score!=""&&s.score.viewstatus==1?(a(),l("div",bs,[o("div",Cs,[u(_,{round:"",src:s.score.avatar,fit:"cover",class:"img rote-img",onClick:h=>r.goToExpert(s.score.utype,s.score.authorid)},null,8,["src","onClick"]),o("div",Is,[o("p",Vs,n(s.score.name),1),o("p",Ps,n(s.score.addtime),1)])]),o("div",Rs,[u(R,{modelValue:s.score.score,"onUpdate:modelValue":h=>s.score.score=h,color:"#ff6600",readonly:"",size:"27px"},null,8,["modelValue","onUpdate:modelValue"]),s.score.score==1?(a(),l("span",Ds,"\u89E3\u7B54\u975E\u5E38\u5DEE")):c("v-if",!0),s.score.score==2?(a(),l("span",Ts,"\u89E3\u7B54\u5DEE")):c("v-if",!0),s.score.score==3?(a(),l("span",Bs,"\u89E3\u7B54\u4E00\u822C")):c("v-if",!0),s.score.score==4?(a(),l("span",Ms,"\u89E3\u7B54\u597D")):c("v-if",!0),s.score.score==5?(a(),l("span",Ss,"\u89E3\u7B54\u5F88\u597D")):c("v-if",!0)]),o("div",zs,n(s.score.content),1)])):c("v-if",!0)]))),128))])])):c("v-if",!0),o("div",{class:"answer-bar",onClick:t[3]||(t[3]=(...s)=>r.showPopup&&r.showPopup(...s))},Us),u(T,{show:i.show,"onUpdate:show":t[6]||(t[6]=s=>i.show=s),closeable:"","close-icon-position":"top-left",position:"bottom",style:{height:"220px"},class:"van-popup-box"},{default:F(()=>[o("div",{class:I(["sub subText f18",{content:i.message}]),onClick:t[4]||(t[4]=(...s)=>r.sub&&r.sub(...s))},"\u63D0\u4EA4",2),o("div",qs,[u(D,{modelValue:i.message,"onUpdate:modelValue":t[5]||(t[5]=s=>i.message=s),rows:"5",autosize:"",type:"textarea",maxlength:"600",placeholder:"\u6211\u6765\u56DE\u7B54","show-word-limit":"",class:"message f18"},null,8,["modelValue"])])]),_:1},8,["show"]),c("v-if",!0),u(B,{author:i.author},null,8,["author"])],2)}var Os=G(K,[["render",Es],["__scopeId","data-v-36fdffe5"]]);export{Os as default};
