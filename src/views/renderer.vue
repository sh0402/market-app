<template>
	<div>
		<board-index
			v-if="collection === 'board' && document === 'list'"
		></board-index>

		<board-content
			v-else-if="collection === 'board' && !action"
			:document="document"
		></board-content>

		<board-form
			v-else-if="collection === 'board'"
			:document="document"
			:action="action"
		></board-form>

		<error-page v-else></error-page>
		<!-- 
		<v-card>
			{{ $route.params }}

			{{ collection }} -
			{{ document }}
		</v-card> -->
	</div>
</template>

<script>
import BoardIndex from './board/index'
import BoardContent from './board/content'
import BoardForm from './board/form'
import ErrorPage from './error'

export default {
	components: { BoardIndex, BoardContent, BoardForm, ErrorPage },
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
