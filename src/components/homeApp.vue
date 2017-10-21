<template>
	<div >
		<search ></search>
     	<time-con ></time-con>
	    <movie :tag="tag" ></movie>
	    <music ></music>
	</div>
</template>
<script>
	import Music from './music.vue'
	import Search from './search.vue'
	import Movie from './movie.vue'
	import TimeCon from './time.vue'

    import Axios from 'axios'
	export default{
	    data(){
	        return{
	            value1: 3,
	            value2: true,
				data: '',
                loading2: false,
                rateNum: [],
                tag:"home"
			}
		},
		components:{
			Movie,
	     	TimeCon,
	    	Music,
	    	Search
		},
		mounted(){
		
		},
		methods:{
		}

	}
</script>

<style lang="less" scoped>
	.pd-10{padding-right:10px}
    .pr-5{padding-right:5px}
    .pl-100{padding-left:60px}
    .icon-bar{
        display: block;
        height:2px;
        width:20px;
        margin:5px 0;
        background:#fff;
    }

</style>
