import BookView from "@/components/view/BookView.vue"
import Home from "@/components/view/Home.vue"
import Profile from "@/components/view/Profile.vue"
import { createRouter,createWebHistory } from "vue-router"

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