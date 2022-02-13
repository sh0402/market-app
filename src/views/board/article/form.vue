<template>
	<v-container fluid>
		<v-form>
			<v-toolbar color="accent" dense flat dark>
				<v-toolbar-title>게시판 as 작성</v-toolbar-title>

				<v-spacer />

				<v-btn icon @click="$router.push('/board/' + document)">
					<v-icon>mdi-arrow-left</v-icon>
				</v-btn>

				<v-btn icon @click="save">
					<v-icon>mdi-content-save</v-icon>
				</v-btn>
			</v-toolbar>

			<v-card :loading="loading">
				<v-card-text>
					<v-row dense>
						<v-col cols="6">
							<v-card outlined height="150" class="mb-6">
								<v-img height="100%" :src="imageUrl"></v-img>
							</v-card>
						</v-col>

						<v-col cols="6">
							<v-card
								dense
								outlined
								height="150"
								class="d-flex justify-center align-center"
								v-model="imageName"
								@click="pickFile"
							>
								<v-icon> mdi-camera </v-icon>
							</v-card>

							<input
								type="file"
								style="display: none"
								ref="image"
								accept="image/*"
								@change="onFilePicked"
							/>
						</v-col>
					</v-row>

					<v-text-field
						dense
						v-model="form.title"
						outlined
						label="제목"
					></v-text-field>

					<v-textarea
						dense
						v-model="form.content"
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
				title: '',
				content: '',
				imageUrl: ''
			},
			imageName: '',
			imageUrl: '',
			imageFile: '',
			imgUrls: [],
			unsubscribe: null,
			exists: false,
			ref: null,
			loading: false
		}
	},
	computed: {
		articleId() {
			return this.$route.query.articleId
		},
		user() {
			return this.$store.state.user
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
			if (this.unsubscribe) this.unsubsribe()
			this.unsubscribe = this.ref
				.collection('articles')
				.doc(this.articleId)
				.onSnapshot(doc => {
					this.exists = doc.exists
					if (this.exists) {
						const item = doc.data()
						this.form.title = item.title
						this.form.content = item.content
					}
				})
		},
		pickFile() {
			this.$refs.image.click()
		},
		onFilePicked(e) {
			const files = e.target.files
			if (files[0] !== undefined) {
				this.imageName = files[0].name
				if (this.imageName.lastIndexOf('.') <= 0) {
					return
				}

				const fr = new FileReader()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageUrl = fr.result
					this.imageFile = files[0]
				})
			} else {
				this.imageName = ''
				this.imageFile = ''
				this.imageUrl = ''
			}
		},
		async save() {
			this.loading = true
			try {
				const createdAt = new Date()
				const id = createdAt.getTime().toString()
				const doc = {
					title: this.form.title,
					content: this.form.content,
					updatedAt: createdAt
				}

				const batch = await this.$firebase.firestore().batch()

				if (!this.articleId) {
					doc.createdAt = createdAt
					doc.commentCount = 0
					doc.readCount = 0
					doc.uid = this.$store.state.fireUser.uid
					doc.user = {
						email: this.user.email,
						photoURL: this.user.photoURL,
						displayName: this.user.displayName
					}
					doc.imageUrl = this.form.imageUrl
					batch.set(this.ref.collection('articles').doc(id), doc)
					batch.update(this.ref, {
						count: this.$firebase.firestore.FieldValue.increment(1)
					})
				} else {
					batch.update(this.ref.collection('articles').doc(this.articleId), doc)
				}

				await batch.commit()
			} finally {
				this.loading = false
				this.$router.push('/board/' + this.document)
			}
			// const form = {
			// 	category: this.form.category,
			// 	title: this.form.title,
			// 	description: this.form.description,
			// 	updatedAt: new Date()
			// }
			// this.loading = true
			// try {
			// 	if (!this.exists) {
			// 		form.createdAt = new Date()
			// 		form.count = 0
			// 		await this.ref.set(form)
			// 	} else {
			// 		this.ref.update(form)
			// 	}
			// 	this.$router.push('/board/' + this.document)
			// } finally {
			// 	this.loading = false
			// }
		}
	}
}
</script>
