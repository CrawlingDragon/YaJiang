var x=Object.defineProperty;var h=Object.getOwnPropertySymbols;var k=Object.prototype.hasOwnProperty,B=Object.prototype.propertyIsEnumerable;var u=(e,o,a)=>o in e?x(e,o,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[o]=a,g=(e,o)=>{for(var a in o||(o={}))k.call(o,a)&&u(e,a,o[a]);if(h)for(var a of h(o))B.call(o,a)&&u(e,a,o[a]);return e};import{H as C}from"./header.d5316539.js";import{m as D,c as d,e as _,h as r,j as l,C as v,D as f,k as t,g as L,F as H,i as I,l as S,t as i,B as T,x as z,y as F}from"./index.3518e5b0.js";import{_ as M}from"./plugin-vue_export-helper.21dcd24c.js";import"./fast_nav.40db65c6.js";const j={name:"wholeBaseList",components:{Header:C},props:{},metaInfo:{title:"\u57FA\u5730\u5217\u8868"},data(){return{list:[],loading:!1,finished:!1,page:0,noData:!1,baseUrl:"http://demo.datav.114nz.com/base_code/#/?gbasecode="}},computed:g({},D(["uId","axiosAddress"])),created(){},watch:{},mounted(){},unmounted(){},methods:{onLoad(){this.getBaseList()},getBaseList(){this.page+=1,this.$axios.fetchPost("/Mobile/Mpublic/getFineBaseCom",{page:this.page,isall:"all",location:this.axiosAddress}).then(e=>{e.data.code==0?(this.list=this.list.concat(e.data.data),this.loading=!1):e.data.code==201&&(this.page==1&&(this.noData=!0),this.finished=!0)})},goToBaseDetail(e){window.open(e,"blank")},goToQuHref(e){window.open(e,"_blank")}}},q=e=>(z("data-v-fe593462"),e=e(),F(),e),A={class:"good_base-container"},N={class:"base-ul"},Q=["onClick"],U={class:"text"},V={class:"h2"},E={class:"p2"},P={class:"join-time"},G={class:"time"},J={class:"hospital"},K=q(()=>t("div",{class:"icon"},null,-1)),O=["onClick"];function R(e,o,a,W,n,c){const m=d("Header"),p=d("van-image"),w=d("van-list"),y=d("van-empty");return _(),r("div",A,[l(m,{indexHeader:!1}),v(t("ul",N,[l(w,{loading:n.loading,"onUpdate:loading":o[0]||(o[0]=s=>n.loading=s),finished:n.finished,"finished-text":"\u6CA1\u6709\u66F4\u591A\u4E86",onLoad:c.onLoad},{default:L(()=>[(_(!0),r(H,null,I(n.list,s=>(_(),r("li",{key:s.id,onClick:b=>c.goToQuHref(s.qr_page_url)},[t("div",{class:S(["status",{glod:s.ctype=="8",base:s.ctype=="6",none:s.ctype=="0"}])},i(s.ctype=="8"?"\u91D1\u724C\u8BA4\u8BC1":s.ctype=="6"?"\u57FA\u5730\u8BA4\u8BC1":"\u672A\u8BA4\u8BC1"),3),l(p,{class:"img",src:s.logo},null,8,["src"]),t("div",U,[t("div",V,i(s.name),1),t("div",E,i(s.zwtype)+" "+i(s.guimo),1),t("div",P,[l(p,{class:"avator",round:"",src:s.avatar},null,8,["src"]),t("div",G,i(s.regtime)+" \u52A0\u5165\u533B\u9662",1)]),t("div",J,[K,t("span",null,i(s.mpublic),1)])]),t("div",{class:"router-icon",onClick:T(b=>c.goToBaseDetail(s.qrcode),["stop"])},null,8,O)],8,Q))),128))]),_:1},8,["loading","finished","onLoad"])],512),[[f,!n.noData]]),v(l(y,{description:"\u6682\u65E0\u4F18\u8D28\u57FA\u5730"},null,512),[[f,n.noData]])])}var se=M(j,[["render",R],["__scopeId","data-v-fe593462"]]);export{se as default};