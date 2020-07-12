<template>
    <base-input alternative=""
        label="Nama Lengkap"
        placeholder="Nama Lengkap"
        input-classes="form-control-alternative"
        v-model="formRecord.name"
    />
</template>

<script>
export default {
    props: ['formRecord'],

    data: () => ({

    })
}
</script>