<template>
	<sign-in v-if="!type" @changeType="type = !type"></sign-in>
	<sign-up v-else @changeType="type = !type"></sign-up>
</template>

<script>
import SignIn from '@/components/auth/signIn'
import SignUp from '@/components/auth/signUp'

export default {
	components: { SignIn, SignUp },
	data() {
		return {
			type: false
		}
	}
}
</script>
