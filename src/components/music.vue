<template>
	<div class="music-wrap" style="background:#fff">
		<div class="" >
			<div >
			<h2 style="padding-top:0;margin-top:0px;font-family: Arial, Helvetica, sans-serif;">豆瓣音樂</h2>
			</div>
			<div  style="min-height:400px"  v-loading="loading2" element-loading-text="拼命加载中">
				<div class="col-md-12 " style="padding-bottom:20px"  >
					<el-breadcrumb separator="/" >
						<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
						<el-breadcrumb-item>豆瓣音樂</el-breadcrumb-item>
						<el-breadcrumb-item>豆瓣新碟榜</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
				<div class="music-cont-wrap" >
					<div class="music-cont-item" v-for = "(item, key) in data" v-bind:key="item.picsrc"  >
						<div class="music-cont-row">
							<div  >
								<a :href="item.piclink" target="_blank"><img :src="item.picIndex" ></a>
							</div>
							<div >
								<p class="text-title" >{{item.title}}</p>
								<p class="text-muted" style="padding-left:5px">{{item.person}}</p>
                <div class="star" size="mini"><el-rate v-model="rateNum[key]"></el-rate></div>
								
							</div>
						</div>
					</div>
				</div>
				<div v-if="data.length == 0">
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
            let douban = /douban/.test(location.href)
            let doustr = douban ? '/douban' : ''
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
  .music-cont-wrap{
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-bottom: 20px;
    .music-cont-item{
      width: 300px;
      margin: 10px 0;
      .music-cont-row{
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-align: center;
        img{
          height: 200px;
          width: 200px;
        }
        .text-title{
          padding-top: 10px;
          font-size: 16px;
          width:100%;
          color: #333;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
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

</style>
