<template>
	<v-app>
		<v-app-bar app color="white" elevate-on-scroll>
			<v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

			<v-spacer />

			<v-btn icon @click="$router.push('/sign')">
				<v-icon>mdi-login-variant</v-icon>
			</v-btn>

			<v-btn icon>
				<v-icon>mdi-heart</v-icon>
			</v-btn>

			<v-btn icon>
				<v-icon>mdi-dots-vertical</v-icon>
			</v-btn>
		</v-app-bar>

		<v-navigation-drawer v-model="drawer" app temporary>
			<site-menu :items="site.menu"></site-menu>
		</v-navigation-drawer>

		<v-main>
			<router-view />
		</v-main>

		<site-footer :footer="site.footer"></site-footer>
	</v-app>
</template>

<script>
import SiteFooter from '@/views/site/footer'
import SiteMenu from '@/views/site/menu'

export default {
	components: { SiteFooter, SiteMenu },
	name: 'App',

	data() {
		return {
			drawer: false,
			site: {
				menu: [
					{
						title: 'Home',
						icon: 'mdi-home',
						subItems: [
							{
								title: 'Home',
								to: '/'
							}
						]
					},
					{
						title: 'Upload',
						icon: 'mdi-upload',
						active: true,
						subItems: [
							{
								title: 'Upload',
								to: '/upload'
							}
						]
					},
					{
						title: 'Test',
						icon: 'mdi-file-question',
						subItems: [
							{
								title: 'Test',
								to: '/test'
							}
						]
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
