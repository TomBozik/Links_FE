import Vue from 'vue';
import Vuex from "vuex";
import { user } from "./user/user.module.js";
import { link } from "./link/link.module.js";


Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		user,
		link,
	}
});