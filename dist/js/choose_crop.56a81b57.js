(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["choose_crop"],{6795:function(t,e,c){},"6cd7":function(t,e,c){"use strict";c.r(e);c("b0c0");var n=c("7a23");Object(n["K"])("data-v-547e0cb6");var o={class:"choose_crop-container",id:"wrap"},i={action:"/",class:"from"},s={key:0,class:"history-box",ref:"historyRef"},a={class:"title"},r={class:"history-ul"},l=Object(n["k"])("div",{class:"small-title"},"最近选择/全部作物",-1),u=["onClick"],h={class:"search_result-ul"},b={class:"noData"},j=Object(n["m"])(" 抱歉没有该作物,可选择"),d=["onClick"];function O(t,e,c,O,f,p){var v=Object(n["P"])("van-search"),k=Object(n["P"])("van-index-anchor"),m=Object(n["P"])("van-cell"),R=Object(n["P"])("van-index-bar");return Object(n["H"])(),Object(n["j"])("div",o,[Object(n["k"])("form",i,[Object(n["n"])(v,{modelValue:f.value,"onUpdate:modelValue":[e[0]||(e[0]=function(t){return f.value=t}),p.onSearch],"show-action":"",placeholder:"请输入作物名",onSearch:p.onSearch,onCancel:p.onCancel,clearable:""},null,8,["modelValue","onSearch","onCancel","onUpdate:modelValue"])]),f.hispitalList?(Object(n["H"])(),Object(n["j"])("div",s,[Object(n["k"])("div",a,"当前选择："+Object(n["T"])(f.cropName),1),Object(n["ab"])(Object(n["k"])("div",r,[l,(Object(n["H"])(!0),Object(n["j"])(n["b"],null,Object(n["N"])(f.hispitalList,(function(t){return Object(n["H"])(),Object(n["j"])("li",{key:t.fid,onClick:function(e){return p.choose(t)}},Object(n["T"])(t.name),9,u)})),128))],512),[[n["X"],0!=f.hispitalList.length]])],512)):Object(n["i"])("",!0),f.searchResultShow?Object(n["i"])("",!0):(Object(n["H"])(),Object(n["h"])(R,{key:1,class:"bar","index-list":p.letterList,style:Object(n["z"])({top:f.barTop+"px"})},{default:Object(n["Z"])((function(){return[(Object(n["H"])(!0),Object(n["j"])(n["b"],null,Object(n["N"])(f.list,(function(t){return Object(n["H"])(),Object(n["j"])("div",{key:t.id},[Object(n["n"])(k,{index:t.letter},null,8,["index"]),(Object(n["H"])(!0),Object(n["j"])(n["b"],null,Object(n["N"])(t.index,(function(t){return Object(n["H"])(),Object(n["h"])(m,{title:t.name,key:t.fid,onClick:function(e){return p.choose(t)}},null,8,["title","onClick"])})),128))])})),128))]})),_:1},8,["index-list","style"])),Object(n["ab"])(Object(n["k"])("ul",h,[Object(n["ab"])(Object(n["k"])("div",b,[j,Object(n["k"])("span",{class:"other",onClick:e[1]||(e[1]=function(t){return p.choose({name:"其他",fid:195})})},"其他")],512),[[n["X"],f.noResult]]),(Object(n["H"])(!0),Object(n["j"])(n["b"],null,Object(n["N"])(f.searchResult,(function(t){return Object(n["H"])(),Object(n["j"])("li",{key:t.fid,onClick:function(e){return p.choose(t)}},Object(n["T"])(t.name),9,d)})),128))],512),[[n["X"],f.searchResultShow]])])}Object(n["I"])();var f=c("5530"),p=(c("159b"),c("99af"),c("5502")),v={name:"askChooseCrop",metaInfo:{title:"选择作物"},components:{},props:{},data:function(){return{value:"",list:[],hispitalList:[],cropName:this.$route.query.crop,searchResult:[],searchResultShow:!1,noResult:!1,barTop:54}},created:function(){},computed:Object(f["a"])(Object(f["a"])({},Object(p["e"])(["uId"])),{},{letterList:function(){var t=[];return this.list.forEach((function(e){t.push(e.letter)})),t},crops:function(){var t=[];return this.list.forEach((function(e){t=t.concat(e.index)})),t}}),watch:{searchResult:function(t){0==t.length?this.noResult=!0:this.noResult=!1}},mounted:function(){this.getCropList()},methods:{onSearch:function(t){var e=this;this.searchResult=[],this.crops.forEach((function(c){c.name.indexOf(t)>=0&&e.searchResult.push(c)})),this.searchResultShow=!0,""==t&&(this.searchResultShow=!1)},choose:function(t){this.$router.go(-1),this.$emit("getCrop",t),this.searchResultShow=!1},onCancel:function(){this.$router.go(-1),this.searchResultShow=!1},getCropList:function(){var t=this;this.$axios.fetchPost("Mobile/Mpublic/getCropIndexQuery",{uId:this.uId}).then((function(e){0==e.data.code&&(t.hispitalList=e.data.historydata,t.$nextTick((function(){t.computedBarTop(),t.list=e.data.data})))}))},computedBarTop:function(){var t=this.$refs.historyRef.getBoundingClientRect().height;console.log("h",t),this.barTop=t>0?t+54:54}}},k=(c("ab03"),c("d959")),m=c.n(k);const R=m()(v,[["render",O],["__scopeId","data-v-547e0cb6"]]);e["default"]=R},ab03:function(t,e,c){"use strict";c("6795")}}]);
//# sourceMappingURL=choose_crop.56a81b57.js.map