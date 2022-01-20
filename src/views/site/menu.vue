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

					<v-list-item-action>
						<v-btn icon @click="openDialogItem(i)">
							<v-icon>mdi-database-edit</v-icon>
						</v-btn>
					</v-list-item-action>
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

				<v-list-item>
					<v-list-item-icon>
						<v-icon>mdi-plus</v-icon>
					</v-list-item-icon>
					ADD Page
				</v-list-item>
			</v-list-group>

			<v-list-item @click="openDialogItem(-1)">
				<v-list-item-icon>
					<v-icon>mdi-plus</v-icon>
				</v-list-item-icon>
				ADD Menu
			</v-list-item>
		</v-list>

		<v-dialog v-model="dialogItem" max-width="400">
			<v-card>
				<v-card-title>title</v-card-title>
				<v-card-text>
					<v-text-field dense outlined v-model="formItem.title"></v-text-field>
					<v-btn @click="saveItem">Save</v-btn>
				</v-card-text>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
export default {
	props: ['items'],
	data() {
		return {
			dialogItem: false,
			dialogSubItem: false,
			formItem: {
				icon: '',
				title: ''
			},
			selectedItemIndex: -1
		}
	},
	methods: {
		// eslint-disable-next-line no-unused-vars
		openDialogItem(index) {
			this.selectedItemIndex = index
			this.dialogItem = true
			if (index < 0) {
				this.formItem.title = ''
			} else {
				this.formItem.title = this.items[index].title
			}
		},
		saveItem() {
			if (this.selectedItemIndex < 0) {
				// eslint-disable-next-line vue/no-mutating-props
				this.items.push(this.formItem)
			} else {
				// eslint-disable-next-line vue/no-mutating-props
				this.items[this.selectedItemIndex] = this.formItem
			}
			this.save()
		},
		async save() {
			try {
				this.$firebase.database().ref().child('site').set({ menu: this.items })
			} finally {
				this.dialogItem = false
			}
		}
	}
}
</script>

<style></style>
