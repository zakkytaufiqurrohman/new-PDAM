import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_URL

Vue.use(Vuex)

/* convert camelCase to kebab case

example: userTransaction => /user-transactions, customers => /customers */
const getUrlName = (string) => {
    return '/' + string.toString().replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

/*  change first character of function arguments to uppercase and add 'set' before the first char

example: userTransactions => setUserTransactions, customers => setCustomers */
const getMutationName = (string) => {
    let mutation = string.toString().charAt(0).toUpperCase() + string.toString().slice(1)
    return `set${mutation}`
}

const store = new Vuex.Store({
    state: {
        // users: [],
        customers: [],
        // transactions: [],
        // spends: [],
    },

    mutations: {
        // setUsers(state, data) {
            
        // },

        setCustomers(state, data) {
            state.customers = data
        },

        // setTransactions(state, data) {

        // },

        // setSpends(state, data) {

        // }
    },

    actions: {
        fetchData({commit}, context) {
            axios.get(context).then( (res) => {
                commit('setCustomers',res.data.data)
            })
        },

        // createData(context, args) {

        // },

        // updateData(context, args) {

        // },

        // destroyData(context, args) {

        // },

        // fetchRecord(context, args) {

        // }
    },

    getters: {
        customers : state => state.customers
    }
})

export { store }