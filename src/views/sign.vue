<template>
	<v-container style="max-width: 500px">
		<v-card class="mb-4">
			<v-card-title> Sign-In </v-card-title>
			<v-card-text>
				<v-text-field
					dense
					outlined
					type="email"
					label="User_email"
					v-model="email"
				></v-text-field>

				<v-text-field
					dense
					outlined
					type="password"
					label="Password"
					hide-details=""
					v-model="password"
				></v-text-field>
			</v-card-text>

			<v-card-text>
				<v-btn color="primary" class="mr-4" @click="signInEmail">
					sign-in
				</v-btn>

				<v-btn color="primary" @click="signInWithGoogle">
					<v-icon small class="mr-2">mdi-google</v-icon>
					Sign with Google
				</v-btn>
			</v-card-text>
		</v-card>

		<v-btn color="error" @click="signOut">Sign-Out</v-btn>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			password: '',
			email: '',
			loading: false
		}
	},
	methods: {
		signUp() {
			this.$firebase
				.auth()
				.createUserWithEmailAndPassword(this.form.email, this.form.password)
				.then(result => {
					console.log(result)
					console.log(result.user)
					result.user.updateProfile({
						displayName: this.form.name
					})
				})
		},
		async signInEmail() {
			// eslint-disable-next-line no-unused-vars
			const sn = await this.$firebase
				.auth()
				.signInWithEmailAndPassword(this.email, this.password)
			console.log(sn.user)
		},
		async signInWithGoogle() {
			const provider = new this.$firebase.auth.GoogleAuthProvider()
			this.$firebase.auth().languageCode = 'ko'
			this.loading = true

			try {
				const sn = await this.$firebase.auth().signInWithPopup(provider)
				console.log(sn.user)
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
