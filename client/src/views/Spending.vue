<template>
    <div>
        <crud-layout
            :columns="columns"
            :modelName="modelName"
            :formRecord="form"
            :formComponent="formComponent"
        >
            <div class="col-lg-4" slot="stats">
                <stats-card
                    type="gradient-green"
                    :sub-title = totalSpendThisMonth
                    icon="ni ni-money-coins"
                    class="mb-4 mb-xl-0"
                >
                    
                    <template slot="footer">
                        <span class="text-nowrap">Pengeluaran bulan ini</span><br>
                        <span>{{now.toDateString()}}</span>
                    </template>
                </stats-card>
            </div>
            <template slot="table-rows">
                <tr v-for="(spend, index) in spends" :key="spend.id">
                    <td>
                        {{ index + 1 }}
                    </td>
                    <td>
                        {{ spend.data.name}}
                    </td>
                    <td>
                        {{ spend.data.user.name}}
                    </td>
                    <td>
                        {{spend.data.total}}
                    </td>
                    <td>
                        {{spend.data.information}}
                    </td>
                    <td>
                        <img :src=" 'http://pdam.test/img/thumbnail/' + spend.data.thumbnail" alt="img_thumnail" width="100" @click="show(spend.data.id)" @mouseover=change :style="cursor">
                    </td>
                    <td>
                        {{spend.data.created_at}}
                    </td>
                    <td>
                        {{spend.data.updated_at}}
                    </td>
                    <td>
                        <action-button 
                            :formRecord="form"
                            :record="spend"
                            :modelName="modelName"
                        />
                    </td>
                </tr>
            </template>


        </crud-layout>  
        <template>
            <modal :show.sync="display">
                <img :src="imgs" alt="" width="450" style="margin-top=0">
            </modal>
        </template>      
    </div>
</template>
<script>
import SpendingForm from '../forms/SpendingForm'
import { Form } from 'vform'
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
    data: () => ({
        columns: [
            '#', 'name', 'Petugas Input', 'Total', 'information', 'Image', 'Created', 'Updated',
        ],
        form: new Form({
            id: '',
            name: '',
            img: '',
            total: '',
            information: ''
        }),
        formComponent: SpendingForm,
        modelName: 'spending',
        imgs:'',
        display: false,
        cursor: '',
        now : new Date()
    }),
    computed: {
        ...mapGetters({
            spends: 'spends',
        }),
        totalSpendThisMonth(){
            let currentMonth = new Date().getMonth() + 1
            let currentYear = new Date().getFullYear()
            let total = this.spends.filter(e => {
                var [year, month] = e.data.created_at.split('-')
                return (currentMonth === +month) && (currentYear == year)
            });
            var hasil = 0;
            total.forEach(element => {
                hasil +=element.data.total
            });
            return 'Rp '+hasil.toLocaleString('id-ID')
        }
    },
    methods: {
        show(id){
            this.display = true
            axios.get('zoom/'+id)
            .then( res => {
                this.imgs = 'http://pdam.test/img/original/'+res.data.data[0]['img']
            }) 
        },
        change(){
            this.cursor = 'cursor:zoom-in'
        },
        // getTotal(){
        //     axios.get('spending/month')
        //         .then( res => {
        //         return this.total = res.data.data
        //     })
        // }
    },
    mounted() {
       
        
    }
}
</script>