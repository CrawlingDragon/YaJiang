var g=Object.defineProperty;var l=Object.getOwnPropertySymbols;var x=Object.prototype.hasOwnProperty,v=Object.prototype.propertyIsEnumerable;var p=(e,t,s)=>t in e?g(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,c=(e,t)=>{for(var s in t||(t={}))x.call(t,s)&&p(e,s,t[s]);if(l)for(var s of l(t))v.call(t,s)&&p(e,s,t[s]);return e};import{H as L}from"./hospital_header.4131d3ee.js";import{R as y}from"./recommend_expert.54a8ae19.js";import{m as D,c as i,e as n,h as r,j as d,g as H,v as E,C as k,D as w,F as C,i as N}from"./index.a3582b47.js";import{u as R}from"./useTitles.0514a601.js";import{_ as b}from"./plugin-vue_export-helper.21dcd24c.js";import"./fast_nav.a53c4cb6.js";import"./index.40ed97f4.js";const B={setup(){return{title:R("\u4E13\u5BB6\u5217\u8868")}},name:"hospitalExpert",components:{Header:L,RecommendExpert:y},props:{},data(){return{list:[],loading:!1,finished:!1,page:0,noData:!1}},created(){},computed:c({},D(["mid","hospitalName"])),watch:{},mounted(){this.title=this.hospitalName},methods:{onLoad(){this.getList()},getList(){this.page+=1,this.$axios.fetchPost("Mobile/User/expertList",{mId:this.mid,page:this.page,isall:"self"}).then(e=>{e.data.code==0?(this.list=this.list.concat(e.data.data),this.loading=!1):e.data.code==201&&(this.page==1&&(this.noData=!0),this.finished=!0)})}}},F={class:"hospital_expert-container"},I={key:0,class:"expert-ul"};function S(e,t,s,U,o,m){const _=i("Header"),h=i("RecommendExpert"),f=i("van-list"),u=i("van-empty");return n(),r("div",F,[d(_,{header:"indexHeader",navHeader:"\u4E13\u5BB6"}),o.noData?E("v-if",!0):(n(),r("ul",I,[d(f,{loading:o.loading,"onUpdate:loading":t[0]||(t[0]=a=>o.loading=a),finished:o.finished,"finished-text":"\u6CA1\u6709\u66F4\u591A\u4E86",onLoad:m.onLoad},{default:H(()=>[(n(!0),r(C,null,N(o.list,a=>(n(),r("li",{key:a.id},[d(h,{list:a},null,8,["list"])]))),128))]),_:1},8,["loading","finished","onLoad"])])),k(d(u,{description:"\u6682\u65E0\u533B\u9662\u4E13\u5BB6"},null,512),[[w,o.noData]])])}var G=b(B,[["render",S],["__scopeId","data-v-db2c3a36"]]);export{G as default};
