(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["message"],{"3b9a":function(t,e,n){"use strict";var i=n("7a23");Object(i["K"])("data-v-699ed3b6");var a={class:"Message_item-container"},c={class:"t"},s={class:"time"};function o(t,e,n,o,d,u){var b=Object(i["P"])("van-image");return Object(i["H"])(),Object(i["j"])("div",a,[Object(i["k"])("div",c,Object(i["T"])(n.list.title),1),n.list.thumb&&""!=n.list.thumb?(Object(i["H"])(),Object(i["h"])(b,{key:0,class:"img",src:n.list.thumb,radius:"8px",fit:"cover"},null,8,["src"])):Object(i["i"])("",!0),Object(i["k"])("div",s,[Object(i["m"])(Object(i["T"])(n.list.inputtime)+" ",1),Object(i["ab"])(Object(i["k"])("span",null,Object(i["T"])(n.list.mpublic_name),513),[[i["X"],n.index]])])])}Object(i["I"])();var d={name:"Message_item",components:{},props:{list:{type:Object,default:function(){return{}}},index:{type:Boolean,default:!1}},data:function(){return{}},computed:{},watch:{},mounted:function(){},methods:{}},u=(n("f886"),n("d959")),b=n.n(u);const r=b()(d,[["render",o],["__scopeId","data-v-699ed3b6"]]);e["a"]=r},"8b24":function(t,e,n){},cfb5:function(t,e,n){"use strict";n("8b24")},f0c3:function(t,e,n){"use strict";n.r(e);var i=n("7a23");Object(i["K"])("data-v-4a1ed19e");var a={class:"message-container"},c={class:"message-ul"},s=["onClick"];function o(t,e,n,o,d,u){var b=Object(i["P"])("Header"),r=Object(i["P"])("MessageItem"),l=Object(i["P"])("van-list"),f=Object(i["P"])("Foot");return Object(i["H"])(),Object(i["j"])("div",a,[Object(i["n"])(b,{indexHeader:!1}),Object(i["k"])("ul",c,[Object(i["n"])(l,{loading:d.loading,"onUpdate:loading":e[0]||(e[0]=function(t){return d.loading=t}),finished:d.finished,"finished-text":"没有更多了",onLoad:u.onLoad},{default:Object(i["Z"])((function(){return[(Object(i["H"])(!0),Object(i["j"])(i["b"],null,Object(i["N"])(d.list,(function(t){return Object(i["H"])(),Object(i["j"])("li",{key:t.id,onClick:function(e){return u.goToMessageDetail(t.id,t.catid)}},[Object(i["n"])(r,{list:t,index:!0},null,8,["list"])],8,s)})),128))]})),_:1},8,["loading","finished","onLoad"])]),Object(i["n"])(f)])}Object(i["I"])();var d=n("5530"),u=(n("99af"),n("f392")),b=n("3b9a"),r=n("5502"),l=n("6751"),f=n("213a"),j={setup:function(){var t=Object(f["c"])({title:"资讯列表"}),e=t.meta;return{meta:e}},name:"message",components:{Header:u["a"],MessageItem:b["a"],Foot:l["a"]},props:{},data:function(){return{list:[],loading:!1,finished:!1,page:0}},computed:Object(d["a"])({},Object(r["e"])(["mid","initMid"])),created:function(){},watch:{},mounted:function(){this.meta.title="资讯列表"},methods:{onLoad:function(){this.getList()},getList:function(){var t=this;this.page+=1,this.$axios.fetchPost("/Mobile/News/index",{mId:this.initMid,page:this.page}).then((function(e){0==e.data.code?(t.loading=!1,t.list=t.list.concat(e.data.data),0==e.data.data.length&&(t.finished=!0)):201==e.data.code&&(t.finished=!0)}))},goToMessageDetail:function(t,e){this.$router.push({path:"/message_detail",query:{id:t,catid:e,from:"index"}})}}},O=(n("cfb5"),n("d959")),m=n.n(O);const g=m()(j,[["render",o],["__scopeId","data-v-4a1ed19e"]]);e["default"]=g},f701:function(t,e,n){},f886:function(t,e,n){"use strict";n("f701")}}]);
//# sourceMappingURL=message.af806265.js.map