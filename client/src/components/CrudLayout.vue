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
            
            <form @submit.prevent="submitForm()">
                <component :is="formComponent" :formRecord="formRecord"></component>
            </form>
            <template slot="footer">
                <base-button type="primary" :disabled="isDisabled" @click="submitForm()">Save changes</base-button>
                <base-button type="link" class="ml-auto" @click="$store.commit('setModals')">Close
                </base-button>
            </template>
        </modal>

        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
// import { mapMutations, mapActions } from 'vuex'

export default {
    props: ['columns', 'modelName', 'formComponent', 'formRecord'],

    data: () => ({
        query: '',
        isDisabled: false,
    }),

    methods: {
        fetchData() {
            this.$store.dispatch('fetchData', this.modelName)
        },

        submitForm() {
            this.isDisabled = true
            if(!this.$store.state.isEditing) {
                this.$store.dispatch('createData', {
                    form: this.formRecord,
                    modelName: this.modelName
                }).then(() => {
                    this.isDisabled = false
                    this.$store.commit('setModals')
                    Swal.fire(
                        'Sukses',
                        'Data berhasil diinput',
                        'success'
                    )
                })
                .catch(() => {
                    this.isDisabled = false
                    Swal.fire(
                        'Gagal',
                        'Data gagal diinput',
                        'error'
                    )
                })
            } else {
                this.$store.dispatch('updateData', {
                    form: this.formRecord,
                    modelName: this.modelName,
                    id: this.formRecord.id
                }).then(() => {
                    this.isDisabled = false
                    this.$store.commit('setModals')
                    Swal.fire(
                        'Sukses',
                        'Data berhasil di update',
                        'success'
                    )
                })
                .catch(() => {
                    this.isDisabled = false
                    Swal.fire(
                        'Gagal',
                        'Data gagal di update',
                        'error'
                    )
                })
            }
        },

        launchCreateForm() {
            this.formRecord.reset()
            this.$store.commit('setModals')
            this.$store.commit('setIsEditing', false)
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