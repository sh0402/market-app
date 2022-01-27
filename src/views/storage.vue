<template>
	<v-card>
		<v-card-title>storage page</v-card-title>
		<v-textarea v-model="text"> </v-textarea>
		<v-btn @click="read">read</v-btn>
		<v-btn @click="save">save</v-btn>
	</v-card>
</template>

<script>
import axios from 'axios'

export default {
	data() {
		return {
			text: '',
			url: ''
		}
	},
	methods: {
		async save() {
			const sn = await this.$firebase
				.storage()
				.ref()
				.child('xxx.text')
				.putString('abcd')
			const url = await sn.ref.getDownloadURL()

			this.url = url
		},
		async read() {
			const r = await axios.get(this.url)
			console.log(r)

			this.text = r.data
		}
	}
}
</script>
