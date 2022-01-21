<template>
	<v-container>
		<v-card flat>
			<v-card-title class="font-weight-bold">
				Sign-Up

				<v-spacer></v-spacer>

				<span
					class="text-subtitle-2 primary--text"
					@click="$emit('changeType')"
				>
					Sign-In
				</span>
			</v-card-title>

			<v-card-text>
				<v-text-field dense outlined label="Name"></v-text-field>
				<v-text-field dense outlined label="Email"></v-text-field>
				<v-text-field dense outlined label="Password"></v-text-field>
			</v-card-text>
		</v-card>
	</v-container>
</template>
