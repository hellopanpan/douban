<template>
  <div id="app">
      <div class="container-fluid"style="background:#324157;">
              <div class="container">
              <div class="row">
                  <div class="col-md-2 hidden-sm col-xs-10"  style="height:60px;line-height:60px;">
                      <a href="#" >
                          <img src="./assets/images/logo.png" class="img-responsive pd-10" style="max-height:40px;padding-right:20px;max-width:40px;display:inline-block" ><span  style="color:#fff;font-size:20px;font-weight:bold;">豆瓣日报</span>
                      </a>
                  </div>
                  <div class=" col-md-8 col-sm-10 hidden-xs">
                      <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                          <el-menu-item index="1"> <span class="glyphicon glyphicon-home pr-5" aria-hidden="true"></span>首页</el-menu-item>
                          <el-menu-item index="2"> <span class="glyphicon glyphicon-tags pr-5" aria-hidden="true"></span>读书</el-menu-item>
                          <el-menu-item index="3"><span class="glyphicon glyphicon-film pr-5" aria-hidden="true"></span>电影</el-menu-item>
                          <el-menu-item index="4"> <span class="glyphicon glyphicon-headphones pr-5" aria-hidden="true"></span>音乐</el-menu-item>
                          <el-menu-item index="4"> <span class="glyphicon glyphicon-comment pr-5" aria-hidden="true"></span>豆瓣小组</el-menu-item>
                      </el-menu>
                  </div>
                  <div class="col-md-2 col-sm-2 hidden-xs" style="height:60px;line-height:60px;position:relative">
                      <img src="./assets/images/github-01.png" style="position: absolute;top:10px;right:0;max-height:40px;max-width:40px;display:inline-block">
                  </div>
                  <div class="col-xs-2 hidden-sm"style="postion:relative">
                      <div style="position: absolute;top:20px;right:10px;cursor:pointer"@click="changeTheIcon">
                          <span class="sr-only">切换导航</span>
                          <span class="icon-bar"></span>
                          <span class="icon-bar"></span>
                          <span class="icon-bar"></span>
                      </div>
                  </div>
          </div>
          </div>

      </div>
      <div class="container-fluid hidden-sm" style="background:#324157; margin-top:2px" v-show="show_xs_menu" >
          <div class="row">
              <div class="col-xs-12" style="height:280px" >
                  <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" @select="handleSelect">
                      <el-menu-item index="1"> <span class="glyphicon glyphicon-home pr-5" aria-hidden="true"></span>首页</el-menu-item>
                      <el-menu-item index="2"> <span class="glyphicon glyphicon-tags pr-5" aria-hidden="true"></span>读书</el-menu-item>
                      <el-menu-item index="3"><span class="glyphicon glyphicon-film pr-5" aria-hidden="true"></span>电影</el-menu-item>
                      <el-menu-item index="4"> <span class="glyphicon glyphicon-headphones pr-5" aria-hidden="true"></span>音乐</el-menu-item>
                      <el-menu-item index="4"> <span class="glyphicon glyphicon-comment pr-5" aria-hidden="true"></span>豆瓣小组</el-menu-item>
                  </el-menu>
              </div>
          </div>
      </div>
    <nav class="navbar nav-default nav-fixed-up" style="background:#eee" v-show="false">
      <div class="container">
        <div class="navbar-header">
          <a href="#" class="navbar-brand">
            <img src="./assets/images/logo.png" class="img-responsive" style="max-height:100%;max-width:100%;display:inline-block" ><span class="navbar-title" style="color:#000">Panpan</span>
          </a>
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#nav-collapse">
            <span class="sr-only">切换导航</span>
            <span class="icon-bar"></span>
             <span class="icon-bar"></span>
              <span class="icon-bar"></span>
          </button>
        </div>
        <div class="collapse navbar-collapse navbar-left" id="nav-collapse" >
          <ul class="nav navbar-nav">
            <li class="active dropdown">
              <div class="btn-group">
                  <button class="btn navbar-btn" style="background:none"><router-link  to='/home'><span class="glyphicon glyphicon-home"></span> 首页</router-link></button>
                  <button class="btn navbar-btn" data-toggle="dropdown" style="background:none"><span class="caret "  ></span></button>
                    <ul class="dropdown-menu">
                        <li><a href="">aaa</a></li>
                        <li><a href="">aaa</a></li>
                        <li><a href="">aaa</a></li>
                        <li><a href="">aaa</a></li>
                    </ul>
              </div>
            </li>
             <li><router-link  to='/name'><span class="glyphicon glyphicon-list"></span>内容区</router-link></li>
            <li><router-link  to='/person'><span class="glyphicon glyphicon-search"></span> 个人中心</router-link></li>
          </ul>
        </div>
        <form class="navbar-form navbar-right">
          <input type="input" class="form-control">
          <div class="input-group ">
              <span class="input-group-btn">
                <button class="btn"><span class="glyphicon glyphicon-zoom-in"></span></button>>
              </span>

          </div>
        </form>
      </div>
     </nav>
    <transition name="fade"><router-view :totle="totle"></router-view></transition>
      <div class="container-fluid"style='width:100%;height:300px;background:url("./assets/images/bg01.png") no-repeat'>
        ````
      </div>
    <div class="footer navbar">
	   
  	</div>
 </div>
</template>

<script>
import Navview from './components/nav.vue'
import ContentView from './components/content.vue'  
import FllowView from './components/fllowView.vue' 
import {mapGetters,mapActions} from 'vuex'

export default {
  name: 'app',
  data () {
      return {
          msg: 'Welcome to Your Vue.js App',
          showif: true,
          totle: "App.vue上的数据",
          activeIndex: '1',
          show_xs_menu: false
      };
  },
  components:{ 
      Navview,
      ContentView,
      FllowView,
      
  },
  methods:{
      handleSelect(key, keyPath) {
          console.log(key, keyPath);
      },
      changeTheIcon: function () {
          this.show_xs_menu= !this.show_xs_menu;
      }
  },
  computed:mapGetters(['count']),
  mounted(){
    
  }

}
</script>

<style>
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
