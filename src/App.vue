<template>
	<v-app>
		<v-app-bar app color="white" elevate-on-scroll>
			<v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

			<v-spacer />

			<v-btn icon>
				<v-icon>mdi-heart</v-icon>
			</v-btn>

			<v-btn icon to="/auth">
				<v-icon>mdi-dots-vertical</v-icon>
			</v-btn>

			<v-menu offset-y v-if="!$store.state.fireUser">
				<template v-slot:activator="{ on }">
					<v-btn icon v-on="on">
						<v-icon>mdi-account</v-icon>
					</v-btn>
				</template>

				<v-list nav>
					<v-list-item-group>
						<v-list-item> Log-in </v-list-item>
					</v-list-item-group>
				</v-list>
			</v-menu>

			<v-menu offset-y v-else>
				<template v-slot:activator="{ on }">
					<v-btn icon v-on="on">
						<v-icon>mdi-account</v-icon>
					</v-btn>
				</template>

				<v-list nav>
					<v-list-item>
						<v-list-item-content>
							<v-list-item-title> user.name </v-list-item-title>
							<v-list-item-subtitle> subtitle </v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>

					<v-divider></v-divider>

					<v-list-item-group>
						<v-list-item> Setting </v-list-item>
						<v-list-item @click="signOut"> Log-Out </v-list-item>
					</v-list-item-group>
				</v-list>
			</v-menu>
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
import SiteFooter from '@/views/site/footer'

export default {
	components: { SiteMenu, SiteFooter },
	name: 'App',

	data() {
		return {
			typeCenter: false,
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
		},
		signOut() {
			this.$firebase.auth().signOut()
		}
	}
}
</script>
