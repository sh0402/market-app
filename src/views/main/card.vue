<template>
	<v-card flat>
		<v-row dense>
			<v-col cols="6" v-for="item in 4" :key="item">
				<v-card flat>
					<v-img src="https://picsum.photos/200"></v-img>

					<v-card-title class="d-flex flex-column align-start font-weight-bold">
						item.price + '원'
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
		return {}
	}
}
</script>
