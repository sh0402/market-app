<template>
	<v-card tile elevation="0">
		<v-img src="https://picsum.photos/200"></v-img>

		<v-card-title>
			000원
			<v-chip small label class="ml-2">라벨</v-chip>
		</v-card-title>

		<v-card-subtitle>
			<span class="success--text">안전</span> 타이틀
		</v-card-subtitle>

		<v-card-text> 디테일 페이지 내용 디테일한 내용이네요 </v-card-text>

		<v-card-text>
			<v-chip
				small
				label
				outlined
				color="primary"
				v-for="n in 5"
				:key="n"
				class="mr-2"
				>#태그</v-chip
			>
		</v-card-text>
	</v-card>
</template>

<script>
export default {
	data() {
		return {}
	},
	created() {
		console.log('router', this.$router)
		console.log('route', this.$route)
	}
}
</script>
