webpackJsonp([2],{144:function(t,a,e){function i(t){e(156)}var d=e(5)(e(149),e(153),i,"data-v-6ead0f6c",null);t.exports=d.exports},149:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=e(10),d=(e.n(i),e(146)),s=e.n(d);a.default={data:function(){return{value1:3,value2:!0,data:[],loading2:!1,loading1:!1,rateNum:[],tag:"read",dataTrue:[],dataNum:0,yesmore:!0}},props:{tagname:{default:"",type:String},alldata:{default:"",type:String}},computed:{showSearch:function(){return"home"!=this.tagname}},components:{Search:s.a},mounted:function(){},methods:{getdata:function(t){this.data=t;var a=this;a.dataTrue=a.dataTrue.concat(a.data)},loading:function(){0==this.dataNum?this.loading2=!0:this.loading1=!0,this.data=[]},loadend:function(){0==this.dataNum?this.loading2=!1:this.loading1=!1,this.data.length>0?this.$notify({title:"success",message:"data is successfully loading",type:"success",duration:1e3}):0!==this.dataNum&&(this.yesmore=!1,this.$notify.error({title:"error",message:"data is not successfully loaded",duration:1e3}))},loadMore:function(){this.dataNum+=20},toRate:function(t){return(t/10*5).toFixed(0)},clickit:function(){this.dataTrue=[]}}}},150:function(t,a,e){a=t.exports=e(7)(),a.push([t.i,".pb-10[data-v-6ead0f6c]{padding-bottom:10px}@media screen and (max-width:608px){.container[data-v-6ead0f6c]{padding:0}.col-xs-12[data-v-6ead0f6c]{padding:0 0 10px}}.auto-hide[data-v-6ead0f6c]{word-break:keep-all;white-space:nowrap}.auto-hide2[data-v-6ead0f6c],.auto-hide[data-v-6ead0f6c]{overflow:hidden;text-overflow:ellipsis;max-width:100%;display:block}.auto-hide2[data-v-6ead0f6c]{height:50px}",""])},153:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("search",{directives:[{name:"show",rawName:"v-show",value:t.showSearch,expression:"showSearch"}],attrs:{tag:t.tag,num:t.dataNum,name:t.tagname,inputname:t.alldata},on:{getData:t.getdata,load:t.loading,loadend:t.loadend,clickit:t.clickit}}),t._v(" "),e("div",{staticStyle:{"padding-top":"20px"}},[e("div",{staticStyle:{"padding-bottom":"0px","padding-top":"20px"}},[e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading2,expression:"loading2"}],staticStyle:{"min-height":"400px"},attrs:{"element-loading-text":"拼命加载中"}},[e("div",{staticClass:"col-md-12 ",staticStyle:{"padding-bottom":"20px"}},[e("el-breadcrumb",{attrs:{separator:"/"}},[e("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("首页")]),t._v(" "),e("el-breadcrumb-item",[t._v("豆瓣读书")]),t._v(" "),e("el-breadcrumb-item",[t._v("豆瓣搜索")])],1)],1),t._v(" "),t._l(t.dataTrue,function(a,i){return e("div",{key:a.picsrc,staticClass:"col-xs-6 col-md-6 col-sm-6 col-lg-6 "},[e("div",{staticStyle:{width:"100%",border:"1px solid #fff","border-radius":"2px",padding:"10px","min-height":"200px"}},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-xs-4 "},[e("img",{staticStyle:{width:"100%"},attrs:{src:a.picsrc}})]),t._v(" "),e("div",{staticClass:"col-xs-8"},[e("h4",{staticClass:"text-primary auto-hide"},[t._v(t._s(a.title))]),t._v(" "),e("p",{staticClass:"text-muted auto-hide",staticStyle:{"padding-left":"5px"}},[t._v(t._s(a.person))]),t._v(" "),e("p",{staticClass:"text-muted auto-hide2",staticStyle:{"padding-left":"5px","font-size":"10px"}},[t._v(t._s(a.disc))]),t._v(" "),t.rateNum[i]?e("el-rate",{model:{value:t.rateNum[i],callback:function(a){var e=t.rateNum,d=i;Array.isArray(e)?e.splice(d,1,a):t.rateNum[i]=a},expression:"rateNum[index]"}}):t._e(),t._v(" "),t.rateNum[i]?t._e():e("p",{staticClass:"text-muted auto-hide"},[t._v("暂无评论")])],1)])])])}),t._v(" "),0==t.dataTrue.length?e("div",{staticClass:"col-md-12"},[e("p",{staticClass:"text-muted",staticStyle:{padding:"30px 0"}},[t._v(" 在上方输入框键入关键词，开始搜索")])]):t._e()],2)]),t._v(" "),t.yesmore?e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading1,expression:"loading1"}],staticClass:"container"},[e("div",{staticClass:"col-xs-8 col-md-8 ",on:{click:t.loadMore}},[t._m(0)])]):t._e()])],1)},staticRenderFns:[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticStyle:{"text-align":"center",padding:"10px",border:"1px solid #eee",margin:"10px","border-radius":"5px",cursor:"pointer","margin-bottom":"30px",background:"#eee"}},[e("i",{staticClass:"el-icon-caret-bottom"}),t._v(" "),e("span",{staticClass:"text-muted"},[t._v("Load More")])])}]}},156:function(t,a,e){var i=e(150);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e(20)("fdf4b958",i,!0)}});