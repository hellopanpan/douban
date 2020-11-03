// import Name from './components/person.vue'
// import Person from './components/person.vue'
// import Detail from './components/detail.vue'
// import MovieCon from './components/movieCon.vue'
// import MusicCon from './components/musicCon.vue'
// import ReadCon from './components/readCon.vue'
// import HomeApp from './components/homeApp.vue'
const HomeApp = () => import(/* webpackChunkName: "homeapp" */ './components/homeApp.vue')
const MovieCon = () => import(/* webpackChunkName: "movie" */ './components/movieCon.vue')
const MusicCon = () => import(/* webpackChunkName: "music" */ './components/musicCon.vue')
const ReadCon = () => import(/* webpackChunkName: "read" */ './components/readCon.vue')
export default [
	{
    path:'/',component:HomeApp
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
	
	
	
