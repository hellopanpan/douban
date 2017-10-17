<template>
	<DIV Class="person">
		<h2><span class="glyphicon glyphicon-bookmark"></span>    个人信息</h2>
		<div class="content">
			<p>用户名称：xpanpan</p>
			<p>积分：<span style="color:blue;font-size:20px">{{count}}</span></p>
			<p>信誉值：2000</p>
			<p>排行：2000</p>
		</div>
		<slot name="per1"></slot>
	</div>

</template>
<style>
	.person{height:90%;width:100%;background:#fff;padding:0}
	.person h2{padding:20px;color:#666;background:#eef;font-size:16px}
	.person p{padding:10px;text-align:left;padding-left:100px}
</style>
<script>
import {mapGetters,mapActions} from 'vuex'
export default{
	methods:mapActions(['increment']),
	computed:mapGetters(['count'])
}


</script>