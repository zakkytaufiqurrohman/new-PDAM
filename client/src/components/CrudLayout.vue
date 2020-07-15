<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <div class="row">
                <slot name="stats"></slot>
            </div>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-12">
                    <card header-class="bg-transparent">
                        <div class="float-left">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">
                                        <i class="ni ni-zoom-split-in"></i>
                                    </span>
                                </div>
                                <input type="text" v-model="query" class="form-control" placeholder="Cari..." @keyup="searchData()">
                            </div>
                        </div>
                        <base-button class="float-right mb-3" type="success" @click="launchCreateForm">
                            <i class="ni ni-fat-add"></i>
                            Tambah Data
                        </base-button>
                        <div class="table-responsive">
                            <table class="table tablesorter">
                                <thead>
                                    <tr>
                                        <th class="font-weight-black" v-for="column in columns" :key="column">
                                            {{ column }}
                                        </th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <slot name="table-rows"></slot>
                                </tbody>
                            </table>
                        </div>
                    </card>
                </div>
            </div>
        </div>

        <div>
            <modal :show.sync="$store.state.modals">

            <component :is="formComponent" :formRecord="formRecord"></component>

            <template slot="footer">
                <base-button type="primary">Save changes</base-button>
                <base-button type="link" class="ml-auto" @click="$store.commit('setModals')">Close
                </base-button>
            </template>
        </modal>

        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
    props: ['columns', 'modelName', 'formComponent', 'formRecord'],

    data: () => ({
        query: '',
    }),

    methods: {
        fetchData() {
            this.$store.dispatch('fetchData', this.modelName).catch(() => {
                Swal.fire(
                    'Error',
                    'Gagal loading data',
                    'error'
                )
            })
        },

        launchCreateForm() {
            this.$store.commit('setIsEditing', false)
            this.$store.commit('setModals')
        },

        searchData() {
            console.log(this.query)
        }
    },

    mounted() {
        this.fetchData()
    }
}
</script>