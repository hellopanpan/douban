<template>	
	<div class="person">
		<p onclick="window.history.go(-1)" class="header">第{{id}}篇文章，点击返回</p>
		<h3 class="title">{{contents.title}}</h3>
		<p class="content">{{contents.detail}}</p>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				arrA:[]
			}

		},
		mounted(){
			this.fetchData();

		},
		computed:{
			id(){return this.$route.params.id},
			contents(){
				return this.arrA[this.id]
			},

		},
		methods:{
			fetchData(){
				var that=this;
				this.$http.get("src/data/follow.data").then(function(res){
					that.arrA=res.data;
				}).catch(function(err){
					console.log(err);
				});
			}
		}

	}
</script>
<style>
	.person{width:100%;height:90%;background:#fff;box-sizing:border-box;padding-top:20px;}
	.person .header{background:#eff;color:#888}
	.person h3{padding:20px;font-size:16px;color:#333}



</style>