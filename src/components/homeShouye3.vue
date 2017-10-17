<template>
	<div class="homeShouye3">
		<h3 @click="increment">首页3vuex的数据count</h3>
		<button  class="btn btn-default" @click="increment">首页3可点击增加vuex的数字</button>
		<button  class="btn btn-default" @click="decrement">首页3可点击减少vuex的数字</button>
		<p style="color:blue;font-size:20px">[{{count}}]</p>
	</div>
</template>
<style>
	.homeShouye3{width:100%;height:100%;background:#fff;box-sizing:border-box;padding-top:20px;}
</style>
<script>
    import {mapActions,mapGetters} from "Vuex"

	export default{
		methods:mapActions(['increment',"decrement"]),
 		 computed:mapGetters(['count'])


	}
</script>