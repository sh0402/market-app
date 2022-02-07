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
		path: '/auth',
		component: () => import('@/views/auth')
	},
	{
		path: '/form2',
		name: 'form2',
		component: () => import('@/components/product/form2')
	},
	{
		path: '/:collection/:document',
		name: 'collection-document',
		component: () => import('../views/renderer')
	},
	{
		path: '/:collection/:document/:action',
		name: 'collection-document-action',
		component: () => import('../views/renderer')
	},
	{
		path: '*',
		name: 'error',
		component: () => import('../views/error')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
