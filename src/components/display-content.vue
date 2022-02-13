<template>
	<v-card>
		<v-toolbar dark color="deep-purple lighten-2">
			{{ item.title }}

			<v-spacer></v-spacer>

			<v-btn icon @click="$emit('close')">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-toolbar>

		<v-card-text>
			{{ item.content }}
			<viewer v-if="content" :initialValue="content"></viewer>
		</v-card-text>
	</v-card>
</template>

<script>
import axios from 'axios'
export default {
	props: ['item'],
	data() {
		return {
			content: ''
		}
	},
	mounted() {
		console.log('mounted')
		this.fetch()
	},
	methods: {
		async fetch() {
			const r = await axios.get(this.item.content)
			this.content = r.data
		}
	}
}
</script>
