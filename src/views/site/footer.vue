<template>
	<v-footer app footer color="primary" dark class="pb-6 justify-space-between">
		<div class="d-flex flex-column align-center">
			<v-btn depressed large color="transparent" to="/">
				<v-icon> mdi-home </v-icon>
			</v-btn>
			<span class="text-caption">홈</span>
		</div>

		<div class="d-flex flex-column align-center">
			<v-btn depressed large color="transparent">
				<v-icon> mdi-magnify </v-icon>
			</v-btn>
			<span class="text-caption">검색</span>
		</div>

		<div class="d-flex flex-column align-center">
			<v-btn depressed large color="transparent" @click="articleWrite">
				<v-icon> mdi-plus </v-icon>
			</v-btn>
			<span class="text-caption">등록</span>
		</div>

		<div class="d-flex flex-column align-center">
			<v-btn depressed large color="transparent">
				<v-icon> mdi-chat-processing </v-icon>
			</v-btn>
			<span class="text-caption">채팅</span>
		</div>

		<div class="d-flex flex-column align-center">
			<v-btn depressed large color="transparent">
				<v-icon> mdi-account </v-icon>
			</v-btn>
			<span class="text-caption">MY</span>
		</div>
	</v-footer>
	<!-- <v-footer
		color="primary"
		dark
		class="justify-center px-0 py-0"
		:footer="footer"
	>
		<v-card color="transparent">
			<v-card-text class="text-center pb-0">
				<v-btn v-for="icon in 4" :key="icon" class="mx-4 white--text" icon>
					<v-icon size="24px"> mdi-one-up </v-icon>
				</v-btn>
			</v-card-text>

			<v-card-text class="text-center">
				Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
				Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
				accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a
				sit amet dui.
			</v-card-text>

			<v-divider></v-divider>

			<v-card-text class="text-center">
				&copy; {{ new Date().getFullYear() + ' ' }}
				<strong>{{ footer }}</strong>

				<v-btn icon small @click="openDialog">
					<v-icon small> mdi-dots-vertical </v-icon>
				</v-btn>
			</v-card-text>
		</v-card>

		<v-dialog v-model="dialog" max-width="500">
			<v-card>
				<v-card-title>
					Footer Edit

					<v-spacer></v-spacer>

					<v-btn icon small @click="close">
						<v-icon> mdi-close </v-icon>
					</v-btn>
				</v-card-title>

				<v-card-actions>
					<v-text-field v-model="text" label="Footer" outlined hide-details="">
					</v-text-field>
				</v-card-actions>

				<v-card-actions class="pb-4">
					<v-spacer />
					<v-btn @click="save" color="success"> save </v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-footer> -->
</template>

<script>
export default {
	props: ['footer'],
	data() {
		return {
			dialog: false,
			text: this.footer
		}
	},
	methods: {
		openDialog() {
			this.dialog = true
		},
		async save() {
			try {
				this.$firebase
					.database()
					.ref()
					.child('site')
					.update({ footer: this.text })
			} catch (e) {
				console.log(e.message)
			} finally {
				this.dialog = false
			}
		},
		close() {
			this.dialog = false
		},
		async articleWrite() {
			this.$router.push({
				path: '/product/product/article-write',
				query: { ariticleId: '' }
			})
		}
	}
}
</script>
