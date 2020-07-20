import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// axios.defaults.baseURL = process.env.VUE_APP_API_URL
// const formUrl = process.env.VUE_APP_API_URL

Vue.use(Vuex)

/* convert camelCase to kebab case

example: userTransaction => /user-transactions, customers => /customers */
const getUrlName = (string) => {
    return string.toString().replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

/*  change first character of function arguments to uppercase and add 'set' before the first char

example: userTransactions => setUserTransactions, customers => setCustomers */
const getMutationName = (string) => {
    let mutation = string.toString().charAt(0).toUpperCase() + string.toString().slice(1)
    return `set${mutation}`
}

const store = new Vuex.Store({
    state: {
        users: [],
        customers: [],
        // transactions: [],
        // spends: [],
        currentUser: {},
        modals: false,
        isEditing: false,
        token: localStorage.getItem('access_token'),
    },

    mutations: {
        setModals(state) {
            state.modals ? state.modals = false : state.modals = true
        },

        setIsEditing(state, data) {
            state.isEditing = data
        },

        setUsers(state, data) {
            state.users = data
        },

        setCustomers(state, data) {
            state.customers = data
        },

        setCurrentUser(state, data) {
            state.currentUser = data
        },

        setToken(state, data) {
            state.token = data
        },

        // setSpends(state, data) {

        // }
    },

    actions: {
        fetchData(context, args) {
            // args is the modelName using the camelCase
            // example: userTransactions, customers
            // create new promise
            return new Promise((resolve, reject) => {
                // fetch data using default api base url and url name based on actions arguments then convert to url with getUrlName variable funct
                axios.get(getUrlName(args))
                    .then(res => {
                        // commit mutations from getMutationName with fetchData argument
                        context.commit(getMutationName(args), res.data.data)
                        resolve(res)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },

        searchData(context, args) {
            return new Promise((resolve, reject) => {
                axios.get(getUrlName(args.modelName) + '?q=' + args.query)
                    .then(res => {
                        context.commit(getMutationName(args.modelName), res.data.data)
                        resolve(res)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })      
        },

        createData(context, args) {
            return new Promise((resolve, reject) => {
                // args.form equal to Form object from main views
                args.form.post(`${getUrlName(args.modelName)}`)
                    .then(res => {
                        context.dispatch('fetchData', args.modelName)
                        resolve(res)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },

        updateData(context, args) {
            return new Promise((resolve, reject) => {
                args.form.patch(`${getUrlName(args.modelName)}/${args.id}`)
                    .then(res => {
                        context.dispatch('fetchData', args.modelName)
                        resolve(res)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },

        destroyData(context, args) {
            return new Promise((resolve, reject) => {
                axios.delete(getUrlName(args.modelName) + '/' + args.id)
                    .then(res => {
                        context.dispatch('fetchData', args.modelName)
                        resolve(res)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },

        login(context , args) {
            return new Promise((resolve, reject) => {
                args.post('login')
                    .then(res => {
                        localStorage.setItem('access_token', res.data.access_token)
                        let token = res.data.access_token
                        axios.defaults.headers.common['Authorization'] = `Bearer ${ token }`
                        context.commit('setToken', res.data.access_token)
                        context.dispatch('getCurrentUser').then( () => {
                            resolve(res)
                        })
                        .catch( error =>{
                            reject(error)
                        })
                        
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },

        logout(context) {
            return new Promise((resolve, reject) => {
                axios.get('logout')
                    .then(res => {
                        localStorage.removeItem('access_token')
                        context.commit('setCurrentUser', {})
                        resolve(res)
                    }) 
                    .catch(err => {
                        reject(err)
                    })
            })
        },

        getCurrentUser(context) {
            return new Promise((resolve, reject) => {
                axios.get('users')
                    .then(res => {
                        context.commit('setCurrentUser', res.data)
                        resolve(res)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        }
    },

    getters: {
        customers : state => state.customers,
        users: state => state.users,
        user: state => state.currentUser,
        isLoggedIn: state => {
            return state.token !=null && state.token != "null"
            
        },
        adminUsers(state) {
            let adminusers = []
            state.users.forEach(user => {
                if(user.data.role === 'Admin') {
                    adminusers.push(user)
                }
            })
            return adminusers
        },
        pengelolaUsers(state) {
            let pengelola = []
            state.users.forEach(user => {
                if(user.data.role === 'Pengelola') {
                    pengelola.push(user)
                }
            })
            return pengelola
        },
        pegawaiUsers(state) {
            let pegawai = []
            state.users.forEach(user => {
                if(user.data.role === 'Pegawai') {
                    pegawai.push(user)
                }
            })
            return pegawai
        }
    }
})

export default store