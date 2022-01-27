<template>
	<v-card class="mb-6">
		<v-data-table
			:headers="headers"
			:items="items"
			:items-per-page="5"
			:options.sync="options"
			:server-items-length="serverItemsLength"
			must-sort
		>
			<template v-slot:item.action="{ item }">
				<v-btn icon @click="remove(item)">
					<v-icon>mdi-trash-can</v-icon>
				</v-btn>

				<v-btn icon @click="openDialog(item)">
					<v-icon>mdi-pencil-circle-outline</v-icon>
				</v-btn>
			</template>

			<template v-slot:item.createdAt="{ item }">
				{{ item.createdAt.toLocaleString() }}
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
import { head, last } from 'lodash'

export default {
	data() {
		return {
			headers: [
				{ value: 'createdAt', text: 'Date' },
				{ value: 'title', text: 'Product Name' },
				{ value: 'price', text: 'Price' },
				{ value: 'description', text: 'Description' },
				{ value: 'action', text: 'action', sortable: false }
			],
			items: [],
			form: {
				title: '',
				price: '',
				description: ''
			},
			selectedItem: null,
			dialog: false,
			unsubscribe: null,
			unsubscribeCount: null,
			serverItemsLength: 0,
			options: {
				sortBy: ['createdAt'],
				sortDesc: [true]
			},
			docs: []
		}
	},
	watch: {
		options: {
			handler(n, o) {
				const arrow = n.page - o.page
				this.subscribe(arrow)
			},
			deep: true
		}
	},
	created() {},
	destroyed() {
		if (this.unsubscribe) this.unsubscribe()
		if (this.unsubscribeCount) this.unsubscribeCount()
	},
	methods: {
		subscribe(arrow) {
			this.unsubscribeCount = this.$firebase
				.firestore()
				.collection('meta')
				.doc('boards')
				.onSnapshot(doc => {
					if (!doc.exists) return
					this.serverItemsLength = doc.data().count
				})

			const order = head(this.options.sortBy)
			const sort = head(this.options.sortDesc) ? 'desc' : 'asc'
			const limit = this.options.itemsPerPage

			const ref = this.$firebase
				.firestore()
				.collection('boards')
				.orderBy(order, sort)

			let query
			switch (arrow) {
				case -1:
					query = ref.endBefore(head(this.docs)).limitToLast(limit)
					break

				case 1:
					query = ref.startAfter(last(this.docs)).limit(limit)
					break

				default:
					query = ref.limit(limit)
					break
			}

			this.unsubscribe = query.onSnapshot(sn => {
				if (sn.empty) {
					this.items = []
					return
				}

				this.docs = sn.docs

				this.items = sn.docs.map(v => {
					const item = v.data()
					return {
						id: v.id,
						title: item.title,
						price: item.price,
						description: item.description,
						createdAt: item.createdAt.toDate()
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
