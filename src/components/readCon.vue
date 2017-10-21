<template>
	<div >
		<search @getData="getdata" @load="loading" @loadend="loadend" :tag="tag"></search>
		<div class="container-fluid" style="background:#daf9f0;padding-top:20px">

			<div class="container" style="padding-bottom:40px;padding-top:20px">
				<div class="col-lg-2 col-md-12 col-sm-12 col-xs-12 " style="padding-bottom:20px">
				<h2 style="padding-top:0;margin-top:0px;font-family: Arial, Helvetica, sans-serif;">豆瓣读书</h2>
				</div>
				<div class="col-lg-10 col-md-12 col-sm-12" style="min-height:400px"  v-loading="loading2" element-loading-text="拼命加载中">
					<div class="col-md-12 " style="padding-bottom:20px"  >
						<el-breadcrumb separator="/" >
							<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
							<el-breadcrumb-item>豆瓣读书</el-breadcrumb-item>
							<el-breadcrumb-item>豆瓣搜索</el-breadcrumb-item>
						</el-breadcrumb>
					</div>
					<div class="col-xs-12 col-md-6 col-sm-6 col-lg-6 pb-10" v-for="(item,index) in data">

						<div class="" style="width:100%;border:1px solid #fff ;border-radius:2px;padding:10px;min-height:200px" >
							<div class="row">
								<div class="col-xs-4 ">
									<img :src="item.picsrc" style="width:100%">
								</div>
								<div class="col-xs-8">
									<h4 class="text-primary auto-hide" >{{item.title}}</h4>
									<p class="text-muted auto-hide" style="padding-left:5px">{{item.person}}</p>
									<p class="text-muted auto-hide2" style="padding-left:5px;font-size:10px">{{item.disc}}</p>
									<el-rate  v-if ="rateNum[index]" v-model="rateNum[index]"></el-rate>
									<h4 v-if ="!rateNum[index]"class="text-muted auto-hide" >暂无评论</h4>
								</div>
							</div>

						</div>
					</div>

					<div class="col-md-12" v-if="data.length == 0">
						<h2>data is loading ...</h2>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
    import Axios from 'axios'
    import Search from './search.vue'
	export default{
	    data(){
	        return{
	            value1: 3,
	            value2: true,
				data: '',
                loading2: false,
                rateNum: [],
                tag:"read"
			}
		},
		components:{
			Search
		},
		mounted(){
			this.getTimeData(); 
		},
		methods:{
			getdata(data){
				this.data = data;

			},
			loading(){
				this.loading2 = true;
				this.data = [];
			},
			loadend(){
				this.loading2 = false;
			},
		    getTimeData(){
		        var vm = this;
                vm.loading2 = true;
                Axios
					.get("/cross/douban/video/search")
					.then(function (res) {
					    vm.loading2 = false;
						vm.data =  res.data;
                        for(var i = 0;i< vm.data.length;i++){
                            vm.rateNum.push(Math.floor(vm.data[i].rate /10 * 5));
                        }
                	})
					.catch(function () {
						vm.loading2 = false;
                    })
			},
			toRate: function(value){
                return (value/10 * 5).toFixed(0);
			}
		}

	}
</script>

<style lang="less" scoped>
	@padding-size:10px;
	.pb-10{
		padding-bottom: @padding-size;
	}
	@media screen and (max-width: 608px) {
		.container {
			padding:0;
		}
		.col-xs-12{
			padding:0 0 10px 0;
		}
	}
	.auto-hide{
		overflow: hidden;
		word-break: keep-all;
		white-space: nowrap;
		text-overflow: ellipsis;
		max-width:100%;
		display: block;
	}
	.auto-hide2{
		overflow: hidden;
		text-overflow: ellipsis;
		max-width:100%;
		height:50px;
		display: block;
	}

</style>
