<template>
	<div class="homeShouye1">
		<el-row>
		  <el-col :span="12">

		  	<el-button>默认按钮</el-button>
			<el-button type="primary">主要按钮</el-button>
			<el-button type="text">文字按钮</el-button>
			<el-button :plain="true" :disabled="true">主要按钮</el-button>
			<el-button type="primary" :disabled="true">主要按钮</el-button>
			<el-button type="text" :disabled="true">文字按钮</el-button>
			<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>

			<el-select v-model="value2" placeholder="请选择">
			    <el-option
			      v-for="item in options2"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value"
			      :disabled="item.disabled">
				</el-option>
			</el-select>
			<h3>Cascader 级联选择器</h3>
			<div class="block">
			  <span class="demonstration">默认 click 触发子菜单</span>
			  <el-cascader
			    :options="options"
			    v-model="selectedOptions"
			    @change="handleChange">
			  </el-cascader>
			</div>
			<el-table
		    :data="tableData"
		    stripe
		    style="width: 100%">
		    <el-table-column
		      prop="date"
		      label="日期"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="name"
		      label="姓名"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="address"
		      label="地址">
		    </el-table-column>
		  </el-table>




	
		  </el-col>
		  <el-col :span="12"><div class="grid-content bg-purple-light">
		  	 <el-radio class="radio" v-model="radio" label="2" >备选项</el-radio>
  			<el-radio class="radio" v-model="radio" label="3">备选项</el-radio>
  			<el-checkbox v-model="checked">备选项</el-checkbox>
  			<el-input v-model="input" placeholder="请输入内容" icon="search" :on-icon-click="handleIconClick"></el-input>
  			{{radio}}

  			<el-switch
			  v-model="value1"
			  on-text="1"
			  off-text="2">
			</el-switch>
			<el-switch
			  v-model="value2"
			  on-color="#666"
			  off-color="#999">
			</el-switch>
			<div class="block">
			    <span class="demonstration">默认</span>
			    <el-slider v-model="value3" :step="10" show-stops></el-slider>
		  	</div>

		  	<el-time-select
			  v-model="value7"
			  :picker-options="{
			    start: '08:30',
			    step: '00:15',
			    end: '18:30'
			  }"
			  placeholder="选择时间">
			</el-time-select>
			{{value1}}
			<el-time-picker
			    v-model="value6"
			    :picker-options="{
			      selectableRange: '18:30:00 - 20:30:00'
			    }"
			    placeholder="任意时间点">
			  </el-time-picker>
			{{value4}}
			 <el-date-picker
		      v-model="value5"
		      type="date"
		      placeholder="选择日期"
		      :picker-options="pickerOptions0">
		    </el-date-picker>
		    <!-- date-picker-->
		    <el-date-picker
		      v-model="value5"
		      type="datetime"
		      placeholder="选择日期时间"
		      align="right"
		      :picker-options="pickerOptions1">
		    </el-date-picker>

		    <el-upload
			  class="upload-demo"
			  action="https://jsonplaceholder.typicode.com/posts/"
			  :on-preview="handlePreview"
			  :on-remove="handleRemove"
			  :file-list="fileList">
			  <el-button size="small" type="primary">点击上传</el-button>
			  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>
		
			 <el-rate
				  v-model="value5"
				   show-text
					:max="10"
				   :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
				   :texts="['1','2','3','4','5']"
				   :icon-classes="['el-icon-star-on', 'el-icon-star-on','el-icon-star-on']"
				>
			</el-rate>
			<el-color-picker v-model="color3" show-alpha></el-color-picker>{{color3}}
			<el-transfer v-model="value8" :data="data"></el-transfer>
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="活动名称">
				    <el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="活动时间">
				    <el-col :span="11">
				      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
				    </el-col>
				    <el-col class="line" :span="2">-</el-col>
				    <el-col :span="11">
				      <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
				    </el-col>
				     <el-form-item label="即时配送">
					    <el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
					  </el-form-item>
			  </el-form-item>
			</el-form>



		  </div></el-col>
		  

		</el-row>

		
	</div>
