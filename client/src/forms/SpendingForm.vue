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
         <!-- <base-input 
            alternative=""
            label="Nota"
            type="file"
            input-classes="form-control-alternative"
            placeholder="uploda nota / bukti"
            v-model="formRecord.img"
            @change="selected"
        /> -->
        <input type="file" name="" id="" @change="selected" >
    </div>
</template>
<script src="https://cdn.rawgit.com/cretueusebiu/412715093d6e8980e7b176e9de663d97/raw/aea128d8d15d5f9f2d87892fb7d18b5f6953e952/objectToFormData.js"></script>
<script>
export default {
    props: ['formRecord'],

    // computed: {
    //     spend() {
    //         return this.$store.getters.spend
    //     }
    // },

    methods: {
        // fetchSpend() {
        //     this.$store.dispatch('fetchData', 'spending')
        // },
        selected(e) {
            this.formRecord.img = e.target.files[0];
            console.log(this.formRecord.img);
        }
    },

    // created() {
    //     this.fetchSpend()
    // }
}
</script>