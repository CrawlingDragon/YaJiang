var D=Object.defineProperty;var _=Object.getOwnPropertySymbols;var x=Object.prototype.hasOwnProperty,L=Object.prototype.propertyIsEnumerable;var m=(e,t,s)=>t in e?D(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,p=(e,t)=>{for(var s in t||(t={}))x.call(t,s)&&m(e,s,t[s]);if(_)for(var s of _(t))L.call(t,s)&&m(e,s,t[s]);return e};import{H as C}from"./header.d5316539.js";import{H as I}from"./hospital_header.56138803.js";import{m as T,c as n,e as a,h as d,f as h,C as u,D as f,k as r,j as g,g as U,F as w,i as B,t as l,v as N}from"./index.3518e5b0.js";import{u as b}from"./useTitles.54f46820.js";import{_ as M}from"./plugin-vue_export-helper.21dcd24c.js";import"./fast_nav.40db65c6.js";const S={name:"cetuList",components:{Header:C,HeaderHospital:I},props:{},setup(){b("\u571F\u58E4\u68C0\u6D4B")},created(){},data(){return{list:[],noData:!1,from:this.$route.query.from,loading:!1,finished:!1,page:0,meUid:""}},computed:p({},T(["mid","uId","hospitalName"])),mounted(){this.from!="me"?this.meUid="":this.meUid=this.uId},methods:{onLoad(){this.getMeList()},getMeList(){this.page+=1,this.$axios.fetchPost("/Mobile/Treatment/getTestingsoil",{uId:this.meUid,mId:this.mid,page:this.page}).then(e=>{e.data.code==0?(this.loading=!1,this.list=this.list.concat(e.data.data)):e.data.code==201&&(this.page==1&&(this.noData=!0),this.finished=!0)})},goToDetail(e){this.$router.push({path:"/soil_detail",query:{id:e}})}}},V={class:"cetu_list-container"},q={class:"cetu_ul"},F=["onClick"],j={class:"top"},E={class:"title f22"},P={class:"time f18"},z={key:0,class:"hospital"};function A(e,t,s,G,i,c){const v=n("Header"),H=n("HeaderHospital"),y=n("van-list"),k=n("van-empty");return a(),d("div",V,[i.from=="me"?(a(),h(v,{key:0,indexHeader:!1})):(a(),h(H,{key:1,navHeader:"\u6D4B\u571F\u914D\u65B9"})),u(r("ul",q,[g(y,{loading:i.loading,"onUpdate:loading":t[0]||(t[0]=o=>i.loading=o),finished:i.finished,"finished-text":"\u6CA1\u6709\u66F4\u591A\u4E86",onLoad:c.onLoad},{default:U(()=>[(a(!0),d(w,null,B(i.list,o=>(a(),d("li",{key:o.ids,onClick:J=>c.goToDetail(o.id)},[r("div",j,[r("div",E,l(o.title),1),r("div",P,l(o.showtime),1)]),i.from=="me"?(a(),d("div",z,l(o.mpublic),1)):N("v-if",!0)],8,F))),128))]),_:1},8,["loading","finished","onLoad"])],512),[[f,!i.noData]]),u(g(k,{description:"\u6682\u65E0\u571F\u58E4\u68C0\u6D4B\u62A5\u544A"},null,512),[[f,i.noData]])])}var Z=M(S,[["render",A],["__scopeId","data-v-0798c57b"]]);export{Z as default};
