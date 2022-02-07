<template>
	<v-container class="px-0">
		<v-toolbar flat dense>
			<v-toolbar-title>
				{{ info.title }}
			</v-toolbar-title>

			<v-spacer />

			<v-btn icon @click="write">
				<v-icon>mdi-dots-vertical</v-icon>
			</v-btn>

			<v-btn color="primary" @click="articleWrite"> write </v-btn>
		</v-toolbar>

		<product-article :info="info" :document="document"></product-article>
	</v-container>
</template>

<script>
import ProductArticle from './article/index'

export default {
	components: { ProductArticle },
	props: ['document'],
	data() {
		return {
			unsubscribe: null,
			info: {
				category: '',
				title: '',
				description: ''
			},
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
			if (this.unsubscribe) this.unsubscribe()
			const ref = this.$firebase
				.firestore()
				.collection('boards')
				.doc(this.document)
			this.unsubscribe = ref.onSnapshot(doc => {
				if (!doc.exists) return this.write()
				this.info = doc.data()
			})
		},
		async write() {
			this.$router.push(this.$route.path + '/product-write')
		},
		async articleWrite() {
			this.$router.push({
				path: this.$route.path + '/article-write',
				query: { ariticleId: '' }
			})
		}
	}
}
</script>
