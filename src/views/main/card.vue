<template>
	<v-container>
		<v-card flat class="pa-2">
			<v-row dense>
				<v-col cols="3" v-for="(item, i) in items" :key="i">
					<v-card :to="`${$route.path}`">
						<v-card-subtitle class="d-flex flex-column text-center">
							<v-icon>mdi-emoticon</v-icon>
							<span class="font-weight-bold">{{ item.title }}</span>
						</v-card-subtitle>
					</v-card>
				</v-col>
			</v-row>
		</v-card>

		<v-card flat class="pa-2">
			<v-card-title class="font-weight-bold px-0">
				title

				<v-spacer></v-spacer>
				<v-btn
					depressed
					dark
					color="orange"
					:to="`${$route.path}/product/form`"
				>
					upload
				</v-btn>
			</v-card-title>

			<v-row dense>
				<v-col cols="6" v-for="(card, i) in cards" :key="i">
					<v-card>
						<v-img src="https://picsum.photos/200"></v-img>

						<v-card-title
							class="d-flex flex-column align-start font-weight-bold"
						>
							{{ card.price + '원' }}
							<span class="text-subtitle-2 grey--text">user-id</span>
						</v-card-title>

						<v-card-subtitle class="d-flex justify-space-between align-center">
							address · date

							<v-btn icon small>
								<v-icon small>mdi-heart</v-icon>
							</v-btn>
						</v-card-subtitle>
					</v-card>
				</v-col>
			</v-row>
		</v-card>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			items: [
				{ title: 'title1' },
				{ title: 'title2' },
				{ title: 'title3' },
				{ title: 'title4' },
				{ title: 'title5' },
				{ title: 'title6' },
				{ title: 'title7' },
				{ title: 'title8' }
			],
			cards: [
				{ price: '2000' },
				{ price: '4000' },
				{ price: '1000' },
				{ price: '6000' }
			]
		}
	}
}
</script>
