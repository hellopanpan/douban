import { INCREMENT,DECREMENT} from './types.js'
import * as types from './types.js'
import getters from './getters.js'
const state={
	count:20
};
const mutations={
	[INCREMENT](state){
		state.count++;
	},
	[types.DECREMENT](state){
		state.count--;
	},
	showloading(state){
		
	},
	hideloading(state){
		
	}

};
export default{
	state,
	mutations,
	getters

}