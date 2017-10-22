<template>
	<div class="container-fluid" style="background:#fff">
	<div class="container" style="padding-bottom:40px;padding-top:20px;">
		<div class="col-lg-2 col-md-12 col-sm-12 col-xs-12 " style="padding-bottom:20px">
		<h2 style="padding-top:0;margin-top:0px;font-family: Arial, Helvetica, sans-serif;">豆瓣時間</h2>
		</div>
		<div class="col-lg-10 col-md-12 col-sm-12" style="min-height:600px"  v-loading="loading2" element-loading-text="拼命加载中">
			<div class="col-md-12 " style="padding-bottom:20px"  >
				<el-breadcrumb separator="/" >
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>豆瓣時間</el-breadcrumb-item>
					<el-breadcrumb-item>热门专栏</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div class="col-lg-2 col-md-3 col-sm-4 col-xs-6 pb-10" v-for="item in data">
				<div class="" style="width:100%;height:100%;border:1px solid #fff ;border-radius:2px;padding:10px">
					<a :href="item.piclink"><img :src="item.picsrc" style="width:100%;max-height:70%"></a>
					<p class="text-primary" style="padding:10px 0;height:40px;overflow: hidden">{{item.title}}</p>
					<el-badge value="new" class="item">
						<el-button size="small">{{item.type}}</el-button>
					</el-badge>
				</div>
			</div>
			<div class="col-md-12" v-if="data.length == 0">
				<h2>No data</h2>
			</div>
		</div>
	</div>
	</div>
</template>
<script>
    import Axios from 'axios'
	export default{
	    data(){
	        return{
	            value2: true,
				data: '',
                loading2: false
			}
		},
		mounted(){
			this.getTimeData();
		},
		methods:{
		    getTimeData(){
		        var vm = this;
                vm.loading2 = true;
                Axios
					.get("/cross/douban/time")
					.then(function (res) {
					    vm.loading2 = false;
                    	 vm.data =  res.data;
                	})
					.catch(function () {
						vm.loading2 = false;
                    })
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
	}

</style>
