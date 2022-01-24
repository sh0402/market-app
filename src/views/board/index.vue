<template>
	<v-container>
		<v-card flat>
			<v-card-title> Board title </v-card-title>
			<v-row dense class="px-4">
				<v-col cols="6" v-for="(item, i) in items" :key="i">
					<v-card flat>
						<v-img src="https://picsum.photos/200"></v-img>

						<v-card-title class="d-flex align-start font-weight-bold">
							{{ item.price + '원' }}

							<v-spacer />

							<v-btn icon small @click="seletItem(item)">
								<v-icon small> mdi-dots-vertical </v-icon>
							</v-btn>
						</v-card-title>

						<v-card-subtitle class="pb-0">
							<span class="text-subtitle-2 grey--text">
								{{ item.title }}
							</span>
						</v-card-subtitle>

						<v-card-subtitle class="d-flex justify-space-between align-center">
							address · date

							<v-btn icon small>
								<v-icon small>mdi-heart</v-icon>
							</v-btn>
						</v-card-subtitle>
					</v-card>
				</v-col>
			</v-row>
		</v-card>

		<v-card>
			<v-card-title> Write </v-card-title>

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
				<v-btn @click="update" v-else>add</v-btn>
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			dialog: false,
			headers: [{ value: 'action', text: 'action' }],
			items: [],
			form: {
				title: '',
				price: '',
				description: ''
			},
			unsubscribe: null,
			selectedItem: null
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
		openDialog() {
			this.dialog = true
		},
		selectItem(item) {
			this.selectedItem = item

			this.form.title = item.title
			this.form.price = item.price
			this.form.description = item.description
		},
		add(item) {
			this.selectedItem = item
			this.$firebase.firestore().collection('boards').add(this.form)

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
		async update() {
			try {
				this.$firebase
					.firestore()
					.collection('boards')
					.doc(this.selectedItem.id)
					.update(this.form)
			} finally {
				this.form.title = ''
				this.form.price = ''
				this.form.description = ''

				this.selectedItem = null
			}
		}
	}
}
</script>
