var v=Object.defineProperty;var d=Object.getOwnPropertySymbols;var z=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable;var _=(e,t,o)=>t in e?v(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,l=(e,t)=>{for(var o in t||(t={}))z.call(t,o)&&_(e,o,t[o]);if(d)for(var o of d(t))k.call(t,o)&&_(e,o,t[o]);return e};import{H as y}from"./header.1705d6a2.js";import{m as g,c as p,e as a,h as n,j as D,F as x,i as w,v as h,f as H,k as r,t as c,z as I}from"./index.a3582b47.js";import{u as T}from"./useTitles.0514a601.js";import{_ as B}from"./plugin-vue_export-helper.21dcd24c.js";import"./fast_nav.a53c4cb6.js";import"./index.40ed97f4.js";const C={setup(){T("\u6211\u7684\u5750\u8BCA\u5DE1\u8BCA")},name:"wholeZuoZhenList",components:{Header:y},props:{},data(){return{list:[],noData:!1}},computed:l({},g(["uId","initMid"])),watch:{},created(){},mounted(){this.getOnlineList()},methods:{getOnlineList(){this.noData=!1,this.$axios.fetchPost("/Mobile/Treatment/getWenzhen",{uId:this.uId,mId:this.initMid}).then(e=>{e.data.code==0?this.list=e.data.data:e.data.code==201&&(this.noData=!0)})},goToDetail(e){this.$router.push({path:"/zuozhen_detail",query:{id:e}})}}},L={class:"zuozhen_list-container"},N={key:0},V=["onClick"],M={class:"p1"},$={class:"p2"},b={class:"hospital"};function F(e,t,o,O,i,u){const m=p("Header"),f=p("van-empty");return a(),n("div",L,[D(m,{indexHeader:!1}),i.noData?h("v-if",!0):(a(),n("ul",N,[(a(!0),n(x,null,w(i.list,s=>(a(),n("li",{key:s.id,onClick:S=>u.goToDetail(s.id)},[r("p",M,c(s.title),1),r("p",$,[I(c(s.showtime),1),r("span",b,c(s.mpublic),1)])],8,V))),128))])),i.noData?(a(),H(f,{key:1,description:"\u6682\u65E0\u533B\u9662\u5C31\u8BCA\u8BB0\u5F55"})):h("v-if",!0)])}var G=B(C,[["render",F],["__scopeId","data-v-a055e9f6"]]);export{G as default};
