<template>
    <div>
        <base-input alternative=""
            label="Nama Pengeluaran"
            placeholder="Nama Pengeluaran"
            input-classes="form-control-alternative"
            v-model="formRecord.name"
        />

        <base-input
            alternative=""
            label="Total"
            placeholder="Total"
            type="number"
            input-classes="form-control-alternative"
            v-model="formRecord.total"
        />
        <base-input 
            alternative=""
            label="Information"
            input-classes="form-control-alternative"
            placeholder="Information"
            v-model="formRecord.information"
        />
        <!-- todo buat component untuk get img -->
        <div v-if="isEditing==true" >
            <img :src=" 'http://pdam.test/img/original/' + formRecord.img" alt="img_edit" width="100" height="100">
            <br><br>
        </div>
        <input type="file" name="" id="" @change="selected" >
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    props: ['formRecord'],
    methods: {
        selected(e) {
            let file = e.target.files[0];
            this.formRecord.img = file
            let reader = new FileReader();
            reader.onloadend = () => {
                this.formRecord.img = reader.result
            }
            reader.readAsDataURL(file)
        }
    },
    computed : {
        ...mapGetters({
            isEditing : 'isEditing'
        })
    }
}
</script>