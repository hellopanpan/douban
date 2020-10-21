<template>
    <div class="wraper">
		<div  >
		    <h2 style="padding-top:0;margin-top:0px;font-family: Arial, Helvetica, sans-serif;">豆瓣視频</h2>
		</div>
		<div  >
			<div style="padding-bottom:20px">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>豆瓣視频</el-breadcrumb-item>
					<el-breadcrumb-item>如是</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div class="content-wrap" v-if="data.length !== 0">
				<div class="content" v-for="item in data" v-bind:key="item.uri">
					<div style="position: relative;cursor:pointer" class="movie_hover"  @click="goUri(item.uri)">
						<img class="item" src="../assets/images/play.png" style="position: absolute;top:50%;left:50%;margin-left:-10px;margin-top:-12px">
						<img class='pic' :src="item.cover" >
					</div>
					<p class="pt-3 auto-title">{{item.title}}</p>
				</div>
			</div>
		</div>
	<el-dialog :title="dataV.title" :visible.sync="dialogTableVisible" :size="modalSize" v-if="dialogTableVisible">
		<div class="container-wrap" v-loading="loading_video">
			<div class="cont-play">
			<video :src="dataV.video" controls="controls" width="100%"></video>
			</div>
			<div  >
				{{dataV.introduction}}
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
                value2: true,
                data: [],
                loading2: false,
                dialogTableVisible: false,
				dataV: {},
                loading_video: false,
                clientWidth: '',
				timer: true
            }
        },
        mounted(){
            this.getTimeData();
            this.clientWidth = `${document.documentElement.clientWidth}`;
            // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
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
        methods:{
            getTimeData(){
                var vm = this;
                vm.loading2 = true;
                Axios
                    .get("/cross/douban/video")
                    .then(function (res) {
                        vm.loading2 = false;
                        vm.data =  res.data;
                        for(var i = 0 ;i< vm.data.length;i++){
                            for(var j= 0;j<vm.data[i].items.length;j++){
                                var str = vm.data[i].items[j].uri;
                                vm.data[i].items[j].uri = str.replace(/douban\:\/\/douban\.com/,"https://www.douban.com");
							}
						}
                    })
                    .catch(function () {
                        vm.loading2 = false;
                    })
            },
            findVideo:function (url) {

            },
            goUri(url){
                var vm = this;
                this.dialogTableVisible = true ;
                vm.loading_video = true;
                Axios
                    .post("/cross/douban/video/con",{ url: url })
                    .then(function (res) {
                        vm.dataV =  res.data;
                        vm.loading_video = false;
                    })
                    .catch(function () {
                        vm.loading2 = false;
                        vm.loading_video = false;
                    })
			},
			close(){
				alert();
			}
        }
    }
</script>

<style lang="less" scoped>
	@padding-size:10px;
	.pb-10{
		padding-bottom: @padding-size;
	}
	.pt-10{
		 padding-top: @padding-size;
	 }
	.item-con{
		height: 240rpx;
	}
  .wraper{
    padding: 20px 0;
  }
  .content-wrap{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
	.content{
    width: 300px;
    height: 220px;
    flex: 1;
    box-sizing: border-box;
    padding: 0 20px;
		.auto-title{
			font-size: 16px;
			font-weight: 500;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			margin-top: 20px;
			text-align: center;
      width: 100%;
		}
		.movie_hover{
      text-align: center;
		}
		.pic{
      width: 250px;
      height: 140px;
		}
	}
	.movie_hover:hover{
		opacity: 0.8;
		transition: 1s;
		.item{
			transform:scale(2,2);
			transition: 0.5s;
		}
	}

</style>