var T=Object.defineProperty,b=Object.defineProperties;var S=Object.getOwnPropertyDescriptors;var v=Object.getOwnPropertySymbols;var H=Object.prototype.hasOwnProperty,B=Object.prototype.propertyIsEnumerable;var u=(e,t,s)=>t in e?T(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,w=(e,t)=>{for(var s in t||(t={}))H.call(t,s)&&u(e,s,t[s]);if(v)for(var s of v(t))B.call(t,s)&&u(e,s,t[s]);return e},y=(e,t)=>b(e,S(t));import{H as E}from"./header.d5316539.js";import{m as A,a3 as C,c as h,e as o,h as i,j as p,g as N,F as _,i as f,k as a,l as R,t as n,n as W,v as D,x as L,y as P}from"./index.3518e5b0.js";import{u as V}from"./useTitles.54f46820.js";import{_ as $}from"./plugin-vue_export-helper.21dcd24c.js";import"./fast_nav.40db65c6.js";const j={name:"preview",metaInfo:{title:"\u9884\u89C8"},components:{Header:E},setup(){V("\u4F5C\u7269\u89E3\u51B3\u65B9\u6848")},data(){return{w:0,caseArr:[],active1:0,top:0,re:[],active:0,offTop:[],item:[],it:[]}},computed:y(w({},A(["uId","old"])),{top(){return this.old?55:40},pId(){return this.$route.query.pId},navBar(){let e=[];return this.caseArr.length!==0&&this.caseArr.forEach((t,s)=>{e.push({classname:t.classname,index:s,option:this.offTop[s]})}),e}}),watch:{caseArr(){this.$nextTick(()=>{this.re=this.it,this.re.forEach(e=>{this.offTop.push(e.offsetTop-100)})})}},mounted(){this.getPreviewData(),window.addEventListener("scroll",this.handleScroll,!1)},unmounted(){window.removeEventListener("scroll",this.handleScroll,!1)},methods:{setItemRefItem(e){this.item.push(e)},setItemRefIt(e){this.it.push(e)},clickHandle(e,t){this.$nextTick(()=>{this.top=this.it[t].offsetTop-100,window.scrollTo({top:this.top,behavior:"smooth"})})},handleScroll(){let e=document.documentElement.scrollTop||document.body.scrollTop;setTimeout(()=>{const t=[...this.navBar].reverse();for(var s=0;s<t.length;s++)if(t[s].option<=e){this.active=t.length-1-s;break}this.active1=this.active},200)},getPreviewData(){C.fetchPost("/Mobile/Gbase/getUserproject",{uId:this.uId,action:"template_preview",pId:this.pId}).then(e=>{let t=e.data;t.code===0&&(this.caseArr=t.data.list,this.getNavWidth()),t.errcode&&alert(t.message)})},getNavWidth(){this.$nextTick(()=>{this.item.forEach(e=>{let t=e.offsetWidth;this.w+=t}),this.$refs.title.style.width=this.w+20+"px"})}}},q=e=>(L("data-v-4c0bc085"),e=e(),P(),e),z={class:"preview"},F={class:"title-content",ref:"title"},G=["onClick"],M={class:"item f20"},U={class:"step-box"},J={class:"title f22"},K={class:"small-title f15"},O={class:"right"},Q={class:"time f20"},X={class:"text f20"},Y={key:0,class:"pharmacy"},Z=q(()=>a("div",{class:"pharmacy-title"},"\u7528\u80A5\u7528\u836F\uFF1A",-1)),ee={class:"pharmacy-text"},te={class:"p1 f20"},se={class:"p2 f17"},ae=["href"];function oe(e,t,s,ie,m,d){const I=h("Header"),g=h("van-icon"),k=h("van-sticky"),x=h("van-image");return o(),i("div",z,[p(I,{indexHeader:!1,goBackHeader:!0}),p(k,{"offset-top":d.top},{default:N(()=>[a("div",{class:"step-title-bar",style:W({borderWidth:e.old?"15px":"10px"})},[a("div",F,[(o(!0),i(_,null,f(d.navBar,(c,r)=>(o(),i("div",{key:c.classname,ref_for:!0,ref:d.setItemRefItem,class:R(["item-wrap",{active:m.active1===r}]),onClick:l=>d.clickHandle(c,r)},[a("div",M,n(c.classname),1),p(g,{name:"arrow",class:"arrow"})],10,G))),128))],512)],4)]),_:1},8,["offset-top"]),(o(!0),i(_,null,f(m.caseArr,c=>(o(),i("div",{class:"steps",key:c.id,ref_for:!0,ref:d.setItemRefIt},[a("div",U,[a("div",J,n(c.classname),1),(o(!0),i(_,null,f(c.lists,r=>(o(),i("div",{class:"step",key:r.id},[a("div",K,n(r.classname),1),a("div",O,[a("div",Q,n(r.timepoint),1),a("div",X,n(r.content),1),r.druginfo.length!==0?(o(),i("div",Y,[Z,(o(!0),i(_,null,f(r.druginfo,l=>(o(),i("div",{class:"pharmacy-item",key:l.specid},[p(x,{class:"img",src:l.thumb,fit:"fill"},null,8,["src"]),a("div",ee,[a("div",te,n(l.name),1),a("div",se,"\u7528\u6CD5\u7528\u91CF\u8BF4\u660E\uFF1A"+n(l.quantity),1)]),a("a",{href:l.url,class:"bug f20"},"\u8D2D\u4E70",8,ae)]))),128))])):D("v-if",!0)])]))),128))])]))),128))])}var pe=$(j,[["render",oe],["__scopeId","data-v-4c0bc085"]]);export{pe as default};
