<template>
	<div class="container-fluid" style="background:#f7f7f7;padding-top:20px">
	<div class="container" style="padding-bottom:40px">
		<div class="col-lg-2 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:20px">
			<h2 style="padding-top:0;margin-top:0px;font-family: Arial, Helvetica, sans-serif;">豆瓣視频</h2>
		</div>
		<div class="col-lg-10 col-md-12 col-sm-12" v-if="data.length !== 0">
			<div class="col-md-12 " style="padding-bottom:20px">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>豆瓣視频</el-breadcrumb-item>
					<el-breadcrumb-item>如是</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div class=" col-md-4 col-md-4 col-sm-6 col-xs-6 pb-10" v-for="item in data[0].items">
				<div class="" style="width:100%;border:1px solid #eee ;border-radius:2px;padding:10px" >
					<div style="position: relative;cursor:pointer" @click="goUri(item.uri)" class="movie_hover">
						<img src="../assets/images/play.png" style="position: absolute;top:50%;left:50%;margin-left:-10px;margin-top:-12px" class="item">
						<img :src="item.cover" style="width:100%;" >
					</div>
					<p class="text-primary pt-10 auto-hide02">{{item.title}}</p>
				</div>
			</div>
			<div class="col-md-4 col-md-4 col-sm-6 col-xs-6 pb-10" v-for="item in data[1].items">
				<div class="" style="width:100%;border:1px solid #eee ;border-radius:2px;padding:10px" >
					<div style="position: relative;cursor:pointer" class="movie_hover"  @click="goUri(item.uri)">
						<img class="item" src="../assets/images/play.png" style="position: absolute;top:50%;left:50%;margin-left:-10px;margin-top:-12px">
						<img :src="item.cover" style="width:100%;">
					</div>
					<p class="text-primary pt-10 auto-hide02">{{item.title}}</p>
				</div>
			</div>
		</div>
	</div>
	<el-dialog title="收货地址" :visible.sync="dialogTableVisible">
		<el-table >
			<el-table-column property="date" label="日期" width="150"></el-table-column>
			<el-table-column property="name" label="姓名" width="200"></el-table-column>
			<el-table-column property="address" label="地址"></el-table-column>
		</el-table>
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
                dialogTableVisible: false
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
                Axios
                    .post("/cross/douban/video/con",{ url: url })
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
	.pt-10{
		 padding-top: @padding-size;
	 }
	.auto-hide02{
		overflow: hidden;
		height:40px;
		text-overflow: ellipsis;
		max-width:100%;
		display: inline-block;
	}
	@media screen and (max-width: 608px) {
		.container {
			padding:0;
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