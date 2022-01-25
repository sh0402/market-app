import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

const theme = {
	themes: {
		light: {
			primary: '#6E24F4'
		}
	}
}

export default new Vuetify({
	theme
})
