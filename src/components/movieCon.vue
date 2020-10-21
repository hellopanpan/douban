<template>
	<div >
		<search @getData="getdata" @load="loading" @loadend="loadend" :tag="tag" :num="dataNum" @clickit="clickit"  v-show="showSearch" :name="tagname" :inputname ="alldata"></search>
		<div class="" style="padding-top:20px">

			<div class="" style="padding-bottom:0px;padding-top:20px">
				<div class="col-lg-12 col-md-12 col-sm-12" style="min-height:400px"  v-loading="loading2" element-loading-text="拼命加载中">
					<div class="col-md-12 " style="padding-bottom:20px"  >
						<el-breadcrumb separator="/" >
							<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
							<el-breadcrumb-item>豆瓣电影</el-breadcrumb-item>
							<el-breadcrumb-item>豆瓣搜索</el-breadcrumb-item>
						</el-breadcrumb>
					</div>
					<div class="col-xs-12 col-md-6 col-sm-6 col-lg-6 pb-10" v-for="(item,index) in dataTrue" :key="item.picsrc">

						<div class="" style="width:100%;border:1px solid #fff ;border-radius:2px;padding:10px;min-height:200px" >
							<div class="row">
								<div class="col-xs-4">
									<img :src="item.picsrc" style="width:100%">
								</div>
								<div class="col-xs-8">
									<h4 class="text-primary auto-hide" >{{item.title}}</h4>
									<p class="text-muted auto-hide" style="padding-left:5px">{{item.person}}</p>
									<p class="text-muted auto-hide2" style="padding-left:5px;font-size:10px">{{item.disc}}</p>
									<el-rate  v-if ="rateNum[index]" v-model="rateNum[index]"></el-rate>
									<p v-if ="!rateNum[index]" class="text-muted auto-hide" >暂无评论</p>
								</div>
							</div>

						</div>
					</div>

					<div class="col-md-12" v-if="dataTrue.length == 0">
						<p class="text-muted" style="padding:30px 0"> 在上方输入框键入关键词，开始搜索</p>
					</div>
				</div>
			</div>
			<div class= "container" v-loading="loading1" v-if="yesmore">
				<div class="col-xs-8 col-md-8 " style="" @click="loadMore">
          <div style="text-align:center;padding:10px;border:1px solid #eee;margin:10px;border-radius:5px;cursor:pointer;;margin-bottom:30px;background:#eee">
            <i class="el-icon-caret-bottom"></i>
					  <span class="text-muted" style="">Load More</span>
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
				data: [],
                loading2: false,
                loading1: false,
                rateNum: [],
                tag:"movie",
                dataTrue:[],
                dataNum:0,
                yesmore: true
			}
		},
		props:{
			tagname:{
				default: "",
				type:String
			},
			alldata:{
				default: "",
				type:String
			}
		},
		computed:{
			showSearch:function(){
				if(this.tagname == "home"){
					return false;
				}else{
					return true ;
				}
			}
		},
		components:{
			Search
		},
		mounted(){
			//this.getdata(); 
		},
		methods:{
			getdata(data){
				this.data = data;
				var vm = this;
				vm.dataTrue=vm.dataTrue.concat(vm.data);

			},
			loading(){
				if(this.dataNum == 0){
					this.loading2 = true;
				}else{
					this.loading1 = true;
				}
				
				this.data = [];
				
			},
			loadend(){
				if(this.dataNum == 0){
					this.loading2 = false;
				}else{
					this.loading1 = false;
				};
				if(this.data.length > 0){
					this.$notify({
			          title: 'success',
			          message: 'data is successfully loading',
			          type: 'success',
			          duration: 1000
			        });
				}else if(this.dataNum !== 0){
					this.yesmore = false; 
					this.$notify.error({
			          title: 'error',
			          message: ' data is not successfully loaded',
			          duration: 1000
			        });
				}
			},
			loadMore(){
				this.dataNum += 20;
			},
			toRate: function(value){
                return (value/10 * 5).toFixed(0);
			},
			clickit(){
				this.dataTrue=[];
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
