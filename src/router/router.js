import Home from "@/components/Home.vue"
import BookView from "@/components/BookView.vue"
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
    }
]

const router= createRouter({
    history: createWebHistory(),
    routes
})

export default router