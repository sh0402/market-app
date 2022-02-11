import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import en from 'vuetify/lib/locale/en'
import ko from 'vuetify/lib/locale/ko'

Vue.use(Vuetify)

const theme = {
	themes: {
		light: {
			primary: '#6E24F4'
		}
	}
}

export default new Vuetify({
	theme,
	lang: {
		locales: { en, ko },
		current: 'ko'
	}
})
