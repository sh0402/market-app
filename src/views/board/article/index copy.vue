<template>
	<v-data-table
		:headers="headers"
		:items="items"
		:server-items-length="info.count"
		:options.sync="options"
		:items-per-page="5"
		:footer-props="{
			'items-per-page-options': [5, 10, 20, 30, 50]
		}"
		must-sort
		item-key="id"
	></v-data-table>

	<!-- <v-list two-line>
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
	</v-list> -->
</template>

<script>
import { head, last } from 'lodash'

export default {
	props: ['info', 'document'],
	data() {
		return {
			headers: [
				{ value: 'createdAt', text: '작성일' },
				{ value: 'title', text: '제목' },
				{ value: 'content', text: '설명' }
			],
			items: [],
			unsubscribe: null,
			options: {
				sortBy: ['createdAt'],
				sortDesc: [true]
			},
			docs: []
		}
	},
	watch: {
		document() {
			this.subscribe(0)
		},
		options: {
			handler(n, o) {
				if (!o.page) {
					this.subscribe(0)
					return
				}
				if (
					head(o.sortBy) !== head(n.sortBy) ||
					head(o.sortDesc) !== head(n.sortDesc)
				) {
					n.page = 1
					this.subscribe(0)
					return
				}
				const arrow = n.page - o.page
				this.subscribe(arrow)
			},
			deep: true
		}
	},
	created() {
		// this.subscribe()
	},
	destroyed() {
		if (this.unsubscribe) this.unsubscribe()
	},
	methods: {
		subscribe(arrow) {
			if (this.unsubscribe) this.unsubscribe()

			const order = this.options.sortBy[0]
			const sort = this.options.sortDesc[0] ? 'desc' : 'asc'
			const limit = this.options.itemsPerPage
			const ref = this.$firebase
				.firestore()
				.collection('boards')
				.doc(this.document)
				.collection('articles')
				.orderBy(order, sort)

			let query
			switch (arrow) {
				case -1:
					query = ref.endBefore(head(this.docs)).limitToLast(limit)
					break

				case 1:
					query = ref.startAfter(last(this.docs)).limit(limit)
					break

				default:
					query = ref.limit(limit)
					break
			}

			this.unsubscribe = query.onSnapshot(sn => {
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
