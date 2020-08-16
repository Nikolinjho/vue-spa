export default {
    actions: {
        newTag({commit}, payload){
            commit('newTag', payload)
        }
    },
    mutations: {
        newTag(state, payload){
            state.tags.push(payload)
        }
    },
    getters: {
        tags(state){
            return state.tags;
        }
    },
    state: {
        tags: [
            {
                id: 0,
                title: "Western",
                usage: false
            },
            {
                id: 1,
                title: "Adventure",
                usage: false
            },
            {
                id: 2,
                title: "Horror",
                usage: false
            }
        ],
    },

}