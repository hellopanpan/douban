import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);

var state={
	count:10
};
const mutations={
	increment(state){
		state.count++; 
	},
	decrement(state){
		state.count--;
	}
}
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
const getters={
	count(state){
		return state.count;
	}
}



export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters


})