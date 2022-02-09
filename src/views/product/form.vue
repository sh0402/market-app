<template>
	<v-container class="px-0">
		<v-form>
			<v-toolbar flat dense>
				<v-toolbar-title>Product</v-toolbar-title>

				<v-spacer />

				<v-btn icon @click="$router.push('/product/' + document)">
					<v-icon>mdi-arrow-left</v-icon>
				</v-btn>

				<v-btn icon @click="save">
					<v-icon>mdi-content-save</v-icon>
				</v-btn>
			</v-toolbar>

			<v-card :loading="loading">
				<v-card-text>
					<v-text-field
						v-model="form.category"
						outlined
						label="종류"
					></v-text-field>

					<v-text-field
						v-model="form.title"
						outlined
						label="제목"
					></v-text-field>

					<v-textarea
						v-model="form.description"
						outlined
						label="설명"
					></v-textarea>
				</v-card-text>
			</v-card>
		</v-form>
	</v-container>
</template>

<script>
export default {
	props: ['document', 'action'],
	data() {
		return {
			form: {
				category: '',
				title: '',
				description: ''
			},
			unsubscribe: null,
			exists: false,
			ref: null,
			loading: false
		}
	},
	watch: {
		document() {
			this.subscribe()
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
			if (this.unsubscribe) this.unsubsribe()
			this.ref = this.$firebase
				.firestore()
				.collection('boards')
				.doc(this.document)
			this.unsubscribe = this.ref.onSnapshot(doc => {
				this.exists = doc.exists
				if (this.exists) {
					const item = doc.data()
					this.form.category = item.category
					this.form.title = item.title
					this.form.description = item.description
				}
			})
		},
		async save() {
			const form = {
				category: this.form.category,
				title: this.form.title,
				description: this.form.description,
				updatedAt: new Date()
			}
			this.loading = true
			try {
				if (!this.exists) {
					form.createdAt = new Date()
					form.count = 0
					await this.ref.set(form)
				} else {
					this.ref.update(form)
				}
				this.$router.push('/product/' + this.document)
			} finally {
				this.loading = false
			}
		}
	}
}
</script>
