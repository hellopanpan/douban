import * as types from './types.js'
export default{
	increment:({commit}) =>{
		commit(types.INCREMENT);
	},
	decrement:({commit})=>{
		commit(types.DECREMENT);
	},
	showloading:({commit})=>{
		commit("showloading");
	},
	hideloading:({commit})=>{
		commit("hideloading");
	}

}