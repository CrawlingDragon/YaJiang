var k=Object.defineProperty,f=Object.defineProperties;var I=Object.getOwnPropertyDescriptors;var l=Object.getOwnPropertySymbols;var v=Object.prototype.hasOwnProperty,g=Object.prototype.propertyIsEnumerable;var d=(e,t,a)=>t in e?k(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,p=(e,t)=>{for(var a in t||(t={}))v.call(t,a)&&d(e,a,t[a]);if(l)for(var a of l(t))g.call(t,a)&&d(e,a,t[a]);return e},_=(e,t)=>f(e,I(t));import{T as C}from"./take_case_item.cebbaf1c.js";import{m as y,a1 as x,c as L,e as s,h as o,F as D,i as T,v as m,k as r,x as b,y as w,j as A}from"./index.a3582b47.js";import{_ as B}from"./plugin-vue_export-helper.21dcd24c.js";const N={name:"all_case",components:{TakeCaseItem:C},props:{},data(){return{caseArr:[],noData:!1,action:"template_list",pId:""}},computed:_(p({},y(["uId"])),{from(){let e="";return(this.action==="dingyue"||this.action==="templatedel")&&(e="template_list"),e}}),watch:{},mounted(){this.getCase()},unmounted(){},methods:{clickCase(e){console.log("caseStatus :>> ",e),this.action=e.status,this.pId=e.pId,this.getCase("click")},goLook(){this.$router.replace({path:"/into_hospital"})},getCase(e){x.fetchPost("/Mobile/Gbase/getUserproject",{uId:this.uId,action:this.action,pId:this.pId,from:this.from}).then(t=>{let a=t.data;a.code===0&&(this.caseArr=a.data,a.data.length===0&&(this.noData=!0)),a.code===201&&e&&this.$toast(a.message)})}}},h=e=>(b("data-v-4a6a7a1a"),e=e(),w(),e),S={class:"take-case-container"},V={key:0},j={key:1,class:"no-take-wrap"},F=h(()=>r("p",null,"\u60A8\u672A\u52A0\u5165\u4EFB\u4F55\u533B\u9662",-1)),E=h(()=>r("div",{class:"p2"},"\u52A0\u5165\u533B\u9662\u540E\u53EF\u83B7\u53D6\u8BE5\u533B\u9662\u7684\u4F5C\u7269\u89E3\u51B3\u65B9\u6848",-1));function G(e,t,a,M,i,n){const u=L("TakeCaseItem");return s(),o("div",S,[i.noData?m("v-if",!0):(s(),o("ul",V,[(s(!0),o(D,null,T(i.caseArr,c=>(s(),o("li",{key:c.id},[A(u,{item:c,onClickLook:n.clickCase},null,8,["item","onClickLook"])]))),128))])),i.noData?(s(),o("div",j,[F,E,r("div",{class:"btn",onClick:t[0]||(t[0]=(...c)=>n.goLook&&n.goLook(...c))},"\u53BB\u52A0\u5165\u533B\u9662")])):m("v-if",!0)])}var H=B(N,[["render",G],["__scopeId","data-v-4a6a7a1a"]]);export{H as default};
