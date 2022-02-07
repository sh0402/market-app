<template>
	<v-container>
		<v-card>
			<v-toolbar class="d-flex text-center justify-center">
				<v-toolbar-title> 제품등록 </v-toolbar-title>
			</v-toolbar>

			<v-card-text>
				<v-text-field
					dense
					outlined
					label="Product Name"
					v-model="form.title"
				></v-text-field>

				<v-text-field
					dense
					outlined
					label="Price"
					v-model="form.price"
				></v-text-field>

				<v-text-field
					dense
					outlined
					label="Description"
					v-model="form.description"
				></v-text-field>
			</v-card-text>

			<v-card-text>
				<v-btn @click="add">add</v-btn>
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script>
export default {
	props: ['document', 'action'],
	data() {
		return {
			items: [],
			form: {
				title: '',
				price: '',
				description: ''
			},
			unsubscribe: null,
			selectedItem: null,
			ref: null,
			loading: false
		}
	},
	created() {
		this.subscribe()
	},
	destroyed() {
		if (this.unsubscribe) this.unsubscribe()
	},

	methods: {
		subscribe() {
			this.ref = this.$firebase
				.firestore()
				.collection('boards')
				.doc(this.document)
		}
		// async add() {
		// 	const item = {}
		// 	Object.assign(item, this.form)
		// 	item.createdAt = new Date()
		// 	try {
		// 		this.$firebase.firestore().collection('boards').add(item)
		// 	} finally {
		// 		this.form.title = ''
		// 		this.form.price = ''
		// 		this.form.description = ''
		// 	}
		// }
	}
}
</script>
