<template>
	<v-container>
		<v-card width="500" class="mx-auto mb-4">
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
					label="Product Price"
					v-model="form.price"
				></v-text-field>

				<v-row>
					<v-col cols="6">
						<v-text-field
							dense
							outlined
							label="Select File"
							v-model="imageName"
							@click="pickFile"
						></v-text-field>
						<input
							type="file"
							style="display: none"
							ref="image"
							accept="image/*"
							@change="onFilePicked"
						/>
					</v-col>

					<v-col cols="6">
						<v-sheet
							outlined
							rounded=""
							style="border-color: rgba(133, 133, 133, 0.8)"
							class="mb-6 pa-2"
						>
							<v-img width="150" height="150" :src="imageUrl"></v-img>
						</v-sheet>
					</v-col>
				</v-row>

				<v-textarea
					dense
					outlined
					label="Product Description"
					v-model="form.description"
					hide-details=""
				></v-textarea>
			</v-card-text>

			<v-card-text>
				<v-btn color="primary" @click="save">save</v-btn>
			</v-card-text>
		</v-card>

		<v-card
			width="500"
			class="mx-auto mb-4"
			v-for="(item, i) in items"
			:key="i"
		>
			<v-card-text>
				<v-img :src="item.images"></v-img>
			</v-card-text>

			<v-card-text>
				<v-card-title> Product name: {{ item.title }} </v-card-title>
				<v-card-subtitle> Date: {{ item.date }} </v-card-subtitle>
			</v-card-text>

			<v-card-text>
				<v-card-title> Price: {{ item.price }} </v-card-title>
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			items: [],
			form: {
				title: '',
				price: '',
				description: '',
				date: new Date(),
				images: []
			},
			imageName: '',
			imageUrl: '',
			imageFile: '',
			imgUrls: []
		}
	},
	created() {
		this.read()
	},
	methods: {
		async read() {
			const sn = await this.$firebase.firestore().collection('products').get()
			sn.docs.forEach(doc => {
				console.log(doc.id)
				console.log(doc.data())
			})
			this.items = sn.docs.map(doc => {
				const item = doc.data()
				return {
					id: doc.id,
					title: item.title,
					price: item.price,
					description: item.description,
					date: item.date,
					images: item.images
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
			}
		},
		async save() {
			try {
				var storageRef = this.$firebase.storage().ref()
				var mountainsRef = storageRef
					.child('images/')
					.child(new Date().getTime() + '-' + `${this.imageName}`)
				var uploadFile = mountainsRef.put(this.imageFile)
				uploadFile.on(
					'state_changed',
					// 변화시 동작하는 함수
					null,
					// 에러시 동작하는 함수
					error => {
						console.log('실패사유는', error)
					},
					// 성공시 동작하는 함수
					() => {
						uploadFile.snapshot.ref.getDownloadURL().then(url => {
							this.form.images = url
							this.$firebase.firestore().collection('products').add(this.form)
						})
					}
				)
			} catch (error) {
				console.log(error.message)
			} finally {
				this.$router.push('/')
			}
		}
	}
}
</script>
