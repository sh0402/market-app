<template>
	<div>
		<main-slide></main-slide>
		<main-card></main-card>
	</div>
</template>

<script>
import MainSlide from '@/views/main/slide'
import MainCard from '@/views/main/card'

export default {
	components: { MainSlide, MainCard },
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
