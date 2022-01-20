<template>
	<v-card> Product page </v-card>
</template>

<script>
export default {
	computed: {
		productId() {
			return this.$route.params.productId
		}
	},
	data() {
		return {}
	},
	created() {
		console.log('router', this.$router)
		console.log('route', this.$route)
	}
}
</script>
