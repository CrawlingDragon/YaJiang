import{H as a}from"./header.1705d6a2.js";import{c as d,e as c,h as r,j as n,k as e,t as i}from"./index.a3582b47.js";import{_}from"./plugin-vue_export-helper.21dcd24c.js";import"./fast_nav.a53c4cb6.js";const l={name:"videoDetail",components:{Header:a},props:{},data(){return{id:this.$route.query.id,detail:""}},computed:{},watch:{},mounted(){this.getDetail()},methods:{getDetail(){this.$axios.fetchPost("Mobile/Video/getVideoDetail",{id:this.id}).then(t=>{t.data.code==0&&(this.detail=t.data.data)})}}},p={class:"video_detail-container"},v={class:"video-box"},h=["src"],m={class:"title"},u={class:"text"};function f(t,x,g,D,o,H){const s=d("Header");return c(),r("div",p,[n(s,{indexHeader:!1}),e("div",v,[e("video",{src:o.detail.videourl,class:"video",controls:""},null,8,h)]),e("div",m,i(o.detail.title),1),e("div",u,i(o.detail.content),1)])}var $=_(l,[["render",f],["__scopeId","data-v-7a2067a5"]]);export{$ as default};
