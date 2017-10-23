<template>
	<div class="container"style="width:100%;padding:0;position:relative">
		<div class="col-xs-12 col-sm-8 col-md-8 col-lg-6" style="position: absolute;z-index: 2;top:40%;left:50%;transform: translate(-50%,0)">
			<el-input
					placeholder="请输入搜索内容"
					icon="search"
					v-model="input"
					:on-icon-click="handleIconClick">
			</el-input>
		</div>
		<img class="img-responsive" :src="imgBg"style="width:100%;min-height:160px;max-height:500px;">
	</div>
</template>
<script>
    import Axios from 'axios'

    export default{
        data(){
            return{
				input:"",
				data:[],
				params:{},
                imgBg:  require("../assets/images/bg01.png"),
            }
        },
        props:{
			tag:{
				default: '',
				type:String
			},
			num:{
				default: 0,
				type:Number
			},
			name:{
				default: '',
				type:String
			},
			inputname:{
				default: '',
				type:String
			},
		},
		computed:{
			cat: function(){
				if(this.tag == 'movie'){
					return 1002;
				}else if(this.tag == 'music'){
					return 1003;
				}else if(this.tag == 'read'){
					return 1001;
				}
			}
		},
		watch:{
			num:function(){
				this.getTimeData();
			},
			inputname:function(){
				if(this.name == "home"){
					this.input = this.inputname;
					this.getTimeData();
				}
			}
		},
		mounted:function(){
			this.getTimeData("书");
		},
		methods:{
            handleIconClick(ev) {
                console.log(ev);
                this.$emit("clickit");
                if(this.tag == 'home'){
					this.$emit("showall",this.input);
				}else if(this.input){
                    this.getTimeData();
				}

            },
            getTimeData(){
                var vm = this;
                vm.$emit("load");
                if(this.name == "home"){

					this.param={
	                    q: this.input,
						cat: this.cat
					};
				}else if(this.input == ''){
   
                	this.param={
	                    q: "人",
						cat: this.cat
					};
                }else if(this.num > 0 ){
            
                	this.param={
	                    q: this.input,
	                    start: this.num,
						cat: this.cat
					};
				}else{
				
					this.param={
	                    q: this.input,
						cat: this.cat
					};
                }
                 
                Axios
                    .get("/cross/douban/video/search",{params: this.param})
                    .then(function (res) {
                        vm.loading2 = false;
                        vm.data =  res.data;
                        for(var i = 0;i< vm.data.length;i++){
                            vm.data[i].rate = Math.floor(vm.data[i].rate /10 * 5);
                        };
                        vm.$emit("getData",vm.data);
                        vm.$emit("loadend");
                    })
                    .catch(function () {
                        vm.loading2 = false;
                        vm.$emit("loadend");
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