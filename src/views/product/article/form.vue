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

				<v-btn icon color="primary" @click="save">등록</v-btn>
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

				<editor></editor>
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script>
import Editor from '../../editor.vue'

export default {
	components: { Editor },
	props: ['document', 'action'],
	data() {
		return {
			items: [],
			form: {
				title: '',
				category: '',
				price: '',
				description: ''
			},
			unsubscribe: null,
			selectedItem: null,
			exists: false,
			ref: null,
			loading: false
		}
	},
	computed: {
		articleId() {
			return this.$route.query.articleId
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
			console.log(this.articleId)
			this.ref = this.$firebase
				.firestore()
				.collection('boards')
				.doc(this.document)
			if (!this.articleId) return
			if (this.unsubscribe) this.unsubscribe()
			this.unsubscribe = this.ref
				.collection('articles')
				.doc(this.articleId)
				.onSnapshot(doc => {
					this.exists = doc.exists
					if (this.exists) {
						const item = doc.data()
						this.form.title = item.title
						this.form.category = item.category
						this.form.price = item.price
						this.form.description = item.description
					}
				})
		},
		async save() {
			this.loading = true
			try {
				const createdAt = new Date()
				const id = createdAt.getTime().toString()
				const doc = {
					title: this.form.title,
					category: this.form.category,
					price: this.form.price,
					description: this.form.description,
					updatedAt: createdAt
				}
				const batch = await this.$firebase.firestore().batch()
				if (!this.articleId) {
					doc.createdAt = createdAt
					doc.commentCount = 0
					batch.set(this.ref.collection('articles').doc(id), doc)
					batch.update(this.ref, {
						count: this.$firebase.firestore.FieldValue.increment(1)
					})
				} else {
					batch.update(this.ref.collection('article').doc(this.articleId), doc)
				}
				await batch.commit()
			} finally {
				this.loading = false
				this.$router.push('/product/' + this.document)
			}
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
