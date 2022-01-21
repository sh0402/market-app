<template>
	<v-container>
		<product-detail v-if="!action" :docId="docId"></product-detail>
		<product-form v-else :action="action"></product-form>
		<v-card>
			<v-card-title>이 페이지의 아이디는 {{ docId }}</v-card-title>
			<v-card-title> {{ $route.params.name }} </v-card-title>
			<v-card-title> 쿼리 그룹: {{ $route.query.group }} </v-card-title>
			<v-card-title> 쿼리 카테고리: {{ $route.query.category }} </v-card-title>
			<v-card-title> 쿼리 이름: {{ $route.query.name }} </v-card-title>
			<v-card-title> 쿼리 어드레스: {{ $route.query.address }} </v-card-title>
		</v-card>
	</v-container>
</template>

<script>
import ProductDetail from '@/components/product/detail'
import ProductForm from '@/components/product/form'
export default {
	components: { ProductDetail, ProductForm },
	computed: {
		docId() {
			return this.$route.params.docId
		},
		action() {
			return this.$route.query.action
		}
	},
	created() {
		console.log('router', this.$router)
		console.log('route', this.$route)
	}
}
</script>
