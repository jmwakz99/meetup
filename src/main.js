import Vue from 'vue';
import App from './App.vue';
import router from './router';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import store from './store'
import vuetify from './plugins/vuetify';
import DateFilter from '@/filters/date';
import AlertCmp from './components/shared/alert.vue';
import EditMeetupDetails from '@/components/Meetup/Edit/EditMeetupDetails.vue'
import EditMeetupDate from '@/components/Meetup/Edit/EditMeetupDate.vue'
import EditMeetupTime from '@/components/Meetup/Edit/EditMeetupTime.vue'
import RegisterForMeetup from '@/components/Meetup/Register/RegisterForMeetup.vue'

Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.component('alert-app', AlertCmp)
Vue.component('app-edit-details', EditMeetupDetails)
Vue.component('app-edit-date', EditMeetupDate)
Vue.component('app-edit-time', EditMeetupTime)
Vue.component('app-register-meetup', RegisterForMeetup)

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
    created() {
        firebase.initializeApp({
            apiKey: "AIzaSyDVLjCoJoZ8KDnPpsGLb61n56e2HUVRTkQ",
            authDomain: "portfolio-ea1e0.firebaseapp.com",
            databaseURL: "https://portfolio-ea1e0.firebaseio.com",
            projectId: "portfolio-ea1e0",
            storageBucket: "portfolio-ea1e0.appspot.com"

        })
        firebase.auth().onAuthStateChanged(user => {
            if (user) {

                this.$store.dispatch('autoSigning', user)
                this.$store.dispatch('fetchUserData')
            }
        })

        this.$store.dispatch('loadMeetups')


    }
}).$mount('#app')