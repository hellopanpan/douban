# Learn some front-end technology
# ES6（ES2015）
## let, const
- let与var的区别是：存在块级作用域，不能重复声明，不能提升变量，存在暂时性死区。
- const也用来声明的是常量，实质是变量指向的那个内存地址不得改动。一旦声明，简单类型的数据的值就不能改变。对象本身是可变的，依然可以为其添加新属性。数组依然可用push方法添加元素。
- Es6声明变量有var,function,let,const,import,classe6种。
---
## Class ,extends, super
- Es6引入了Class定义“类”，constructor方法是构造方法，内定义的方法和属性是实例对象自己的。
- Class之间可以通过extends关键字实现继承。
- super关键字，它指代父类的实例。必须在constructor方法中调用super方法。

---

## 箭头函数（arrow function）
- ES6 允许使用“箭头”（=>）定义函数，使函数表达更加简洁。
- 如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。
- 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。

---
## 解构赋值（destructuring）

- 从数组和对象中提取值，对变量进行赋值。
- 等号两边的模式相同，左边的变量就会被赋予对应的值。
- 解构不成功，变量的值就等于undefined。
```
let dog = {type: 'animal', many: 2}
let { type, many} = dog
console.log(type, many)   //animal 2
```

---

## 函数默认赋值和rest参数（default, rest）
- 允许为函数的参数设置默认值，即直接写在参数定义的后面
- 检查函数log的参数y有没有赋值，如果没有，则指定默认值
- rest 参数用于获取函数的多余参数，取代使用arguments对象。
- rest 变量将多余的参数放入数组中。

```
function animals(...types){
    console.log(types)
}
animals('cat', 'dog', 'fish') //["cat", "dog", "fish"]
```

---
# Vue.js
## vue实例
- 每个 Vue.js 应用都是通过构造函数 Vue 创建一个 Vue 的根实例 启动的。
- Vue 实例暴露了一些有用的实例属性与方法，如data，computed, methods,mounted。
- 在实例生命周期的不同阶段调用，如 mounted、 updated 、destroyed钩子函数。
- computed可以像绑定普通属性一样在模板中绑定计算属性。
- methods用于定义vue实例内的方法。
```
var vm = new Vue({
  data: {
    a: 1，
    message:'hello naver'
  },
  created: function () {
    console.log('a is: ' + this.a)
  }，
  mounted(){
    console.log(this.message);    
    //es6写法  
  }，
  computed: {
    reversedMessage: function () {
      // 根据message重新计算reversedMessage
      return this.message.split('').reverse().join('')
    }
  },
  methods: {
    reversedMessage: function () {
      return this.message.split('').reverse().join('')
    }
  }
})
```

## 常用指令
- v-model一般表单元素(input)双向数据绑定
- v-for 循环:指令根据一组数组的选项列表进行渲染
- v-on事件 v-on:click/mouseout/mouseover/dblclick/mousedown.....
- v-bind属性:v-bind:src=""	width/height/title
- v-html 双大括号会将数据解释为纯文本，而非 HTML 。
- v-if 和v-else 指令将根据表达式的值的真假来移除/插入.
- v-show类似于v-if，不同的是通过控制display属性显示隐藏

