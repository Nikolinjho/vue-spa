import firebase from 'firebase/app';

import getId from './user_help';
export default {
    state: {
        user: null,
    },
    actions: {
        async registerUser({ commit }, { email, password }) {
            commit('clearError');
            commit('setLoading', true);
            try {
                const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
                const id = getId(user.user.uid);
                commit('setUser', id);
                commit('setLoading', false);
            } catch (error) {
                commit('setLoading', false);
                commit('setError', error.message);
                throw error;
            }
        },
        async loginUser({ commit }, { email, password }) {
            commit('clearError');
            commit('setLoading', true);
            try {
                const user = await firebase.auth().signInWithEmailAndPassword(email, password);
                const id = getId(user.user.uid);
                commit('setUser', id);
                commit('setLoading', false);
            } catch (error) {
                commit('setLoading', false);
                commit('setError', error.message);
                throw error;
            }
        },
        loggedUser({ commit }, payload) {
            console.log(payload)
            commit('setUser', getId(payload.uid))
        },
        logOut({ commit }) {
            // commit('setLoading', true);
            firebase.auth().signOut();
            commit('setUser', null);
            // setTimeout(() => {
            //     commit('setLoading', false);
            // }, 500);
        }
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        }
    },
    getters: {
        user(state) {
            return state.user;
        },
        checkUser(state) {
            return state.user !== null;
        }
    }
}