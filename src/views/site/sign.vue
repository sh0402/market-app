<template>
	<v-menu offset-y v-if="!$store.state.fireUser">
		<template v-slot:activator="{ on }">
			<v-btn icon v-on="on">
				<v-icon>mdi-account</v-icon>
			</v-btn>
		</template>

		<v-list width="250" nav>
			<v-list-item-group>
				<v-list-item to="/auth"> Log-in </v-list-item>
			</v-list-item-group>
		</v-list>
	</v-menu>

	<v-menu offset-y v-else>
		<template v-slot:activator="{ on }">
			<v-btn icon v-on="on">
				<v-avatar size="32">
					<v-img :src="$store.state.fireUser.photoURL"></v-img>
				</v-avatar>
			</v-btn>
		</template>

		<v-list width="250" nav>
			<v-list-item>
				<v-list-item-action class="mr-4">
					<v-avatar size="32">
						<v-img :src="$store.state.fireUser.photoURL"></v-img>
					</v-avatar>
				</v-list-item-action>

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
</template>

<script>
export default {
	data() {
		return {
			loading: false
		}
	},
	methods: {
		signOut() {
			this.$firebase.auth().signOut()
		}
	}
}
</script>
