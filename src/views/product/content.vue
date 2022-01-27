<template>
	<product-detail :item="item"></product-detail>
</template>

<script>
import ProductDetail from '@/components/product/detail'

export default {
	components: { ProductDetail },
	data() {
		return {
			item() {
				return this.$router.params.item
			}
		}
	}
}
</script>
