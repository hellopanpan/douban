<template>
	<div >
		<search :tag="tag"@showall="showall"></search>
		<movie-con v-show="search":tagname="tag" :alldata="allData"></movie-con>
		<music-con v-show="search":tagname="tag" :alldata="allData"></music-con>
		<read-con v-show="search" :tagname="tag" :alldata="allData"></read-con>
	    <movie :tag="tag" v-show="!search"></movie>
	    <music  v-show="!search" ></music>
	    <time-con v-show="!search"></time-con>
	</div>
</template>
<script>
	import Music from './music.vue'
	import Search from './search.vue'
	import Movie from './movie.vue'
	import TimeCon from './time.vue'
	import MovieCon from './movieCon.vue'
	import MusicCon from './musicCon.vue'
	import ReadCon from './readCon.vue'


    import Axios from 'axios'
	export default{
	    data(){
	        return{
	            value1: 3,
	            value2: true,
				data: '',
                loading2: false,
                rateNum: [],
                tag:"home",
                allData:"",
                search: false
			}
		},
		components:{
			Movie,
	     	TimeCon,
	    	Music,
	    	Search,
	    	MusicCon,
      		MovieCon,
      		ReadCon
		},
		mounted(){
		
		},
		methods:{
			showall(data){//search icon click
				this.allData = data;//input data
				this.search = true;
			}
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
