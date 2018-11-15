<template>
	<div class="container-fluid" style="background:#324157;">
		<div class="container" style="padding-bottom:40px">
			<div class=" col-xs-12 col-sm-3 pull-right">
				<div class="hidden-xs col-sm-12" style="height:60px;line-height:60px;position:relative">
					<el-popover
					  ref="popover2"
					  placement="top"
					  width="220"
					  trigger="click">
					  <div style="">
					  	<img style="width:200px;height:200px" :src="imgwe">
					  	<p class="text-muted pt-10" style="font-size:10px">扫一扫上面的二维码图案，加我微信</p>
					  </div>
					</el-popover>		
					<el-button v-popover:popover2 style="opacity:0;position:absolute;top:45px;right:60px;z-index:2">click
					</el-button>
					<img  @click="showGit" :src="imggit" style="position: absolute;top:40px;right:0;max-height:40px;max-width:40px;display:inline-block;cursor:pointer">
					<img :src="imgwechart" style="position: absolute;top:45px;right:60px;max-height:40px;max-width:40px;display:inline-block">
				</div>

			</div>

			<div class="col-xs-12 col-sm-9 pull-left ">
				<h3 style="color:#fff;font-size:22px ;font-family:Helvetica " class="pt-10">Douban日报 1.0.1 </h3>
				<div class=" footer_span">
					<span>反馈建议</span><span>贡献指南</span><span>@ xpanpan.com</span><a href="http://www.miitbeian.gov.cn">湘ICP备16012673号-1</a>
				</div>

			</div>

		</div>
		
		

	</div>
</template>
<script>
    import Axios from 'axios'
    export default{
        data(){
            return{
                value2: true,
                imgwe: require("../assets/images/wechat.jpg"),
                imgwechart: require("../assets/images/wechart.png"),
                imggit: require("../assets/images/github-01.png"),
            }
        },
        methods:{
        	showGit(){
        		window.open("https://github.com/hellopanpan/douban","_blank");
        	}
        }

    }
</script>

<style lang="less"scoped>
	@padding-size:10px;
	.pb-10{
		padding-bottom: @padding-size;
	}
	.pt-10{
		 padding-top: @padding-size;
	 }
	.auto-hide{
		overflow: hidden;
		word-break: keep-all;
		white-space: nowrap;
		text-overflow: ellipsis;
		max-width:100%;
		display: inline-block;
	}
	@media screen and (max-width: 608px) {
		.container {
			padding:0;
		}
	}
	.footer_span span{
		padding-right:20px;
		color: #eee;
		font-size:12px;
	}

</style>