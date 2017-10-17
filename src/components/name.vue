<template>	
	<div class="person1  tab">
		<p class="tab-h2"><span class="glyphicon glyphicon-globe"></span>    内容区</p>
		<ul>
			<li v-for='(val,index) in arrA'><router-link :to="'/article/'+index">{{index}}.{{val.title}}</router-link></li>
		</ul>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				arrA:[],
			}

		},
		mounted(){
			this.fetchData();

		},
		methods:{
			fetchData(){
				var that=this;
				this.$http.get("src/data/article.data").then(function(res){
					that.arrA=res.data;
				}).catch(function(err){
					console.log(err);
				});
			}
		}

	}
</script>
<style>
	.person1{height:90%;width:100%;background:#fff;}
	.person1 p{background:#eef;padding:10px;color:blue;height:10%}
	.person1 ul{padding-top:20px;}
	.person1 a:hover{color:red}
</style>