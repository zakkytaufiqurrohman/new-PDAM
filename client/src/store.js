import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

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
        spends: [],
        currentUser: {},
        setting: [],
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

        setTransactions(state, data) {
            state.transactions = data
        },

        setToken(state, data) {
            state.token = data
        },

        setSpending(state, data) {
            state.spends = data
        },

        setSetting(state, data) {
            state.setting = data
        }
    },

    actions: {
        async fetchData(context, args) {
            try {
                const data = await axios.get(getUrlName(args))
                context.commit(getMutationName(args), data.data.data)
            } catch (error) {
                console.error(error.message)
                throw new Error(error.message)
            }
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
        // todo buat component
        filterDate(context, args) {
            return new Promise((resolve, reject) => {
                axios.get(args.modelName +'/'+ args.filter)
                .then(res => {
                    context.commit('setTransactions', res.data.data)
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
            })
        },
        async createData(context, args) {
            try {
                await args.form.post(`${getUrlName(args.modelName)}`)
                context.dispatch('fetchData', args.modelName)
            } catch (error) {
                console.error(error.message)
                throw new Error(error.message)
            }
        },

        async updateData(context, args) {
            try {
                await args.form.patch(`${getUrlName(args.modelName)}/${args.id}`)
                context.dispatch('fetchData', args.modelName)
            } catch (error) {
                console.error(error.message)
                throw new Error(error.message)
            }
        },

        async destroyData(context, args) {
            try {
                await axios.delete(getUrlName(args.modelName) + '/' + args.id)
                context.dispatch('fetchData', args.modelName)
            } catch (error) {
                console.error(error.message)
                throw new Error(error.message)
            }
        },

        async login(context , args) {
            try {
                const data = await args.post('http://127.0.0.1:8000/api/login')
                const token = data.data.access_token
                localStorage.setItem('access_token', token)
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                context.commit('setToken', token)
                context.dispatch('getCurrentUser')
            } catch (error) {
                console.error(error.message)
                throw new Error(error.message)
            }
        },

        async logout(context) {
            try {
                await axios.get('logout')
                localStorage.removeItem('access_token')
                context.commit('setCurrentUser', {})
            } catch (error) {
                console.error(error.message)
                throw new Error(error.message)
            }
        },

        async getCurrentUser(context) {
            await axios.get('user')
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
        spends: state => state.spends,
        setting: state => state.setting,
        isLoggedIn: state => {
            return state.token !=null && state.token != "null"
            
        },
        isEditing: state => state.isEditing,
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