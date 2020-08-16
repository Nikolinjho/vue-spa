export default {
    actions: {
        newTask({ commit }, payload) {
            commit('newTask', payload)
        }
    },
    mutations: {
        newTask(state, payload) {
            state.tasks.push(payload)
        },
        completed(state, payload) {
            state.tasks[payload - 1].completed = !state.tasks[payload - 1].completed
        },
        changeFilter(state, payload) {
            state.filter = payload;
        }
    },
    getters: {
        tasks(state) {
            return state.tasks
        },
        tasksFiltered(state) {
            if (state.filter === 'all') {
                return state.tasks
            } else {
                if (state.filter === 'active') {
                    return state.tasks.filter(t => !t.completed)
                } else {
                    if (state.filter === 'completed') {
                        return state.tasks.filter(t => t.completed)
                    }
                }
            }
        },

    },
    state: {
        filter: 'all',
        tasks: [
            {
                id: 1,
                title: "Mythbusters",
                description:
                    "I directed this documentary challenging sfahh ksk need to kroks ffk aakfssf",
                whatWatch: "series",
                totalTime: '6 seasons 75 series 40 min/serie',
                tags: [
                    'Documentary',
                    'Western'
                ],
                completed: true,
                editing: false
            },
            {
                id: 2,
                title: "Pirates of the Caribbean",
                description:
                    "Fantastic film alolo nedd to watch Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque consequatur quasi laudantium beatae, mollitia sit deserunt voluptas doloribus placeat sequi.",
                whatWatch: "Movie",
                totalTime: '1 35 hrs',
                tags: [
                    'Horror',
                    'Action',
                    'Comedy'
                ],
                completed: false,
                editing: false
            },
            {
                id: 3,
                title: "Avengers",
                description:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente optio amet, expedita praesentium fugit tempore in ad dicta id nemo.",
                whatWatch: "Movie",
                totalTime: '1 35 hrs',
                tags: [
                    'Action',
                    'Romance',
                    'Thriller',
                    'Music',
                    'Noir',
                    'Historical drama'
                ],
                completed: false,
                editing: false
            }
        ],

    },

}