</template>
<script>
	
	export default{
		props:['totle'],
		data(){
			 const generateData = _ => {
		        const data = [];
		        for (let i = 1; i <= 15; i++) {
		          data.push({
		            key: i,
		            label: `备选项 ${ i }`,
		            disabled: i % 4 === 0
		          });
		        }
		        return data;
		     };
			return{
				tableData: [{
			          date: '2016-05-02',
			          name: '王小虎',
			          address: '上海市普陀区金沙江路 1518 弄'
			        }, {
			          date: '2016-05-04',
			          name: '王小虎',
			          address: '上海市普陀区金沙江路 1517 弄'
			        }, {
			          date: '2016-05-01',
			          name: '王小虎',
			          address: '上海市普陀区金沙江路 1519 弄'
			        }, {
			          date: '2016-05-03',
			          name: '王小虎',
			          address: '上海市普陀区金沙江路 1516 弄'
			        }],
				data: generateData(),
       			 value8: [1, 4],
				pickerOptions0:{
					disabledDate(time){
						return time.getTime()<Date.now()-8.64e7;
					}
				},	
				'msg':'首页一的内容',
				"ntotle": this.totle,
				pickerOptions1:{
					disabledDate(time){
						return time.getTime()<Date.now()-8.64e7;
					}
				},
				form:{
			          name: '',
			          region: '',
			          date1: '',
			          date2: '',
			          delivery: false,
			          type: [],
			          resource: '',
			          desc: ''
			        }
			    ,
				color3:"",
				value7:'',
				value6:'',
				value5:1,
				value4: new Date(2016, 9, 10, 18, 40),
				value2:"",
				radio:"2",
				checked:true,
				value3:2,
				input:"",
				num1:'1',
				fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
				value1:'',
				options2: [{
		          value: '选项1',
		          label: '黄金糕'
		        }, {
		          value: '选项2',
		          label: '双皮奶',
		          disabled: true
		        }, {
		          value: '选项3',
		          label: '蚵仔煎'
		        }, {
		          value: '选项4',
		          label: '龙须面'
		        }, {
		          value: '选项5',
		          label: '北京烤鸭'
		        }],
		        value2: '',
		        options: [{
		          value: 'zhinan',
		          label: '指南',
		          children: [{
		            value: 'shejiyuanze',
		            label: '设计原则',
		            children: [{
		              value: 'yizhi',
		              label: '一致'
		            }, {
		              value: 'fankui',
		              label: '反馈'
		            }, {
		              value: 'xiaolv',
		              label: '效率'
		            }, {
		              value: 'kekong',
		              label: '可控'
		            }]
		          }, {
		            value: 'daohang',
		            label: '导航',
		            children: [{
		              value: 'cexiangdaohang',
		              label: '侧向导航'
		            }, {
		              value: 'dingbudaohang',
		              label: '顶部导航'
		            }]
		          }]
		        }, {
		          value: 'zujian',
		          label: '组件',
		          children: [{
		            value: 'basic',
		            label: 'Basic',
		            children: [{
		              value: 'layout',
		              label: 'Layout 布局'
		            }, {
		              value: 'color',
		              label: 'Color 色彩'
		            }, {
		              value: 'typography',
		              label: 'Typography 字体'
		            }, {
		              value: 'icon',
		              label: 'Icon 图标'
		            }, {
		              value: 'button',
		              label: 'Button 按钮'
		            }]
		          }, {
		            value: 'form',
		            label: 'Form',
		            children: [{
		              value: 'radio',
		              label: 'Radio 单选框'
		            }, {
		              value: 'checkbox',
		              label: 'Checkbox 多选框'
		            }, {
		              value: 'input',
		              label: 'Input 输入框'
		            }, {
		              value: 'input-number',
		              label: 'InputNumber 计数器'
		            }, {
		              value: 'select',
		              label: 'Select 选择器'
		            }, {
		              value: 'cascader',
		              label: 'Cascader 级联选择器'
		            }, {
		              value: 'switch',
		              label: 'Switch 开关'
		            }, {
		              value: 'slider',
		              label: 'Slider 滑块'
		            }, {
		              value: 'time-picker',
		              label: 'TimePicker 时间选择器'
		            }, {
		              value: 'date-picker',
		              label: 'DatePicker 日期选择器'
		            }, {
		              value: 'datetime-picker',
		              label: 'DateTimePicker 日期时间选择器'
		            }, {
		              value: 'upload',
		              label: 'Upload 上传'
		            }, {
		              value: 'rate',
		              label: 'Rate 评分'
		            }, {
		              value: 'form',
		              label: 'Form 表单'
		            }]
		          }, {
		            value: 'data',
		            label: 'Data',
		            children: [{
		              value: 'table',
		              label: 'Table 表格'
		            }, {
		              value: 'tag',
		              label: 'Tag 标签'
		            }, {
		              value: 'progress',
		              label: 'Progress 进度条'
		            }, {
		              value: 'tree',
		              label: 'Tree 树形控件'
		            }, {
		              value: 'pagination',
		              label: 'Pagination 分页'
		            }, {
		              value: 'badge',
		              label: 'Badge 标记'
		            }]
		          }, {
		            value: 'notice',
		            label: 'Notice',
		            children: [{
		              value: 'alert',
		              label: 'Alert 警告'
		            }, {
		              value: 'loading',
		              label: 'Loading 加载'
		            }, {
		              value: 'message',
		              label: 'Message 消息提示'
		            }, {
		              value: 'message-box',
		              label: 'MessageBox 弹框'
		            }, {
		              value: 'notification',
		              label: 'Notification 通知'
		            }]
		          }, {
		            value: 'navigation',
		            label: 'Navigation',
		            children: [{
		              value: 'menu',
		              label: 'NavMenu 导航菜单'
		            }, {
		              value: 'tabs',
		              label: 'Tabs 标签页'
		            }, {
		              value: 'breadcrumb',
		              label: 'Breadcrumb 面包屑'
		            }, {
		              value: 'dropdown',
		              label: 'Dropdown 下拉菜单'
		            }, {
		              value: 'steps',
		              label: 'Steps 步骤条'
		            }]
		          }, {
		            value: 'others',
		            label: 'Others',
		            children: [{
		              value: 'dialog',
		              label: 'Dialog 对话框'
		            }, {
		              value: 'tooltip',
		              label: 'Tooltip 文字提示'
		            }, {
		              value: 'popover',
		              label: 'Popover 弹出框'
		            }, {
		              value: 'card',
		              label: 'Card 卡片'
		            }, {
		              value: 'carousel',
		              label: 'Carousel 走马灯'
		            }, {
		              value: 'collapse',
		              label: 'Collapse 折叠面板'
		            }]
		          }]
		        }, {
		          value: 'ziyuan',
		          label: '资源',
		          children: [{
		            value: 'axure',
		            label: 'Axure Components'
		          }, {
		            value: 'sketch',
		            label: 'Sketch Templates'
		          }, {
		            value: 'jiaohu',
		            label: '组件交互文档'
		          }]
		        }],
		        selectedOptions: [],
		        selectedOptions2: []
		    }
		},
		computed:{
				"computednum":function(){
					return this.totle+"homeshouye上计算";
				},
				
		},
		methods:{
			handleRemove(file, fileList) {
		        alert(file, fileList);
		      },
		      handlePreview(file) {
		        alert(file);
		      },
			pop(){
				$("#pop").popover();
			},
			handleIconClick(){
				alert();
			},
			handleChange(value){
				alert(value);
			}
		},
		mounted(){
			$("#pop").popover();
			$("a").tooltip({delay:{show:500,hide:1000},
				});
		}
	};

</script>
<style scoped lang="less">
@color:fff;
.widthWhole(){
	width:100%;height:100%;background:@color;
}
.homeShouye1{.widthWhole();box-sizing:border-box;padding-top:20px;}

</style>