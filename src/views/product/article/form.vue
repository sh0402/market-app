<template>
	<v-container class="px-0">
		<v-card flat>
			<v-toolbar flat>
				<v-btn icon @click="$router.push('/product/' + document)">
					<v-icon>mdi-chevron-left</v-icon>
				</v-btn>

				<v-spacer></v-spacer>

				<v-toolbar-title> 제품등록 </v-toolbar-title>

				<v-spacer></v-spacer>

				<v-btn icon color="primary" @click="add">등록</v-btn>
			</v-toolbar>

			<v-card-text>
				<v-text-field
					dense
					outlined
					label="상품명"
					v-model="form.title"
				></v-text-field>

				<v-text-field
					dense
					outlined
					label="카테고리"
					v-model="form.category"
				></v-text-field>

				<v-text-field
					dense
					outlined
					label="₩ 가격"
					v-model="form.price"
				></v-text-field>

				<v-textarea
					dense
					outlined
					no-resize
					height="400"
					label="등록할 제품의 내용을 작성해주세요."
					v-model="form.description"
				></v-textarea>
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
