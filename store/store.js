import Vue from "vue";
import Vuex from "vuex";

import tasks from './modules/tasks';
import tags from './modules/tags';
import user from './modules/user/user';
import common from './modules/common'

Vue.use(Vuex);


const store = new Vuex.Store({
    modules: {
        common,
        tasks,
        tags, 
        user,
    }

})

export { store }