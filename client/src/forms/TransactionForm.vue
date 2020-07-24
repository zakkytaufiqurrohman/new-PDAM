<template>
    <div>
        <div class="row">
            <div class="col-6">
                <base-input
                    alternative=""
                    label="Pelanggan"
                >
                    <select v-model="formRecord.customer_id">
                        <option value="">Pilih Pelanggan</option>
                        <option v-for="customer in customers" :key="customer.data.id" :value="customer.data.id">
                            {{ customer.code }} - {{ customer.name }}
                        </option>
                        <option v-for="user in users" :key="user.data.id" :value="user.data.id">
                            {{ user.data.email }} - {{ user.data.name }}
                        </option>
                    </select>
                </base-input>
            </div>
            <div class="col-6">

            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: [
        'formRecord'
    ],

    data: () => ({
        status: [
            'Dibayar', 'Belum Dibayar'
        ]
    }),

    methods: {
        fetchFormData() {
            this.$store.dispatch('fetchData', 'customers')
            this.$store.dispatch('fetchData', 'users')
        }
    },

    getters: {
        ...mapGetters({
            customers: 'customers',
            users: 'users',
        })
    },

    created() {
        this.fetchFormData()
    }
}
</script>