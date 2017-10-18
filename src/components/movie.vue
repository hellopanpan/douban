<template>	
	<div class="container" style="padding-bottom:40px">
		<div class="col-lg-2 col-md-12 col-sm-12 col-xs-12">
		<h2 style="padding-top:0;margin-top:0px;font-family: Arial, Helvetica, sans-serif;">豆瓣視频</h2>
		</div>
		<div class="col-lg-10 col-md-12 col-sm-12">
			<div class="col-md-12 " style="padding-bottom:20px">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>豆瓣視频</el-breadcrumb-item>
					<el-breadcrumb-item>如是</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div class="col-md-4 col-sm-6 col-xs-6 pb-10" v-for="item in data[0].items">
				<div class="" style="width:100%;border:1px solid #eee ;border-radius:2px;padding:10px" >
					<div style="background: url(https://img3.doubanio.com/img/files/file-1505369246.jpg) no-repeat;background-size:cover;width:100%;position: relative" class="">
						<img src="../assets/images/play.png" style="position: absolute;top:50%;left:50%;margin-left:-10px;margin-top:-12px">
						<img src="https://img3.doubanio.com/img/files/file-1505369246.jpg" style="width:100%;opacity: 0;">
					</div>
					<p class="text-primary pt-10 ">{{item.title}}</p>
				</div>
			</div>
			<div class="col-md-4 col-sm-6 col-xs-6 pb-10" v-for="item in data[1].items">
				<div class="" style="width:100%;border:1px solid #eee ;border-radius:2px;padding:10px" >
					<div style="background: url(https://img3.doubanio.com/img/files/file-1505369246.jpg) no-repeat;background-size:cover;width:100%;position: relative" class="">
						<img src="../assets/images/play.png" style="position: absolute;top:50%;left:50%;margin-left:-10px;margin-top:-12px">
						<img src="https://img3.doubanio.com/img/files/file-1505369246.jpg" style="width:100%;opacity: 0;">
					</div>
					<p class="text-primary pt-10 ">{{item.title}}</p>
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
                loading2: false,
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
                    })
                    .catch(function () {
                        vm.loading2 = false;
                    })
            }
        }
    }
</script>

<style lang="less">
	@padding-size:10px;
	.pb-10{
		padding-bottom: @padding-size;
	}
	.pt-10{
		 padding-top: @padding-size;
	 }
	.auto-hide{
		overflow: hidden;
		word-break: keep-all;
		white-space: nowrap;
		text-overflow: ellipsis;
		max-width:100%;
		display: inline-block;
	}
	@media screen and (max-width: 608px) {
		.container {
			padding:0;
		}
	}

</style>