<template>
	<div class="homeShouye2">
		<component v-bind:is="currentView" >
		</component>
		<p @click="increment" style="color:blue;font-size:20px">[{{count}}]</p>
		<button  class="btn btn-success" @click="increment">首页2可点击增加vuex的数字</button>
		<button  class="btn btn-danger" @click="decrement">首页2可点击减少vuex的数字</button>
		
	</div>
	
</template>
<style>
	.homeShouye2{width:100%;height:100%;background:#fff;box-sizing:border-box;padding-top:20px;}
</style>
<script>

import Home2 from "./homeShouye3.vue"
import {mapGetters,mapActions} from 'vuex'
var Home = {
  template: '<h3>Welcome home!</h3>'
};
export default{
	data(){
		return {
			"currentView": "Home"
		}

	},
	components:{
		Home,
		Home2
	},
	methods:mapActions(['increment',"decrement"]),
	computed:mapGetters(['count'])
}


</script>