<template>
	<v-app>
		<v-app-bar app color="white" elevate-on-scroll>
			<v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

			<v-spacer />

			<span v-if="$store.state.fireUser">
				{{ $store.state.fireUser.displayName }}
			</span>

			<v-spacer />

			<site-sign></site-sign>
		</v-app-bar>

		<v-navigation-drawer app temporary v-model="drawer">
			<site-menu :items="site.menu"></site-menu>
		</v-navigation-drawer>

		<v-main>
			<router-view />
		</v-main>

		<site-footer :footer="site.footer"></site-footer>
	</v-app>
</template>

<script>
import SiteMenu from '@/views/site/menu'
import SiteSign from '@/views/site/sign'
import SiteFooter from '@/views/site/footer'

export default {
	components: { SiteMenu, SiteSign, SiteFooter },
	name: 'App',

	data() {
		return {
			drawer: false,
			site: {
				menu: [
					{
						title: 'Home',
						to: '/'
					},
					{
						title: 'Product',

						to: '/product'
					},
					{
						title: 'Test',

						to: '/test'
					}
				],
				title: 'Apple Market',
				footer: 'this is Footer'
			}
		}
	},
	created() {
		this.subscribe()
	},
	methods: {
		subscribe() {
			this.$firebase
				.database()
				.ref()
				.child('site')
				.on(
					'value',
					sn => {
						const v = sn.val()
						if (!v) {
							this.$firebase.database().ref().child('site').set(this.site)
						}
						this.site = v
					},
					e => {
						console.log(e.message)
					}
				)
		}
	}
}
</script>
