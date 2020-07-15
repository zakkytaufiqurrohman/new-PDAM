<template>
    <div>
        <base-button type="warning" @click="editButtonAction()">
            <i class="ni ni-active-40"></i>
        </base-button>
        <base-button @click="deleteButtonAction()">
            <i class="ni ni-fat-remove"></i>
        </base-button>
        <slot></slot>
    </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
    props: [
        'modelName',
        'formRecord',
        'record',
        'modals'
    ],

    methods: {
        editButtonAction() {
            this.$store.commit('setIsEditing', true)
            this.$store.commit('setModals')
            // this.formRecord.fill(record)
        },

        deleteButtonAction() {
            this.$store.dispatch('destroyData', {
                model: this.modelName,
                id: this.record.id
            })
                .then(() => {
                    Swal.fire(
                        'Sukses',
                        'Data berhasil dihapus',
                        'success'
                    )
                })
                .catch(() => {
                    Swal.fire(
                        'Gagal',
                        'Data gagal dihapus',
                        'error'
                    )
                })
        }
    }
}
</script>