<template>
    <div>
        <crud-layout
            :columns="columns"
            :modelName="modelName"
            :formRecord="form"
            :formComponent="formComponent"
        >
            <div class="col-lg-4" slot="stats">
                <stats-card title="Sales"
                            type="gradient-green"
                            sub-title="924"
                            icon="ni ni-money-coins"
                            class="mb-4 mb-xl-0"
                >

                    <template slot="footer">
                        <span class="text-danger mr-2"><i class="fa fa-arrow-down"></i> 5.72%</span>
                        <span class="text-nowrap">Since last month</span>
                    </template>
                </stats-card>
            </div>

            <template slot="table-rows">
                <tr v-for="(transaction, index) in transactions" :key="transaction.id">
                    <td>
                        {{ index + 1 }}
                    </td>
                    <td>{{ transaction.data.customer.code }} &ndash; {{ transaction.data.customer.name }}</td>
                    <td>{{ transaction.data.user.name }}</td>
                    <td>{{ transaction.data.indicator_total }}</td>
                    <td>{{ transaction.data.status }}</td>
                    <td>{{ transaction.data.created_at }}</td>
                    <td>
                        <action-button
                            :formRecord="form"
                            :record="transaction"
                            :modelName="modelName"
                        ></action-button>
                    </td>
                </tr>
            </template>
        </crud-layout>
    </div>
</template>

<script>
import TransactionForm from '../forms/TransactionForm'
import { Form } from 'vform'
import { mapGetters } from 'vuex'

export default {
    data: () => ({
        columns: [
            '#', 'kode', 'pelanggan', 'user', 'jumlah meteran', 'harga', 'status', 'dibuat tanggal'
        ],
        formComponent: TransactionForm,
        form: new Form({
            id: '',
            code: '',
            customer_id: '',
            user_id: '',
            indicator_total: '',
            price: '',
            status: '',
        }),
        modelName: 'transactions',
    }),

    computed: {
        ...mapGetters([
            'transactions'
        ])
    }


}
</script>