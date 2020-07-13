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
                <tr v-for="customer in customers" :key="customer.id">
                    <td>
                        {{ customer.data.name}}
                    </td>
                    <td>
                        {{ customer.data.code}}
                    </td>
                    <td>
                        {{ customer.data.name }}
                    </td>
                    <td>
                        {{ customer.data.phone}}
                    </td>
                    <td>
                        {{ customer.data.user.name}}
                    </td>
                    <td>
                        {{customer.data.address}}
                    </td>
                </tr>
            </template>


        </crud-layout>        
    </div>
</template>

<script>
import CustomerForm from '../forms/CustomerForm'
import { Form } from 'vform'
import { mapActions, mapGetters } from 'vuex'

export default {
    data: () => ({
        columns: [
            '#', 'Kode', 'Nama', 'No Hp', 'Diedit Oleh', 'Alamat',
        ],
        form: new Form({
            name: '',
            phone: '',
            edited_by: '',
            address: '',
        }),
        formComponent: CustomerForm,
        modelName: 'getAllCustomer'
    }),
    methods: {
        ...mapActions({
            fetchData : 'fetchData'
        })
    },
    created() {
        this.fetchData(this.modelName)
    },
    computed: {
        ...mapGetters({
            customers: 'customers'
        })
    }
}
</script>