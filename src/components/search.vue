<template>
	<div class="container"style="width:100%;padding:0;position:relative">
		{{data}}
		<div class="col-xs-12 col-sm-8 col-md-8 col-lg-6" style="position: absolute;z-index: 2;top:40%;left:50%;transform: translate(-50%,0)">
			<el-input
					placeholder="请输入搜索内容"
					icon="search"
					v-model="input"
					:on-icon-click="handleIconClick">
			</el-input>
		</div>
		<img class="img-responsive" src="/src/assets/images/bg01.png"style="width:100%;min-height:160px;max-height:500px;">
	</div>
</template>
<script>
    import Axios from 'axios'

    export default{
        data(){
            return{
				input:"",
				data:[]
            }
        },
		methods:{
            handleIconClick(ev) {
                console.log(ev);
                if(this.input){
                    this.getTimeData(this.input);
				}

            },
            getTimeData(val){
                var vm = this;
                vm.loading2 = true;
                var param={
                    q: val,
					cat: 1002
				}
                Axios
                    .get("/cross/douban/video/search",{params: param})
                    .then(function (res) {
                        vm.loading2 = false;
                        vm.data =  res.data;
                        for(var i = 0;i< vm.data.length;i++){
                            vm.data[i].rate = Math.floor(vm.data[i].rate /10 * 5);
                        };
                        bus.$emit('search', vm.data)
                    })
                    .catch(function () {
                        vm.loading2 = false;
                    })
            },
		},

    }
</script>

<style lang="less" scoped>
	@padding-size:10px;
	.pb-10{
		padding-bottom: @padding-size;
	}
	.pt-10{
		 padding-top: @padding-size;
	 }
	.auto-hide02{
		overflow: hidden;
		height:40px;
		text-overflow: ellipsis;
		max-width:100%;
		display: inline-block;
	}
	@media screen and (max-width: 608px) {
		.container {
			padding:0;
		}
	}
	.movie_hover:hover{
		opacity: 0.8;
		transition: 1s;
		.item{
			transform:scale(2,2);
			transition: 0.5s;

		}
	}

</style>