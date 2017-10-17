<template>
	<div class="shouye">
		<div class="header">
			<div class="container">
				<ul class="nav navbar-nav">
				<!--注释？？-->
				<li class="active"><router-link to="/home/shouye1"><span class="glyphicon glyphicon-globe"></span>   首页1</router-link ></li>
				<li><router-link to="/home/shouye2"><span class="glyphicon glyphicon-leaf"></span>   首页2</router-link ></li>
				<li><router-link to="/home/shouye3"><span class="glyphicon glyphicon-tags"></span>   首页3</router-link ></li>
				</ul> 
			</div>
		</div>
		<div class="page1">
			<transition  name="custom-classes-transition"
    enter-active-class="animated tada"
    leave-active-class="animated bounceOutRight" >
				<router-view :totle="totle"></router-view>
			</transition>
		</div>
	</div>
</template>
<script>

	export default{
		props:["totle"],
		data(){
			return{
				msg:"6666",
				arr:['hhh','yyyy','lllll'],
				arrA:[]

			}

		},
		

	}
</script>
<style>
@import url(https://unpkg.com/animate.css@3.5.1/animate.min.css);	
	.shouye{height:90%;width:100%;background:#fff;verflow:scroll;}
	.shouye ul{width:100%;}
	.shouye .header{height:10%;width:100%;margin:0;background:#eee;}
	.shouye .page1{height:90%;width:100%;;box-sizing:border-box;}
	.shouye h3{font-size:0.4rem;font-weight:normal;color:green;}
	.shouye>li{ width:33%;height:10%;float:left;}
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
	  opacity: 0
	}
</style>