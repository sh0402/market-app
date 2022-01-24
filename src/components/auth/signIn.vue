<template>
	<v-container>
		<v-card flat>
			<v-card-title
				class="text-h4 font-weight-bold text-center justify-center my-4"
			>
				Market App <br />
				Portfolio
			</v-card-title>
			<v-card-text class="text-body-1 text-center">
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae
				perferendis, quo aperiam distinctio laboriosam quod dolores suscipit
			</v-card-text>

			<v-card flat rounded="lg" class="mx-4">
				<v-img src="https://picsum.photos/300"></v-img>
			</v-card>

			<v-card-text>
				<v-btn
					block
					rounded
					depressed
					color="primary"
					height="44"
					class="mt-4"
					v-if="loading"
				>
					<v-progress-circular indeterminate></v-progress-circular>
				</v-btn>

				<v-btn
					block
					rounded
					depressed
					color="primary"
					height="44"
					class="mt-4"
					@click="signInWithGoogle"
					v-else
				>
					<v-icon small class="mr-2">mdi-google</v-icon>
					Google Log-In
				</v-btn>

				<v-btn
					block
					rounded
					depressed
					dark
					color="grey"
					height="44"
					class="mt-4"
					@click="signOut"
				>
					Sign-Out
				</v-btn>
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			loading: false
		}
	},
	methods: {
		async signInWithGoogle() {
			const provider = new this.$firebase.auth.GoogleAuthProvider()
			this.$firebase.auth().languageCode = 'ko'
			this.loading = true
			try {
				const sn = await this.$firebase.auth().signInWithPopup(provider)
				this.$store.commit('setFireUser', sn.user)
				console.log(sn.user)
			} catch (error) {
				console.log(error.message)
			} finally {
				this.loading = false
			}
		},
		signOut() {
			this.$firebase.auth().signOut()
		}
	}
}
</script>
