var M=Object.defineProperty,w=Object.defineProperties;var T=Object.getOwnPropertyDescriptors;var u=Object.getOwnPropertySymbols;var B=Object.prototype.hasOwnProperty,b=Object.prototype.propertyIsEnumerable;var _=(e,t,i)=>t in e?M(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,m=(e,t)=>{for(var i in t||(t={}))B.call(t,i)&&_(e,i,t[i]);if(u)for(var i of u(t))b.call(t,i)&&_(e,i,t[i]);return e},v=(e,t)=>w(e,T(t));import{H as q}from"./header.d5316539.js";import{H as N}from"./hospital_header.56138803.js";import{m as S,s as V,c as d,e as o,h as n,f as h,v as p,k as r,F as W,i as F,C as f,D as g,j as H,B as k,t as c,l as I}from"./index.3518e5b0.js";import{u as j}from"./useTitles.54f46820.js";import{_ as z}from"./plugin-vue_export-helper.21dcd24c.js";import"./fast_nav.40db65c6.js";const E={setup(){j("\u76F4\u64AD")},name:"live",components:{Header:q,HospitalHeader:N},props:{},data(){return{list:[],menum:"",noData:!1}},computed:v(m({},S(["mid","initMid"])),{from(){return this.$route.query.from}}),watch:{from(e){e!==void 0&&this.getList()}},created(){},mounted(){this.getList()},methods:v(m({},V(["setMid"])),{getList(){this.noData=!1,this.$axios.fetchPost("Mobile/Live/getLiveList",{mId:this.mid,isall:this.from=="index"?"all":"self"}).then(e=>{e.data.code==0?(this.list=e.data.data,this.menum=e.data.hasmenu):e.data.code==201&&(this.noData=!0)})},liveHref(e){window.location.href=e},goLive(){this.$router.push({path:"/live_list",query:{mid:this.mid}})},goToHospital(e){this.setMid(e),this.$router.push({path:"/hospital"})},goToWholeLive(){this.setMid(this.initMid),this.$router.push({path:"/live",query:{from:"index"}})}})},O={class:"live-container"},P={class:"live-ul"},A=["onClick"],G={class:"bottom"},J={class:"left"},K={class:"right"},Q=["onClick"];function R(e,t,i,U,l,a){const x=d("Header"),y=d("HospitalHeader"),L=d("van-image"),C=d("van-empty");return o(),n("div",O,[a.from=="index"?(o(),h(x,{key:0,indexHeader:!1})):(o(),h(y,{key:1,indexHeader:"indexHeader",navHeader:"\u76F4\u64AD"})),l.menum==1?(o(),n("div",{key:2,class:"program",onClick:t[0]||(t[0]=(...s)=>a.goLive&&a.goLive(...s))},"\u76F4\u64AD\u8282\u76EE\u5355")):p("v-if",!0),r("ul",P,[(o(!0),n(W,null,F(l.list,s=>(o(),n("li",{key:s.id,onClick:k(D=>a.liveHref(s.linkurl),["stop"])},[H(L,{class:"live-img",src:s.thumb,fit:"cover"},null,8,["src"]),r("div",G,[r("div",J,c(s.name),1),r("div",K,c(s.endtime),1)]),a.from=="index"&&s.mname!=""?(o(),n("div",{key:0,class:"hospital",onClick:k(D=>a.goToHospital(s.mid),["stop"])},c(s.mname),9,Q)):p("v-if",!0),r("div",{class:I(["status living",{living:s.status=="\u76F4\u64AD\u4E2D",lived:s.status=="\u56DE\u653E",before_live:s.status=="\u9884\u544A"}])},c(s.status),3)],8,A))),128))]),f(H(C,{description:a.from=="index"?"\u6682\u65E0\u76F4\u64AD,\u656C\u8BF7\u671F\u5F85":"\u672C\u9662\u6682\u65E0\u76F4\u64AD"},null,8,["description"]),[[g,l.noData]]),f(r("div",{class:"lookOther",onClick:t[1]||(t[1]=(...s)=>a.goToWholeLive&&a.goToWholeLive(...s))}," \u67E5\u770B\u5176\u4ED6\u76F4\u64AD ",512),[[g,l.noData&&a.from!="index"]])])}var ie=z(E,[["render",R],["__scopeId","data-v-735fec05"]]);export{ie as default};