<template>
	<div class="container-fluid" style="background:#fff;padding-top:20px">
		<div class="container" style="padding-bottom:40px;padding-top:20px">
			<div class="col-lg-2 col-md-12 col-sm-12 col-xs-12 " style="padding-bottom:20px">
			<h2 style="padding-top:0;margin-top:0px;font-family: Arial, Helvetica, sans-serif;">豆瓣音樂</h2>
			</div>
			<div class="col-lg-10 col-md-12 col-sm-12" style="min-height:400px"  v-loading="loading2" element-loading-text="拼命加载中">
				<div class="col-md-12 " style="padding-bottom:20px"  >
					<el-breadcrumb separator="/" >
						<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
						<el-breadcrumb-item>豆瓣音樂</el-breadcrumb-item>
						<el-breadcrumb-item>豆瓣新碟榜</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
				<div class="col-xs-6 col-md-4 col-sm-4 col-lg-4 pb-10" v-for = "(item, key) in data" v-bind:key="item.picsrc">
					<div class="music-cont" style="width:100%;border:1px solid #fff ;border-radius:2px;padding:10px" >
						<div class="row">
							<div class="col-xs-12 pic" >
								<a :href="item.piclink"><img :src="item.picsrc" ></a>
							</div>
							<div class="col-xs-12 flex-cen">
								<h4 class="text-primary" >{{item.title}}</h4>
								<p class="text-muted" style="padding-left:5px">{{item.person}}</p>
								<el-rate v-model="rateNum[key]"></el-rate>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-12" v-if="data.length == 0">
					<h2>No data</h2>
				</div>
			</div>
		</div>
		<el-dialog :visible.sync="dialogTableVisible" :size="modalSize" v-if="dialogTableVisible">
			<div class="container-fluid" >
				<div class="col-md-8 col-xs-12 ">
					<iframe :src="openSrc"></iframe>
				</div>
			</div>
		</el-dialog>
	</div>
</template>
<script>
    import Axios from 'axios'
	export default{
	    data(){
	        return{
	            value1: 3,
	            value2: true,
				data: '',
				loading2: false,
				dialogTableVisible: false,
				openSrc: '',
				clientWidth: '',
                rateNum: []
			}
		},
		computed: {
          	modalSize: function () {
                if(this.clientWidth < 768){
                    return "full"
                } else if(this.clientWidth < 1170){
				    return "large"
				} else{
				    return "small"
				}
            }
		},
		mounted(){
			this.clientWidth = `${document.documentElement.clientWidth}`;
			this.getTimeData();
		},
		methods:{
			openDialog(url) {
				this.dialogTableVisible = true;
				this.openSrc = url;
			},
		    getTimeData() {
		        var vm = this;
                vm.loading2 = true;
                Axios
					.get("/cross/douban/music")
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
			toRate(value) {
                return (value/10 * 5).toFixed(0);
			}
		},
		filters:{
		    torRate: function (value) {
				return (value/10 * 5).toFixed(0);
            }
		}


	}
</script>

<style lang="less" scoped>
	.flex-cen{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center;
	}
	@padding-size:10px;
	.pb-10{
		padding-bottom: @padding-size;
	}
	.music-cont{
		height: 260px;
		.pic{
			text-align: center;
		}
		img{
			width: 160px;
			height: 160px;
		}
		.text-primary{
			font-size: 17px;
			margin-top: 10px;
			width: 100%;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			text-align: center;
		}
		.text-muted{
			text-align: center;
		}
		.el-rate{
			margin: 0 auto;
		}
	}
	@media screen and (max-width: 608px) {
		.container {

			padding:0;

		}
	}

</style>
