var y=Object.defineProperty;var l=Object.getOwnPropertySymbols;var H=Object.prototype.hasOwnProperty,D=Object.prototype.propertyIsEnumerable;var c=(t,e,o)=>e in t?y(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,_=(t,e)=>{for(var o in e||(e={}))H.call(e,o)&&c(t,o,e[o]);if(l)for(var o of l(e))D.call(e,o)&&c(t,o,e[o]);return t};import{H as w}from"./header.1705d6a2.js";import{R as x}from"./recommend_hospital.9055385e.js";import{m as S,c as i,e as a,h as n,j as m,C as p,D as d,k as u,F as g,i as k,t as B,f as I,v as R}from"./index.a3582b47.js";import{u as C}from"./useTitles.0514a601.js";import{_ as L}from"./plugin-vue_export-helper.21dcd24c.js";import"./fast_nav.a53c4cb6.js";import"./index.40ed97f4.js";const N={setup(){C("\u6211\u52A0\u5165\u7684\u533B\u9662")},name:"meHospital",components:{Header:w,RecommendHospital:x},props:{},data(){return{list:[],total:"",noData:!1,initShow:!1}},computed:_({},S(["uId"])),created(){},watch:{},mounted(){this.getList()},methods:{getList(){this.noData=!1,this.$axios.fetchPost("/Mobile/user/myJoinHospital",{uId:this.uId,isuser:1}).then(t=>{t.data.code==0?(this.list=t.data.data.list,this.total=t.data.data.total,this.initShow=!0):t.data.code==201&&(this.noData=!0)})}}},V={class:"me_hospital-container"},F={class:"me-ul"};function b(t,e,o,j,s,E){const h=i("Header"),f=i("RecommendHospital"),v=i("van-empty");return a(),n("div",V,[m(h,{indexHeader:!1}),p(u("ul",F,[(a(!0),n(g,null,k(s.list,r=>(a(),n("li",{key:r.id},[m(f,{list:r},null,8,["list"])]))),128))],512),[[d,!s.noData&&s.initShow]]),p(u("div",{class:"title f18"},"\u5DF2\u52A0\u5165"+B(s.total)+"\u5BB6\u533B\u9662",513),[[d,!s.noData&&s.initShow]]),s.noData?(a(),I(v,{key:0,description:"\u60A8\u8FD8\u6CA1\u6709\u52A0\u5165\u8FC7\u533B\u9662"})):R("v-if",!0)])}var K=L(N,[["render",b],["__scopeId","data-v-15fc7e49"]]);export{K as default};
