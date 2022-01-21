<template>
	<v-container>
		<v-card flat>
			<!-- <v-card-title class="font-weight-bold">
				Sign-In

				<v-spacer></v-spacer>

				<span
					class="text-subtitle-2 primary--text"
					@click="$emit('changeType')"
				>
					Sign-Up
				</span>
			</v-card-title> -->

			<v-card-text class="text-h4 font-weight-bold text-center my-4">
				<p class="mb-0">Market App</p>
				<p class="mb-0">Portfolio</p>
			</v-card-text>

			<v-card flat rounded="lg" class="mx-4">
				<v-img src="https://picsum.photos/300"></v-img>
			</v-card>

			<v-card-text>
				<v-btn block rounded depressed color="primary" class="mt-4">
					<v-icon small class="mr-2">mdi-google</v-icon>
					Google Log-In
				</v-btn>
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script>
export default {
	data() {
		return {}
	}
}
</script>
