import Home from './components/home.vue'
import HomeShouye1 from './components/homeShouye1.vue'
import HomeShouye2 from './components/homeShouye2.vue'
import HomeShouye3 from './components/homeShouye3.vue'
import Name from './components/person.vue'
import Person from './components/person.vue'
import Detail from './components/detail.vue'
import MovieCon from './components/movieCon.vue'
import MusicCon from './components/musicCon.vue'
import ReadCon from './components/readCon.vue'
import HomeApp from './components/homeApp.vue'
export default [{
	path:'/home',component:Home,redirect:'/home/shouye1',
		children:[
			{path:"shouye1",component:HomeShouye1},
			{path:"shouye2",component:HomeShouye2},
			{path:"shouye3",component:HomeShouye3}
		]
	},
	{
        path:'/',component:HomeApp
    },
    {
		path:'/name',component:Name
	},
	{
		path:'/article/:id',component:Detail
	},{
		path:'/person',component:Person
	},
    {
        path:'/movie',component:MovieCon
    },
    {
        path:'/music',component:MusicCon
    },
     {
        path:'/read',component:ReadCon
    },
    {
    	path:"*" ,redirect:"/"
    }]
	
	
	
