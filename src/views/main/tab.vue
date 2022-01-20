<template>
	<v-container>
		<v-card flat>
			<v-card-title class="font-weight-bold px-0">
				title

				<v-spacer></v-spacer>
				<v-btn depressed dark color="orange" to="/product/form"> upload </v-btn>
			</v-card-title>
		</v-card>

		<v-tabs v-model="tabs" background-color="transparent" color="basil">
			<v-tab v-for="item in items" :key="item">
				{{ item }}
			</v-tab>
		</v-tabs>

		<v-tabs-items v-model="tabs">
			<v-tab-item>
				<v-card color="basil" flat>
					<v-card-title> 1 </v-card-title>
					<main-card></main-card>
				</v-card>
			</v-tab-item>

			<v-tab-item>
				<v-card color="basil" flat>
					<v-card-title> 2 </v-card-title>
					<main-card></main-card>
				</v-card>
			</v-tab-item>
		</v-tabs-items>
	</v-container>
</template>

<script>
import MainCard from './card.vue'

export default {
	components: { MainCard },
	data() {
		return {
			tabs: null,
			items: ['Recommend', 'Brand']
		}
	}
}
</script>