## 事件处理
- 可以用 v-on 指令监听 DOM 事件来触发一些 JavaScript 代码。
- v-on 提供了.stop.prevent.capture.self.once等事件修饰符。
- 为 v-on 在监听键盘事件时添加enter.tab.delete.esc.space.up.down.left.right关键修饰符
```
<a v-on:click.stop="doThis"></a>
<form v-on:submit.prevent="onSubmit"></form>
<div v-on:click.self="doThat">...</div>
<input v-on:keyup.enter="submit">
```
## 组件（component）
- 全局组件：要注册一个全局组可以使用 Vue.component()。
- 局部组件：通过使用组件实例选项注册，可以使组件仅在另一个实例/组件的作用域中。
- data函数:data与vue实例内的不同，此处是个函数，里面return一个object。
- props：父组件向子组件传递数据，通过子组件的props选项
```
//html 使用模板，传递msg过来
<child :message="msg"></child>
//vue
new Vue({
  data:{
    msg:"hello naver"
  },
  el:"#app",
  //局部注册组件
  components: {
    'child': {
        props:['message'],
        data(){
            return{
                msg2:'nihao'
            }
        }
        template:'<span>{{ message }}{{msg2}}</span>'
    }
  }
});
```
- $on(eventName)，$emit(eventName)：子组件向父组件或其他组件传递数据
- slot分发：
  - 使用 Slot 分发内容,<slot> 标签中的任何内容都被视为备用内容
  - <slot> 元素可以用一个特殊的属性 name 来配置如何分发内容。
- keep-alive 指令可以保留它的状态或避免重新渲染。

---

## vue-router路由
- HTML部分router-link通过传入 `to` 属性指定链接，router-view 路由匹配到的组件将渲染在这里
- 定义（路由）组件。
- 配置路由。
- 创建router实例
- 创建和挂载根实例。
```
//1.路由html部分
<router-link to="/foo">Go to Foo</router-link>
 <router-link to="/bar">Go to Bar</router-link>
 <router-view></router-view>
 // 2.定义（路由）组件。
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
- 3.定义路由
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]
// 4. 创建 router 实例
const router = new VueRouter({
  routes 
})
// 5. 创建和挂载根实例
const app = new Vue({
  el:"#app",
  router
});
```
- 动态路由匹配,使用冒号 : 标记。当匹配到一个路由时，参数值会被设置到, this.$route.params，可以在每个组件内使用。
- 嵌套路由，使用children 配置就是像 routes 配置一样的路由配置数组,可以嵌套多层路由。
- 重定向redirect,可以重定向到一个路径或是一个命名的路由。
- mode: 'history'在VueRouter里配置，可以使URL像正常的url，避免#的出现。
---

## vuex
![image](https://vuex.vuejs.org/zh-cn/images/vuex.png)
- Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式，主要有state，getters，actions，mutations等组成store实例。
- state用于vuex从实例中的状态树，vuex状态存储。
- getters可认为是vuex的store的计算属性。
- actions 存储事件，并commit给mutation，可以包含异步操作。
- mutations对Action commit过来的事件进行处理，改变state中的状态。
```
//此处使用模块化写法
//引入vue、vuex，并在vue中使用vuex
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);
//定义state中的数据
var state={
	count:10
};
//定义mutations
const mutations={
	increment(state){
		state.count++; 
	},
	decrement(state){
		state.count--;
	}
}
//定义actions
const actions={
	increment:({commit,state}) => {
		if(state.count%2==0){
			commit("increment")
		}
		
	},
	decrement:({commit}) => {
		commit("decrement")
	}
};
//定义getters
const getters={
	count(state){
		return state.count;
	}
}
//导出store实例
export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})
```

---

# webpack
- package.json文件中npm install --save-dev webpack
- 配置wbpack.config.js
   - entry为入口文件
   - output为输出文件
   - __dirname为webpack.config.js所在目录
   - loader配置：test写正则表达式，loader写loader名称，include/exclude写包含或不包含文件，query提供额外设置选项。
   - plugins写webpack加载插件
```
//此段代码使用脚手架vue-cli生成vue webpack-simple
var path = require('path')
var webpack = require('webpack')

module.exports = {
  //入口文件
  entry: './src/main.js',
  //出口文件
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
  //配置loader，此前为loaders,现在为rules，且loader里面必须接-loader。
    rules: [
      {
      //处理vue结尾的
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        //处理js，不包含node_moduels中的js
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      //处理css，注意loader的顺序，style-loader必须在前面
	  {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {//处理文件的
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  //
  plugins:[
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    //压缩JS代码
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
}
```

