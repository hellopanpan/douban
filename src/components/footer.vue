<template>
	<div class="container-fluid"style="background:#324157;">
		<div class="container" style="padding-bottom:40px">
			<div class=" col-xs-12 col-sm-3 pull-right">
				<div class="hidden-xs col-sm-12" style="height:60px;line-height:60px;position:relative">
					<img src="/src/assets/images/github-01.png" style="position: absolute;top:40px;right:0;max-height:40px;max-width:40px;display:inline-block">
					<img src="/src/assets/images/wechart.png" style="position: absolute;top:45px;right:60px;max-height:40px;max-width:40px;display:inline-block">
				</div>

			</div>

			<div class="col-xs-12 col-sm-9 pull-left ">
				<h3 style="color:#fff;font-size:22px ;font-family:Helvetica " class="pt-10">Douban R'bao 1.0.1 </h3>
				<div class=" footer_span">
					<span>反馈建议</span><span>贡献指南</span><span>@ panpan</span>
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
            }
        },

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