<template>
	<v-toolbar-title app color="primary" dark>
		{{ title }}

		<v-btn icon small @click="openDialog">
			<v-icon small> mdi-dots-vertical </v-icon>
		</v-btn>

		<v-dialog v-model="dialog" max-width="500">
			<v-card>
				<v-card-title>
					Title Edit

					<v-spacer></v-spacer>

					<v-btn icon small @click="close">
						<v-icon> mdi-close </v-icon>
					</v-btn>
				</v-card-title>

				<v-card-actions>
					<v-text-field v-model="text" label="title" outlined hide-details="">
					</v-text-field>
				</v-card-actions>

				<v-card-actions class="pb-4">
					<v-spacer />
					<v-btn @click="save" color="success"> save </v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-toolbar-title>
</template>

<script>
export default {
	props: ['title'],

	data() {
		return {
			dialog: false,
			text: this.title
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
					.update({ title: this.text })
			} catch (e) {
				console.log(e.message)
			} finally {
				this.dialog = false
			}
		},
		close() {
			this.dialog = false
		}
	}
}
</script>
