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
		path: '/auth',
		component: () => import('@/views/auth')
	},
	{
		path: '/product',
		name: 'product',
		component: () => import('@/views/product')
	},
	{
		path: '/board',
		name: 'board',
		component: () => import('@/views/board')
	},
	{
		path: '/form',
		component: () => import('@/components/product/form')
	},
	{
		path: '/form2',
		name: 'form2',
		component: () => import('@/components/product/form2')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
