import{H as u}from"./header.1705d6a2.js";import{O as f}from"./online_item.85cc6858.js";import{u as m}from"./useTitles.0514a601.js";import{c as n,e as s,h as i,j as a,k as l,t as d,g,F as v,i as x}from"./index.a3582b47.js";import{_ as y}from"./plugin-vue_export-helper.21dcd24c.js";import"./fast_nav.a53c4cb6.js";import"./index.40ed97f4.js";const O={setup(){m("\u641C\u7D22\u7ED3\u679C")},name:"searchOnlineCrop",components:{Header:u,OnlineItem:f},props:{},data(){return{crop:this.$route.query.crop,fid:this.$route.query.fid,online:[],loading:!1,finished:!1,page:0}},created(){},computed:{},watch:{},mounted(){},methods:{onLoad(){this.getSearchResult()},getSearchResult(){this.page+=1,this.$axios.fetchPost("Mobile/Wen/index",{fId:this.fid,page:this.page,isall:"all"}).then(t=>{t.data.code==0?(this.loading=!1,this.online=this.online.concat(t.data.data)):t.data.code==201&&(this.finished=!0)})}}},H={class:"searchOnlineCrop-container"},I={class:"title"},L={class:"crop-ul"};function k(t,r,C,q,e,c){const p=n("Header"),_=n("OnlineItem"),h=n("van-list");return s(),i("div",H,[a(p,{indexHeader:!1}),l("div",I,"\u5171"+d(this.$route.query.time)+"\u6B21"+d(e.crop)+"\u7F51\u8BCA\u8BB0\u5F55",1),l("ul",L,[a(h,{loading:e.loading,"onUpdate:loading":r[0]||(r[0]=o=>e.loading=o),finished:e.finished,"finished-text":"\u6CA1\u6709\u66F4\u591A\u4E86",onLoad:c.onLoad},{default:g(()=>[(s(!0),i(v,null,x(e.online,o=>(s(),i("li",{key:o.id},[a(_,{list:o},null,8,["list"])]))),128))]),_:1},8,["loading","finished","onLoad"])])])}var V=y(O,[["render",k],["__scopeId","data-v-68b02525"]]);export{V as default};
