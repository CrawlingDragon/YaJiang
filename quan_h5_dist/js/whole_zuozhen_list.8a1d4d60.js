(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["whole_zuozhen_list"],{"3ba4":function(t,e,c){"use strict";c("cd92")},"3e2a":function(t,e,c){"use strict";c.r(e);var n=c("7a23");Object(n["K"])("data-v-bc66ca5c");var i={class:"zuozhen_list-container"},a={key:0},o=["onClick"],s={class:"p1"},b={class:"p2"},d={class:"hospital"};function u(t,e,c,u,j,O){var r=Object(n["P"])("Header"),l=Object(n["P"])("van-empty");return Object(n["H"])(),Object(n["j"])("div",i,[Object(n["n"])(r,{indexHeader:!1}),j.noData?Object(n["i"])("",!0):(Object(n["H"])(),Object(n["j"])("ul",a,[(Object(n["H"])(!0),Object(n["j"])(n["b"],null,Object(n["N"])(j.list,(function(t){return Object(n["H"])(),Object(n["j"])("li",{key:t.id,onClick:function(e){return O.goToDetail(t.id)}},[Object(n["k"])("p",s,Object(n["T"])(t.title),1),Object(n["k"])("p",b,[Object(n["m"])(Object(n["T"])(t.showtime),1),Object(n["k"])("span",d,Object(n["T"])(t.mpublic),1)])],8,o)})),128))])),j.noData?(Object(n["H"])(),Object(n["h"])(l,{key:1,description:"暂无医院就诊记录"})):Object(n["i"])("",!0)])}Object(n["I"])();var j=c("5530"),O=c("f392"),r=c("5502"),l=c("213a"),h={setup:function(){Object(l["c"])({title:"我的坐诊巡诊"})},name:"wholeZuoZhenList",components:{Header:O["a"]},props:{},data:function(){return{list:[],noData:!1}},computed:Object(j["a"])({},Object(r["e"])(["uId","initMid"])),watch:{},created:function(){},mounted:function(){this.getOnlineList()},methods:{getOnlineList:function(){var t=this;this.noData=!1,this.$axios.fetchPost("/Mobile/Treatment/getWenzhen",{uId:this.uId,mId:this.initMid}).then((function(e){0==e.data.code?t.list=e.data.data:201==e.data.code&&(t.noData=!0)}))},goToDetail:function(t){this.$router.push({path:"/zuozhen_detail",query:{id:t}})}}},p=(c("3ba4"),c("d959")),f=c.n(p);const m=f()(h,[["render",u],["__scopeId","data-v-bc66ca5c"]]);e["default"]=m},cd92:function(t,e,c){}}]);
//# sourceMappingURL=whole_zuozhen_list.8a1d4d60.js.map