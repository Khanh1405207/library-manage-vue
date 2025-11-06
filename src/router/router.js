import Home from "@/components/Home.vue"
import BookView from "@/components/BookView.vue"
import { createRouter,createWebHistory } from "vue-router"
import Profile from "@/components/Profile.vue"

const routes=[
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/books',
        name: 'viewBooks',
        component: BookView
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile
    }
]

const router= createRouter({
    history: createWebHistory(),
    routes
})

export default router