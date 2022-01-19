import Vue from 'vue'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import firebaseConfig from '../../firebaseConfig'

firebase.initializeApp(firebaseConfig)

Vue.prototype.$firebase = firebase

// import Vue from 'vue'
// import { initializeApp } from 'firebase/app'
// import { getFirestore } from 'firebase/firestore/lite'

// const firebaseConfig = {
// 	apiKey: 'AIzaSyAEYXlBgBhvifV3GNuGXndTWRoHWeOgjWs',
// 	authDomain: 'carrot-app-10505.firebaseapp.com',
// 	databaseURL:
// 		'https://carrot-app-10505-default-rtdb.asia-southeast1.firebasedatabase.app',
// 	projectId: 'carrot-app-10505',
// 	storageBucket: 'carrot-app-10505.appspot.com',
// 	messagingSenderId: '163521492718',
// 	appId: '1:163521492718:web:ac75d70766e3c2870ba5ff',
// 	measurementId: 'G-RWVFNTYD1F'
// }

// const firebase = initializeApp(firebaseConfig)
// export const db = getFirestore(firebase)

// Vue.prototype.$firebase = firebase
