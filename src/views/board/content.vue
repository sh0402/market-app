<template>
	<v-container class="px-0">
		<v-toolbar flat dense>
			<v-toolbar-title>
				{{ info.title }}
			</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-btn icon @click="write" v-if="user">
				<v-icon>mdi-dots-vertical</v-icon>
			</v-btn>

			<v-btn color="primary" @click="articleWrite"> write </v-btn>
		</v-toolbar>

		<!-- <v-card-text v-if="info.createdAt">
				<v-alert outlined>
					<div style="white-space: pre-line">{{ info.description }}</div>
					<div>작성일 : {{ info.createdAt.toDate().toLocaleString() }}</div>
					<div>수정일 : {{ info.updatedAt.toDate().toLocaleString() }}</div>
				</v-alert>
			</v-card-text> -->

		<board-article :info="info" :document="document"></board-article>
	</v-container>
</template>

<script>
import BoardArticle from './article/index'

export default {
	components: { BoardArticle },
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
	computed: {
		user() {
			return this.$store.state.user
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
			console.log('notice-index')
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
			this.$router.push(this.$route.path + '/board-write')
		},
		async articleWrite() {
			this.$router.push({
				path: this.$route.path + '/article-write',
				query: { articleId: '' }
			})
		}
	}
}
</script>
