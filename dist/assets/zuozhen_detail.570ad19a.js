import{H as f}from"./hospital_header.4131d3ee.js";import{u as g}from"./useTitles.0514a601.js";import{I as d,c as h,e as n,h as l,j as r,k as s,t as e,F as u,i as p,v as y,C as k,D as x,x as D,y as I,f as b}from"./index.a3582b47.js";import{_ as C}from"./plugin-vue_export-helper.21dcd24c.js";import"./fast_nav.a53c4cb6.js";import"./index.40ed97f4.js";const w={name:"zuozhenDetail",components:{Header:f,[d.Component.name]:d.Component},setup(){g("\u5750\u8BCA\u5DE1\u8BCA\u8BE6\u60C5")},data(){return{zuozhen:"\u6211\u7684-\u5750\u8BCA\u5DE1\u8BCA\u8BE6\u60C5",products:[]}},computed:{id(){return this.$route.query.id}},watch:{$route(){this.getZuoDetail(this.id)}},mounted(){this.getZuoDetail(this.id)},methods:{getZuoDetail(c){this.$axios.fetchPost("/Mobile/Treatment/wenzhenDetail",{id:c}).then(_=>{_.data.code==0&&(this.zuozhen=_.data.data,this.products=_.data.data.products)})},preverImg(c){d({images:this.zuozhen.pic_urls,startPosition:c,closeable:!0})}}},o=c=>(D("data-v-2f8f2025"),c=c(),I(),c),H={class:"zuozhen_detail-container"},S={class:"top-ul"},B={class:"title1 f22"},N=o(()=>s("div",{class:"left"},"\u9001\u6837\u4EBA",-1)),P={class:"right"},V=o(()=>s("div",{class:"left"},"\u79CD\u690D\u4F5C\u7269",-1)),Z={class:"right"},q=o(()=>s("div",{class:"left"},"\u5750\u8BCA\u65E5\u671F",-1)),F={class:"right"},T=o(()=>s("div",{class:"left"},"\u75C5\u60C5\u63CF\u8FF0",-1)),j={class:"right"},E={key:0,class:"img-ul"},L=o(()=>s("div",{class:"t1"},"\u75C5\u60C5\u56FE\u7247",-1)),M={class:"item"},A={class:"bottom"},G=o(()=>s("div",{class:"title f22"},"\u5904\u65B9\u4FE1\u606F",-1)),J={class:"list"},K=o(()=>s("div",{class:"left"},"\u5904\u65B9\u4E13\u5BB6",-1)),O={class:"right"},Q={class:"list"},R=o(()=>s("div",{class:"left"},"\u770B\u8BCA\u7ED3\u679C",-1)),U={class:"right"},W={class:"bottom"},X=o(()=>s("div",{class:"title f22"},"\u7528\u836F\u4FE1\u606F",-1)),Y={class:"list"},$=o(()=>s("div",{class:"left"},"\u770B\u8BCA\u7ED3\u679C",-1)),ss={class:"right"},ts={class:"bottom"},es={class:"title f22"},os={class:"mid"},is={class:"p1"},cs={class:"p2"},ns={class:"number"};function ls(c,_,_s,ds,t,v){const m=h("Header"),a=h("van-image");return n(),l("div",H,[r(m,{header:"logoHeader"}),s("ul",S,[s("li",B,e(t.zuozhen.title),1),s("li",null,[N,s("div",P,e(t.zuozhen.username),1)]),s("li",null,[V,s("div",Z,e(t.zuozhen.fname),1)]),s("li",null,[q,s("div",F,e(t.zuozhen.addtime),1)]),s("li",null,[T,s("div",j,e(t.zuozhen.content),1)]),t.zuozhen.pic_urls_tiny&&t.zuozhen.pic_urls_tiny.length!=0?(n(),l("div",E,[L,s("div",M,[(n(!0),l(u,null,p(t.zuozhen.pic_urls_tiny,(i,z)=>(n(),b(a,{class:"img",key:i,src:i,onClick:as=>v.preverImg(z)},null,8,["src","onClick"]))),128))])])):y("v-if",!0)]),s("div",A,[G,s("div",J,[K,s("div",O,e(t.zuozhen.chufang_expert),1)]),s("div",Q,[R,s("div",U,e(t.zuozhen.result),1)])]),s("div",W,[X,s("div",Y,[$,s("div",ss,e(t.zuozhen.result),1)])]),k(s("ul",ts,[s("li",es,"\u5904\u65B9\u836F("+e(t.products.length)+")",1),(n(!0),l(u,null,p(t.zuozhen.products,i=>(n(),l("li",{class:"chufang-li",key:i.id},[r(a,{fit:"cover",src:i.thumb_pic,class:"chufang-img"},null,8,["src"]),s("div",os,[s("p",is,e(i.name),1),s("p",cs,"\u89C4\u683C:"+e(i.spec)+" \u5355\u4EF7:\xA5"+e(i.price),1)]),s("div",ns,"x"+e(i.quantity),1)]))),128))],512),[[x,t.products.length!=0]])])}var zs=C(w,[["render",ls],["__scopeId","data-v-2f8f2025"]]);export{zs as default};
