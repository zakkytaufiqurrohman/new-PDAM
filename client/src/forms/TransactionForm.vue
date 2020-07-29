<template>
    <div>
        <div class="row">
            <div class="col-6">
                <base-input
                    alternative=""
                    label="Pelanggan"
                >
                    <select class="form-control form-control-alternative" v-model="formRecord.customer_id">
                        <option value="">Pilih Pelanggan</option>
                        <option v-for="customer in customers" :key="customer.data.id" :value="customer.data.id">
                            {{ customer.data.code }} - {{ customer.data.name }}
                        </option>
                    </select>
                </base-input>
            </div>
            <div class="col-6">
                <base-input
                    alternative=""
                    label="User"
                >
                    <select class="form-control form-control-alternative" v-model="formRecord.user_id">
                        <option value="">Pilih User</option>
                        <option v-for="user in users" :key="user.data.id" :value="user.data.id">
                            {{ user.data.role }} - {{ user.data.name }}
                        </option>
                    </select>
                </base-input>
            </div>
        </div>

        <base-input 
            type="number"
            alternative=""
            label="Meteran"
            v-model="formRecord.indicator_total"
            input-classes="form-control-alternative"
            placeholder="Jumlah Meteran"
        />

        <base-input 
            type="number"
            alternative=""
            v-model="formRecord.price"
            label="Harga"
            input-classes="form-control-alternative"
            placeholder="Harga"
        />

        <base-input 
            alternative=""
            label="Status"
        >
            <select v-model="formRecord.status" class="form-control form-control-alternative">
                <option value="">Status Transaksi</option>
                <option v-for="stats in status" :key="stats" :value="stats">{{ stats }}</option>
            </select>
        </base-input>
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

    computed: {
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