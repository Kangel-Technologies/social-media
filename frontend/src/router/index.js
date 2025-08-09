import { createRouter, createWebHistory } from "vue-router";
import Register from "@/components/Auth/Register.vue";
import Login from "@/components/Auth/Login.vue";
import Profile from "@/components/Profile/Profile.vue";
import Home from "@/pages/Home.vue";

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/register', component: Register },
        { path: '/login', component: Login },
        { path: '/profile', component: Profile },
    ]
});