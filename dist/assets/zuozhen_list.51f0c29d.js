var f=Object.defineProperty;var d=Object.getOwnPropertySymbols;var v=Object.prototype.hasOwnProperty,z=Object.prototype.propertyIsEnumerable;var c=(e,t,a)=>t in e?f(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,l=(e,t)=>{for(var a in t||(t={}))v.call(t,a)&&c(e,a,t[a]);if(d)for(var a of d(t))z.call(t,a)&&c(e,a,t[a]);return e};import{H as g}from"./hospital_header.4131d3ee.js";import{m as k,c as _,e as s,h as n,j as y,k as i,F as D,i as H,f as x,v as B,t as p}from"./index.a3582b47.js";import{u as C}from"./useTitles.0514a601.js";import{_ as L}from"./plugin-vue_export-helper.21dcd24c.js";import"./fast_nav.a53c4cb6.js";import"./index.40ed97f4.js";const N={setup(){C("\u5750\u8BCA\u5DE1\u8BCA")},name:"zuozhenList",components:{Header:g},props:{},data(){return{list:[],noData:!1}},computed:l({},k(["mid","hospitalName"])),created(){},watch:{},mounted(){this.getOnlineList()},methods:{getOnlineList(){this.noData=!1,this.$axios.fetchPost("/Mobile/Treatment/getWenzhen",{mId:this.mid}).then(e=>{e.data.code==0?this.list=e.data.data:e.data.code==201&&(this.noData=!0)})},goToDetail(e){this.$router.push({path:"zuozhen_detail",query:{id:e}})}}},T={class:"zuozhen_list-container"},$=["onClick"],V={class:"p1 f20"},w={class:"p2 f18"};function F(e,t,a,I,r,m){const u=_("Header"),h=_("van-empty");return s(),n("div",T,[y(u,{header:"indexHeader",navHeader:"\u5750\u8BCA\u5DE1\u8BCA",mid:e.mid},null,8,["mid"]),i("ul",null,[(s(!0),n(D,null,H(r.list,o=>(s(),n("li",{key:o.id,onClick:O=>m.goToDetail(o.id)},[i("p",V,p(o.title),1),i("p",w,p(o.showtime),1)],8,$))),128))]),r.noData?(s(),x(h,{key:0,description:"\u6682\u65E0\u533B\u9662\u5C31\u8BCA\u8BB0\u5F55"})):B("v-if",!0)])}var W=L(N,[["render",F],["__scopeId","data-v-2c773276"]]);export{W as default};
