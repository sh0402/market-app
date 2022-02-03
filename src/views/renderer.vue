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
			v-else-if="collection === 'board' && action === 'board-write'"
			:document="document"
			:action="action"
		></board-form>

		<board-article-form
			v-else-if="collection === 'board' && action === 'article-write'"
			:document="document"
			:action="action"
		></board-article-form>

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
import BoardArticleForm from './board/article/form'
import ErrorPage from './error'

export default {
	components: {
		BoardIndex,
		BoardContent,
		BoardForm,
		BoardArticleForm,
		ErrorPage
	},
	computed: {
		collection() {
			return this.$route.params.collection
		},
		document() {
			return this.$route.params.document
		},
		action() {
			return this.$route.params.action
		}
	}
}
</script>
