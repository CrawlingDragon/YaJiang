import{d as v,a as h,u as _,c as f,e as i,h as l,v as n,k as t,j as x,t as s,C as u,D as c,n as g,F as y}from"./index.3518e5b0.js";import{_ as B}from"./plugin-vue_export-helper.21dcd24c.js";const p={class:"p1 f22"},w={class:"p2"},k={class:"number"},C={key:0,class:"expert"},F={class:"line"},A={class:"line",style:{"margin-left":"10px"}},S={key:2,class:"online"},z=v({props:{list:{type:Object,required:!0}},setup(e){const a=e,o=h(),m=_();function r(){o.commit("setMid",a.list.mid),o.commit("setHospitalName",a.list.title),o.commit("setHospitalIsStore",a.list.isstore),m.push({path:"/hospital"})}return(D,E)=>{const d=f("van-image");return i(),l(y,null,[n(" \u9996\u9875\u63A8\u8350\u533B\u9662\u5217\u8868 "),t("div",{class:"recommend-hospital-wrap",onClick:r},[x(d,{src:e.list.logo,fit:"cover",class:"image","lazy-load":""},null,8,["src"]),t("p",p,s(e.list.title),1),t("p",w,s(e.list.level)+"\xB7"+s(e.list.issort),1),u(t("p",{class:"p3"},"\u79D1\u5BA4\uFF1A"+s(e.list.zuowu),513),[[c,e.list.zuowu!="\u6682\u672A\u8BBE\u7F6E"]]),t("div",k,[e.list.num_expert!=0?(i(),l("div",C,"\u4E13\u5BB6 "+s(e.list.num_expert),1)):n("v-if",!0),u(t("div",F,"|",512),[[c,e.list.num_expert!=0&&e.list.num_chufang!=0]]),e.list.num_chufang!=0?(i(),l("div",{key:1,class:"online",style:g({"margin-left":e.list.num_expert==0?"0px":"10px"})}," \u5904\u65B9 "+s(e.list.num_chufang),5)):n("v-if",!0),u(t("div",A," | ",512),[[c,e.list.num_wen!=0&&e.list.isstore==0]]),e.list.num_wen!=0&&e.list.isstore==0?(i(),l("div",S," \u7F51\u8BCA "+s(e.list.num_wen),1)):n("v-if",!0)])])],2112)}}});var I=B(z,[["__scopeId","data-v-fd460022"]]);export{I as R};
