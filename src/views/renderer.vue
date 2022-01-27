<template>
	<v-card>
		{{ $route.params }}

		{{ collection }} -
		{{ document }}
	</v-card>
</template>

<script>
export default {
	computed: {
		collection() {
			return this.$route.params.collection
		},
		document() {
			return this.$route.params.document
		}
	}
}
</script>
