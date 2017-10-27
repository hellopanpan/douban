<template>
	<DIV Class="person container-fuild">
		<div style="background:#eef;">
			<div class="container">
				<h2 style="margin-top:0"><span class="glyphicon glyphicon-bookmark"></span> 个人Demo</h2>
			</div>
		</div>
		<div class="content container"style="padding-top:20px">
			<el-table v-for="(item,index) in tableData "
		      :data="item"
		      style="width: 100%"
		      :show-header="index == 0">
		      <el-table-column
		        prop="date"
		        label="Date"
		        width="180">
		      </el-table-column>
		      <el-table-column
		        prop="name"
		        label="Demo"
		        width="180">
		      </el-table-column>
		      <el-table-column
		        prop="address"
		        label="site">
		      </el-table-column>
		      <el-table-column v-if="showState"
		        label="rate">
		        <template scope="scope">
			     	<el-rate v-model="item[0].state"></el-rate>
			    </template>
		      </el-table-column>
		    </el-table>

			
		</div>
	</div>

</template>
<style>
	.person{height:700px;width:100%;background:#fff;padding:0;}
	.person h2{padding:20px;color:#666;font-size:16px}
	.person p{padding:10px;text-align:left;padding-left:20px}
</style>
<script>
import {mapGetters,mapActions} from 'vuex'
export default{
	data(){
		return {
			tableData: [[{
	            date: '2016-7',
	            name: '简历Demo',
	            address: 'http://www.xpanpan.com',
	            state: 3
	          }],
	          [{
	            date: '2016-8',
	            name: 'Panpan之家',
	            address: 'http://www.xpanpan.com/xpanpan7',
	            state: 3
	          }],
	          [{
	            date: '2016-9',
	            name: 'Wechat聊天室',
	            address: 'http://github.com/hellopanpan/WeChat',
	            state: 2
	          }],
	          [{
	            date: '2016-5',
	            name: 'qq浏览器demo',
	            address: 'http://www.xpanpan.com/xpanpan4',
	            state: 2
	          }],
	          [{
	            date: '2016-3',
	            name: '商城demo',
	            address: 'http://www.xpanpan.com/xpanpan1',
	            state: 1
	          }],
	          [{
	            date: '2016-4',
	            name: '小米5demo',
	            address: 'http://www.xpanpan.com/xpanpan2',
	            state: 2
	          }],
	          [{
	            date: '2016-5',
	            name: '百度云demo',
	            address: 'http://www.xpanpan.com/xpanpan5',
	            state: 2
	          }],
	         ],
	         value1:1,
	         clientWidth: 100,
	         timer: true
		}
	},
	mounted(){
		this.clientWidth = `${document.documentElement.clientWidth}`;
        const that = this;
        window.onresize = function temp() {
            if(that.timer){
                that.timer = false;
                setTimeout(function () {
                    that.clientWidth = `${document.documentElement.clientWidth}`;
                    that.timer = true;
                },500)
			}
        };
	},
	methods:mapActions(['increment']),
	computed:{
		...mapGetters(['count']),
		showState:function(){
			if(this.clientWidth > 1000){
				return true;
			}else {
				return false;
			}
		}
	}
}


</script>