import Home from './components/home.vue'
import HomeShouye1 from './components/homeShouye1.vue'
import HomeShouye2 from './components/homeShouye2.vue'
import HomeShouye3 from './components/homeShouye3.vue'
import Name from './components/person.vue'
import Person from './components/person.vue'
import Detail from './components/detail.vue'
export default [{
	path:'/home',component:Home,redirect:'/home/shouye1',
		children:[
			{path:"shouye1",component:HomeShouye1},
			{path:"shouye2",component:HomeShouye2},
			{path:"shouye3",component:HomeShouye3}
		]
	},{
		path:'/name',component:Name
	},
	{
		path:'/article/:id',component:Detail
	},{
		path:'/person',component:Person
	}]
	
	
	
