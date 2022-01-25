<template>
	<v-card class="mb-6">
		<v-data-table :headers="headers" :items="items">
			<template v-slot:item.action="{ item }">
				<v-btn icon @click="remove(item)">
					<v-icon>mdi-trash-can</v-icon>
				</v-btn>

				<v-btn icon @click="openDialog(item)">
					<v-icon>mdi-pencil-circle-outline</v-icon>
				</v-btn>
			</template>
		</v-data-table>

		<v-dialog v-model="dialog">
			<v-card>
				<v-card-title>Edit</v-card-title>

				<v-card>
					<v-card-title> Product Write </v-card-title>
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
						<v-btn @click="add" v-if="!this.selectedItem">add</v-btn>
						<v-btn @click="update" v-else>update</v-btn>
					</v-card-text>
				</v-card>
			</v-card>
		</v-dialog>
	</v-card>
</template>

<script>
export default {
	data() {
		return {
			headers: [
				{ value: 'title', text: 'Product Name' },
				{ value: 'price', text: 'Price' },
				{ value: 'description', text: 'Description' },
				{ value: 'action', text: 'action' }
			],
			items: [],
			form: {
				title: '',
				price: '',
				description: ''
			},
			selectedItem: null,
			dialog: false,
			unsubscribe: null
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
			console.log('here')
			this.unsubscribe = this.$firebase
				.firestore()
				.collection('boards')
				.onSnapshot(sn => {
					if (sn.empty) {
						this.items = []
						return
					}
					this.items = sn.docs.map(v => {
						const item = v.data()
						return {
							id: v.id,
							title: item.title,
							price: item.price,
							description: item.description
						}
					})
				})
		},
		openDialog(item) {
			this.selectedItem = item
			this.dialog = true

			if (!item) {
				this.form.title = ''
				this.form.price = ''
				this.form.description = ''
			} else {
				this.form.title = item.title
				this.form.price = item.price
				this.form.description = item.description
			}
		},
		add() {
			this.$firebase.firestore().collection('boards').add(this.form)
			this.dialog = false
		},
		update() {
			this.$firebase
				.firestore()
				.collection('boards')
				.doc(this.selectedItem.id)
				.update(this.form)
			this.dialog = false
		},
		remove(item) {
			console.log('delete')
			this.$firebase.firestore().collection('boards').doc(item.id).delete()
		}
	}
}
</script>
