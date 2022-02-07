<template>
	<!-- <v-data-table :headers="headers" :items="items"></v-data-table> -->

	<v-list two-line>
		<v-list-item-group>
			<template v-for="(item, i) in items">
				<v-list-item :key="item.title">
					<v-list-item-content>
						<v-list-item-title v-text="item.title"></v-list-item-title>

						<v-list-item-subtitle> {{ item.content }}</v-list-item-subtitle>
					</v-list-item-content>

					<v-list-item-action>
						<v-list-item-subtitle
							v-text="item.createdAt"
						></v-list-item-subtitle>
					</v-list-item-action>
				</v-list-item>

				<v-divider v-if="i < items.length - 1" :key="i"></v-divider>
			</template>
		</v-list-item-group>
	</v-list>
</template>

<script>
export default {
	props: ['info', 'document'],
	data() {
		return {
			headers: [
				{ value: 'createdAt', text: '작성일' },
				{ value: 'title', text: '제목' }
			],
			items: [],
			unsubscribe: null
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
				.collection('articles')

			this.unsubscribe = ref.onSnapshot(sn => {
				if (sn.empty) {
					this.items = []
					return
				}
				this.docs = sn.docs
				this.items = sn.docs.map(doc => {
					const item = doc.data()
					item.id = doc.id
					item.createdAt = item.createdAt.toDate()
					item.updatedAt = item.updatedAt.toDate()
					return item
				})
			})
		}
	}
}
</script>
