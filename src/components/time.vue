<template>
	<div class="" style="background:#fff">
	<div class="" >
		<div style="padding-bottom:20px">
		<h2 style="padding-top:0;margin-top:0px;font-family: Arial, Helvetica, sans-serif;">豆瓣時間</h2>
		</div>
		<div class="" style="min-height:600px"  v-loading="loading2" element-loading-text="拼命加载中">
			<div class="col-md-12 " style="padding-bottom:20px"  >
				<el-breadcrumb separator="/" >
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>豆瓣時間</el-breadcrumb-item>
					<el-breadcrumb-item>热门专栏</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div class="time-wrap" >
				<div class="time-item" v-for="(item, index) in data" v-bind:key="item.picsrc">
					<a :href="item.piclink" target="_blank"><img class="time-pic"  :src="item.picsrc" ></a>
					<p class="text-pri" >{{item.title}}</p>
					<el-badge :value="index%3 ? 'new' : 'hot'" class="item-bage">
					</el-badge>
				</div>
			</div>
			<div class="" v-if="data.length == 0">
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
  .time-wrap{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
  }
  .time-item{
    width: 220px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    padding: 20px;
    .time-pic{
      height: 180px;
      width: 135px
    };
    .item-bage{
      position: absolute;
      right: 26px;
      top: 20px;
      color: #fff
    }
  }
	.time{
		text-align: center;
		padding-bottom: 20px;
		img{
			width: 150px;
			height: 150*1.4px;
		}
		
  }
  .text-pri{
    width: 100%;
    font-size: 16px;
    font-weight: 500;
    margin-top: 10px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-align: center;
  }

</style>
