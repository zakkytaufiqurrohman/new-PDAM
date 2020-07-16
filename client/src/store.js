import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_URL
const formUrl = process.env.VUE_APP_API_URL

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
        users: [],
        customers: [],
        // transactions: [],
        // spends: [],
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
            state.users = data.data  
        },

        setCustomers(state, data) {
            state.customers = data
        },

        // setTransactions(state, data) {

        // },

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

        createData(context, args) {
            return new Promise((resolve, reject) => {
                // args.form equal to Form object from main views
                args.form.post(`${formUrl}${getUrlName(args.modelName)}`)
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
                args.form.patch(`${formUrl}${getUrlName(args.modelName)}/${args.id}`)
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

        // fetchRecord(context, args) {

        // }
    },

    getters: {
        customers : state => state.customers,
        users: state => state.users,
    }
})

export { store }