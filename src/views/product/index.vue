<template>
	<!-- <v-container>
		<v-card flat>
			<v-card-title class="px-0">
				Board title

				<v-spacer />

				<v-btn depressed color="primary" to="/form2"> Upload </v-btn>
			</v-card-title>

			<v-row dense>
				<v-col cols="6" v-for="item in items" :key="item.id">
					<v-card flat :to="`${$route.path}/${item.id}`">
						<v-img src="https://picsum.photos/200"></v-img>

						<v-card-title class="d-flex align-center font-weight-bold">
							{{ item.price + '원' }}

							<v-spacer />

							<v-menu offset-y left>
								<template v-slot:activator="{ on }">
									<v-icon v-on="on"> mdi-dots-vertical </v-icon>
								</template>

								<v-card width="120">
									<v-list nav>
										<v-btn block text small @click="openDialog(item)">
											Edit
										</v-btn>
										<v-btn block text small color="error" @click="remove(item)">
											Delete
										</v-btn>
									</v-list>
								</v-card>
							</v-menu>
						</v-card-title>

						<v-card-subtitle class="pb-0">
							<span class="text-subtitle-2 grey--text">
								{{ item.title }}
							</span>
						</v-card-subtitle>

						<v-card-subtitle class="d-flex justify-space-between align-center">
							address · date

							<v-btn icon small>
								<v-icon small>mdi-heart</v-icon>
							</v-btn>
						</v-card-subtitle>
					</v-card>
				</v-col>
			</v-row>
		</v-card>

		<v-dialog v-model="dialog">
			<v-card>
				<v-card-title> Write </v-card-title>

				<v-card-text>
					<v-text-field
						dense
						outlined
						label="Product Name"
						v-model="form.title"
					></v-text-field>

					<v-text-field
						dense
						outlined
						label="Price"
						v-model="form.price"
					></v-text-field>

					<v-text-field
						dense
						outlined
						label="Description"
						v-model="form.description"
					></v-text-field>
				</v-card-text>

				<v-card-text>
					<v-btn @click="add" v-if="!this.selectedItem">add</v-btn>
					<v-btn @click="update" v-else>update</v-btn>
				</v-card-text>
			</v-card>
		</v-dialog>
	</v-container> -->
	<v-card>product index</v-card>
</template>
