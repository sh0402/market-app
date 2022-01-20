import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/upload',
		component: () => import('../views/Upload.vue')
	},
	{
		path: '/test',
		component: () => import('../views/Test.vue')
	},
	{
		path: '/sign',
		component: () => import('../views/sign.vue')
	},
	{
		path: '/product',
		name: 'product',
		component: () => import('../views/product')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
