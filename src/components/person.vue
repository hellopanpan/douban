<template>
	<DIV Class="person container-fuild">
		<div style="background:#eef;">
			<div class="container">
				<h2 style="margin-top:0"><span class="glyphicon glyphicon-bookmark"></span> 个人信息</h2>
			</div>
		</div>
		<div class="content container">
			<p class= "text-muted">用户名称：xpanpan</p>
			<p class= "text-muted">积分：<span style="color:blue;font-size:20px">{{count}}</span></p>
			<p class= "text-muted">信誉值：2000</p>
			<p class= "text-muted">排行：2000</p>
		</div>
		<slot name="per1"></slot>
	</div>

</template>
<style>
	.person{height:500px;width:100%;background:#fff;padding:0;}
	.person h2{padding:20px;color:#666;font-size:16px}
	.person p{padding:10px;text-align:left;padding-left:20px}
</style>
<script>
import {mapGetters,mapActions} from 'vuex'
export default{
	methods:mapActions(['increment']),
	computed:mapGetters(['count'])
}


</script>