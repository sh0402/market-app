<template>
	<v-container class="pa-0">
		<v-card flat>
			<!-- <v-card-text>
				<v-sheet
					outlined
					rounded=""
					style="border-color: rgba(133, 133, 133, 0.8)"
					class="mb-6 pa-2"
				>
					<v-img height="150"></v-img>
				</v-sheet>

				<v-text-field
					dense
					outlined
					prepend-inner-icon="mdi-camera"
					v-model="imageName"
				></v-text-field>
				<input type="file" style="display: none" ref="image" accept="image/*" />

				<v-text-field
					dense
					outlined
					label="Product Name"
					v-model="form.title"
				></v-text-field>

				<v-text-field
					dense
					outlined
					label="Product Category"
					v-model="form.title"
				></v-text-field>

				<v-text-field
					dense
					outlined
					label="Product Tag"
					v-model="form.title"
				></v-text-field>

				<v-text-field
					dense
					outlined
					label="Product Price"
					v-model="form.price"
				></v-text-field>

				<v-textarea
					dense
					outlined
					label="Product Description"
					v-model="form.description"
					hide-details=""
				></v-textarea>
			</v-card-text> -->

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

				<v-select dense outlined :items="items" label="Category"></v-select>

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

				<v-combobox
					dense
					outlined
					multiple
					small-chips
					hide-details=""
					label="Tag"
					solo
					flat
					:items="items"
				>
					<template v-slot:no-data>
						<v-list-item>
							<span>Create</span>
							<v-chip label small :color="`${colors[nonce - 1]} lighten-3`">
								{{ search }}
							</v-chip>
						</v-list-item>
					</template>

					<template v-slot:selection="{ attrs, item, parent, selected }">
						<v-chip
							label
							small
							:attrs="attrs"
							:color="`${item.color} lighten-3`"
							:input-value="selected"
							v-if="item === Object(item)"
						>
							<span class="pr-1"> {{ item.text }} </span>
							<v-icon small @click="parent.selectItem(item)"> $delete </v-icon>
						</v-chip>
					</template>
				</v-combobox>
			</v-card-text>
			<v-card-text>
				<v-btn color="primary">save</v-btn>
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			model: [{ text: 'Foo', color: 'blue' }],
			items: [
				{
					text: 'Foo',
					color: 'blue'
				},
				{
					text: 'Bar',
					color: 'orange'
				},
				{
					text: 'Fizz',
					color: 'red'
				},
				{
					text: 'Buzz',
					color: 'purple'
				},
				{
					text: 'FizzBuzz',
					color: 'indigo'
				}
			],
			colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
			form: {
				title: '',
				price: '',
				description: '',
				date: new Date(),
				images: []
			},
			nonce: 1,
			search: null,
			editing: null,
			editingIndex: -1,
			imageName: '',
			imageUrl: '',
			imageFile: '',
			imgUrls: []
		}
	},

	watch: {
		model(val, prev) {
			if (val.length === prev.length) return
			this.model = val.map(v => {
				if (typeof v === 'string') {
					v = {
						text: v,
						color: this.color[this.nonce - 1]
					}
					this.tags.push(v)

					this.nonce++
				}
				return v
			})
		}
	},
	methods: {
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
		}
	}
}
</script>
