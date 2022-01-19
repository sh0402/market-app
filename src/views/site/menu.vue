<template>
	<div>
		<v-list-item>
			<v-list-item-content>
				<v-list-item-title class="font-weight-black"> Title </v-list-item-title>
				<v-list-item-subtitle> subtitle </v-list-item-subtitle>
			</v-list-item-content>
		</v-list-item>

		<v-divider></v-divider>

		<v-list>
			<v-list-group
				v-model="item.active"
				v-for="(item, i) in items"
				:key="i"
				:prepend-icon="item.icon"
				no-action
			>
				<template v-slot:activator>
					<v-list-item-content>
						<v-list-item-title v-text="item.title"></v-list-item-title>
					</v-list-item-content>
				</template>

				<v-list-item
					v-for="subItem in item.subItems"
					:key="subItem.title"
					:to="subItem.to"
				>
					<v-list-item-content>
						<v-list-item-title v-text="subItem.title"></v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list-group>
		</v-list>
	</div>
</template>

<script>
export default {
	props: ['items'],
	data() {
		return {
			// items: [
			// 	{
			// 		title: 'Home',
			// 		icon: 'mdi-home',
			// 		subItems: [
			// 			{
			// 				title: 'Home',
			// 				to: '/'
			// 			}
			// 		]
			// 	},
			// 	{
			// 		title: 'Upload',
			// 		icon: 'mdi-upload',
			// 		active: true,
			// 		subItems: [
			// 			{
			// 				title: 'Upload',
			// 				to: '/upload'
			// 			}
			// 		]
			// 	},
			// 	{
			// 		title: 'Test',
			// 		icon: 'mdi-file-question',
			// 		subItems: [
			// 			{
			// 				title: 'Test',
			// 				to: '/test'
			// 			}
			// 		]
			// 	}
			// ]
		}
	}
}
</script>

<style></style>
