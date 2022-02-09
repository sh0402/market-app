<template>
	<v-container>
		<v-row dense>
			<v-col cols="6" v-for="(item, i) in items" :key="i">
				<v-card flat>
					<v-img src="https://picsum.photos/200"></v-img>

					<v-card-title class="d-flex align-center font-weight-bold">
						{{ item.price + '원' }}

						<v-spacer />

						<v-menu offset-y left>
							<template v-slot:activator="{ on }">
								<v-icon v-on="on"> mdi-dots-vertical </v-icon>
							</template>

							<v-card width="120">
								<v-list nav>
									<v-btn block text small> Edit </v-btn>
									<v-btn block text small color="error"> Delete </v-btn>
								</v-list>
							</v-card>
						</v-menu>
					</v-card-title>

					<v-card-subtitle class="pb-0">
						<span class="text-subtitle-2 grey--text"> {{ item.title }} </span>
					</v-card-subtitle>

					<v-card-subtitle class="d-flex justify-space-between align-center">
						address · date

						<v-btn icon small>
							<v-icon small>mdi-heart</v-icon>
						</v-btn>
					</v-card-subtitle>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	props: ['info', 'document'],
	data() {
		return {
			items: [],
			unsubscribe: null,
			docs: []
		}
	},
	// watch: {
	// 	document() {
	// 		this.subscribe()
	// 	}
	// },
	created() {
		this.subscribe()
	},
	destroyed() {
		if (this.unsubscribe) this.unsubscribe()
	},
	methods: {
		subscribe() {
			if (this.unsubscribe) this.unsubscribe()
			this.unsubscribe = this.$firebase
				.firestore()
				.collection('boards')
				.doc(this.document)
				.collection('articles')
				.onSnapshot(sn => {
					if (sn.empty) {
						this.items = []
						return
					}
					this.docs = sn.docs
					this.items = sn.docs.map(doc => {
						console.log(doc.data())
						const item = doc.data()
						return item
					})
				})
		}
	}
}
</script>
