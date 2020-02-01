import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'




export default {
    state: {
        loadedMeetups: []


    },
    mutations: {

        createMeetup(state, payload) {
            // Appending my created meetup to my loadedMeetups
            state.loadedMeetups.push(payload)

        },
        updateMeetup(state, payload) {
            let meetup = state.loadedMeetups.find(meetup => {
                return meetup.id === payload.id
            })
            if (payload.title) {
                meetup.title = payload.title
            }
            if (payload.description) {
                meetup.description = payload.description
            }
            if (payload.date) {
                meetup.date = payload.date
            }


        },
        loadMeetups(state, payload) {
            state.loadedMeetups = payload

        }
    },
    actions: {

        loadMeetups({ commit }) {
            commit('setLoading', true)
            firebase.database().ref('meetups').once('value')
                .then(data => {
                    const obj = data.val()
                    const meetup = [];

                    for (let key in obj) {
                        meetup.push({
                            title: obj[key].title,
                            description: obj[key].description,
                            imageUrl: obj[key].imageUrl,
                            location: obj[key].location,
                            date: obj[key].date,
                            id: key,
                            creatorId: obj[key].creatorId


                        })



                    }
                    commit('setLoading', false)
                    commit('loadMeetups', meetup)
                })
                .catch(error => {
                    console.log(error)
                    commit('setLoading', false)
                })

        },
        createMeetup({ commit, getters }, payload) {
            // Robust way of creating payload items
            const meetup = {
                    title: payload.title,
                    location: payload.location,
                    description: payload.description,
                    date: payload.date.toISOString(),
                    creatorId: getters.user.id

                }
                // Submiting my meetup to Mutation
            let key
            let imageUrl
            let ext

            commit('setLoading', true)
            firebase.database().ref('meetups').push(meetup)
                .then(
                    data => {
                        commit('setLoading', false)
                        key = data.key
                        return key
                    }
                )
                .then(key => {
                    commit('setLoading', false)
                    const filename = payload.image.name
                    ext = filename.slice(filename.lastIndexOf('.'))
                    return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
                })
                .then(fileData => {
                    commit('setLoading', false)
                    return firebase.storage().ref('meetups/' + key + '.' + ext).getDownloadURL()
                })
                .then(URL => {
                    commit('setLoading', false)
                    imageUrl = URL
                    return firebase.database().ref('meetups').child(key).update({ imageUrl: imageUrl })
                })
                .then(() => {
                    commit('setLoading', false)
                    commit('createMeetup', {
                        ...meetup,
                        id: key,
                        link: '/meetups/' + key,
                        imageUrl: imageUrl
                    })
                })
                .catch(
                    error => {
                        commit('setError', error)
                        console.log(error)
                    }
                )
        },
        updateMeetup({ commit }, payload) {
            const updateObj = {}
            if (payload.title) {
                updateObj.title = payload.title

            }
            if (payload.description) {
                updateObj.description = payload.description

            }
            if (payload.date) {
                updateObj.date = payload.date

            }

            commit('updateMeetup', payload)
            firebase.database().ref('/meetups').child(payload.id).update(updateObj)



        }




    },
    getters: {
        loadedMeetups(state) {
            return state.loadedMeetups.sort((meetupA, meetupB) => {
                return meetupA > meetupB
            })

        },
        featuredMeetups(getters) {
            return getters.loadedMeetups.slice(0, 5)

        },
        loadedMeetup(state) {
            return (meetupId) => {
                return state.loadedMeetups.find(meetup => {
                    return meetup.id === meetupId
                })
            }
        }

    }
}