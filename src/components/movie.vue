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
			<div class="col-md-4 col-sm-4 col-xs-6 pb-10">
				<div class="" style="width:100%;border:1px solid #eee ;border-radius:2px;padding:10px">
					<img src="https://img3.doubanio.com/img/files/file-1505369246.jpg" style="width:100%">
					<p class="text-primary">觉知即新生——终止童年创伤的心理修复</p>
				</div>
			</div>
			<div class="col-md-4 col-sm-4 col-xs-6 pb-10">
				<div class="" style="width:100%;border:1px solid #eee ;border-radius:2px;padding:10px">
					<img src="https://img3.doubanio.com/img/files/file-1505369246.jpg" style="width:100%">
					<p class="text-primary">觉知即新生——终止童年创伤的心理修复</p>
				</div>
			</div>
			<div class="col-md-4 col-sm-4 col-xs-6 pb-10">
				<div class="" style="width:100%;border:1px solid #eee ;border-radius:2px;padding:10px">
					<img src="https://img3.doubanio.com/img/files/file-1505369246.jpg" style="width:100%">
					<p class="text-primary">觉知即新生——终止童年创伤的心理修复</p>
				</div>
			</div>
			<div class="col-md-4 col-sm-4 col-xs-6 pb-10">
				<div class="" style="width:100%;border:1px solid #eee ;border-radius:2px;padding:10px">
					<img src="https://img3.doubanio.com/img/files/file-1505369246.jpg" style="width:100%">
					<p class="text-primary">觉知即新生——终止童年创伤的心理修复</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
    export default{
        data(){
            return{

            }
        }
    }
</script>

<style lang="less">
	@padding-size:10px;
	.pb-10{
		padding-bottom: @padding-size;
	}

</style>