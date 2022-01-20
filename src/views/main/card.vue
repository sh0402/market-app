<template>
	<v-card flat>
		<v-row dense>
			<v-col cols="6" v-for="(card, i) in cards" :key="i">
				<v-card flat>
					<v-img src="https://picsum.photos/200"></v-img>

					<v-card-title class="d-flex flex-column align-start font-weight-bold">
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
