import Vue from 'vue';
import Router from 'vue-router';
import { store } from '@/store/store';
// import Home from "@/views/";

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('./views/Home.vue'),
            beforeEnter(to, from, next) {
                store.getters.checkUser ? next() : next('/login');
            }
        },
        {
            path: '*',
            name: '404',
            component: () => import('./views/404.vue')
        },
        {
            path: '/tasks',
            name: 'tasks',
            component: () => import('./views/Task.vue'),
            beforeEnter(to, from, next) {
                store.getters.checkUser ? next() : next('/login');
            }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/auth/Login.vue')
        },
        {
            path: '/auth',
            name: 'auth',
            component: () => import('./views/auth/Auth.vue')
        }
    ]
})

// router.beforeEach((to, from, next) => {
//     store.getters.checkUser ? next() : next('/login');
// })

export { router }