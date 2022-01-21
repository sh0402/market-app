<template>
	<div>
		<v-list-item>
			<v-list-item-content>
				<v-list-item-title class="font-weight-black"> Title </v-list-item-title>
				<v-list-item-subtitle> subtitle </v-list-item-subtitle>
			</v-list-item-content>
		</v-list-item>

		<v-divider></v-divider>

		<v-list nav>
			<v-list-item-group v-model="model" color="orange darken-4">
				<v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
					<v-list-item-content>
						<v-list-item-title class="font-weight-bold">
							{{ item.title }}
						</v-list-item-title>
					</v-list-item-content>

					<v-list-item-action>
						<v-btn icon @click.native="openDialogItem(i)">
							<v-icon small>mdi-database-edit</v-icon>
						</v-btn>
					</v-list-item-action>
					<v-list-item-action class="mx-0">
						<v-btn icon @click.native="removeItem(items, i)">
							<v-icon small>mdi-close</v-icon>
						</v-btn>
					</v-list-item-action>
				</v-list-item>
			</v-list-item-group>
		</v-list>

		<v-list nav>
			<v-btn
				block
				depressed
				dark
				color="orange"
				@click.stop="openDialogItem(-1)"
			>
				<v-icon small>mdi-plus</v-icon>
				ADD
			</v-btn>
		</v-list>

		<v-dialog v-model="dialogItem" max-width="400">
			<v-card>
				<v-card-title>title</v-card-title>
				<v-card-text>
					<v-text-field
						dense
						outlined
						label="Title"
						v-model="formItem.title"
					></v-text-field>

					<v-text-field
						dense
						outlined
						label="URL"
						v-model="formItem.to"
					></v-text-field>
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
			loading: false,
			model: 1,
			formItem: {
				icon: '',
				title: '',
				to: ''
			},
			dialogItem: false,
			dialogSubItem: false,
			selectedItemIndex: 0,
			selectedSubItemIndex: 0
		}
	},
	methods: {
		// eslint-disable-next-line no-unused-vars
		openDialogItem(index) {
			this.selectedItemIndex = index

			if (index < 0) {
				this.formItem.title = ''
				this.formItem.to = ''
			} else {
				this.formItem.title = this.items[index].title
				this.formItem.to = this.items[index].to
			}
			this.dialogItem = true
		},
		async saveItem() {
			if (this.selectedItemIndex < 0) {
				// eslint-disable-next-line vue/no-mutating-props
				this.items.push(this.formItem)
			} else {
				// eslint-disable-next-line vue/no-mutating-props
				this.items[this.selectedItemIndex].titile = this.formItem.title
				// eslint-disable-next-line vue/no-mutating-props
				this.items[this.selectedItemIndex].to = this.formItem.to
			}
			this.save()
		},
		async save() {
			try {
				this.loading = true
				await this.$firebase
					.database()
					.ref()
					.child('site')
					.child('menu')
					.set(this.items)
			} finally {
				this.dialogItem = false
				this.loading = false
			}
		},
		removeItem(items, i) {
			items.splice(i, 1)
			this.save()
		}
	}
}
</script>

<style></style>
