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
        transactions: [],
        // spends: [],
        currentUser: {},
        modals: false,
        isEditing: false,
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

        setTransactions(state, data) {
            state.transactions = data
        },

        // setSpends(state, data) {

        // }
    },

    actions: {
        async fetchData(context, args) {
            await axios.get(getUrlName(args))
                .then(res => {
                    context.commit(getMutationName(args), res.data.data)
                })
                .catch(err => {
                    console.error(err)
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

        async createData(context, args) {
            await args.form.post(`${getUrlName(args.modelName)}`)
                .then(() => {
                    context.dispatch('fetchData', args.modelName)
                })
        },

        async updateData(context, args) {
            await args.form.patch(`${getUrlName(args.modelName)}/${args.id}`)
                .then(() => {
                    context.dispatch('fetchData', args.modelName)
                })
        },

        async destroyData(context, args) {
            await axios.delete(getUrlName(args.modelName) + '/' + args.id)
                .then(() => {
                    context.dispatch('fetchData', args.modelName)
                    // resolve(res)
                })
        },

        login(context, args) {
            return new Promise((resolve, reject) => {
                args.post('login')
                    .then(res => {
                        localStorage.setItem('access_token', res.data.access_token)
                        resolve(res)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },

        async logout(context) {
            await axios.get('logout', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('access_token')
                }
            })
                .then(() => {
                    localStorage.removeItem('access_token')
                    context.commit('setCurrentUser', {})
                }) 
                .catch(err => {
                    console.error(err)
                })
        },

        async getCurrentUser(context) {
            await axios.get('user', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('access_token')
                }
            })
                .then(res => {
                    context.commit('setCurrentUser', res.data)
                })
        }
    },

    getters: {
        customers : state => state.customers,
        transactions: state => state.transactions,
        users: state => state.users,
        user: state => state.currentUser,
        isLoggedIn() {
            let token = localStorage.getItem('access_token')
            if(token == null || token == "null") {
                return false
            }

            return true
        },
        adminUsers(state) {
            return state.users.filter(user => user.data.role.match("Admin"))
        },
        pengelolaUsers(state) {
            return state.users.filter(user => user.data.role.match("Pengelola"))
        },
        pegawaiUsers(state) {
            return state.users.filter(user => user.data.role.match("Pegawai"))
        }
    }
})

export default store