import{H as a}from"./header.1705d6a2.js";import{u as h}from"./useTitles.0514a601.js";import{c as _,e as t,h as o,j as d,k as s,t as n,v as i,x as f,y as u}from"./index.a3582b47.js";import{_ as v}from"./plugin-vue_export-helper.21dcd24c.js";import"./fast_nav.a53c4cb6.js";import"./index.40ed97f4.js";const m={setup(){h("\u4E2A\u4EBA\u7B80\u4ECB")},name:"expertDetail",components:{Header:a},props:{},data(){return{id:this.$route.query.id,uId:this.$route.query.uId,person:""}},mounted(){this.getPersonDetail()},methods:{getPersonDetail(){this.$axios.fetchPost("Mobile/user/homepage",{id:this.id,uId:this.uId}).then(r=>{r.data.code==0&&(this.person=r.data.data)})}}},c=r=>(f("data-v-09990713"),r=r(),u(),r),y={class:"expert_detail-container"},g={key:0,class:"avator-box"},k={class:"p1 f30"},x={key:1,class:"info-ul"},I={key:0},H=c(()=>s("div",{class:"left f22"},"\u64C5\u957F",-1)),D={class:"right f22"},S={key:1},B=c(()=>s("div",{class:"left f22 left2"},"\u6240\u5728\u5730",-1)),N={class:"right f22"},P={key:2},V=c(()=>s("div",{class:"left f22"},"\u5355\u4F4D",-1)),b={class:"right f22"},q={key:3},C=c(()=>s("div",{class:"left f22"},"\u804C\u79F0",-1)),j={class:"right f22"},w={key:4},E=c(()=>s("div",{class:"left f22"},"\u7B80\u4ECB",-1)),M={class:"right f22"},T={key:2,class:"info-ul"},z=c(()=>s("div",{class:"left"},"\u79CD\u690D\u4F5C\u7269",-1)),A={class:"right"};function F(r,G,J,K,e,L){const l=_("Header"),p=_("van-image");return t(),o("div",y,[d(l,{indexHeader:!1}),e.person.name||e.person.avatar?(t(),o("div",g,[d(p,{class:"avator",src:e.person.avatar,fit:"cover"},null,8,["src"]),s("p",k,n(e.person.name),1)])):i("v-if",!0),e.person.identity==1?(t(),o("ul",x,[e.person.skill?(t(),o("li",I,[H,s("div",D,n(e.person.skill),1)])):i("v-if",!0),e.person.residecity?(t(),o("li",S,[B,s("div",N,n(e.person.residecity),1)])):i("v-if",!0),e.person.company?(t(),o("li",P,[V,s("div",b,n(e.person.company),1)])):i("v-if",!0),e.person.position!=""?(t(),o("li",q,[C,s("div",j,n(e.person.position),1)])):i("v-if",!0),e.person.introduce!=""?(t(),o("li",w,[E,s("div",M,n(e.person.introduce),1)])):i("v-if",!0)])):i("v-if",!0),e.person.identity!=1?(t(),o("ul",T,[s("li",null,[z,s("div",A,n(e.person.forum),1)])])):i("v-if",!0)])}var Y=v(m,[["render",F],["__scopeId","data-v-09990713"]]);export{Y as default};
