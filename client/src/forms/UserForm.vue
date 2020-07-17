<template>
    <div>
        <base-input
            label="Nama Lengkap"
            placeholder="Nama Lengkap"
            input-classes="form-control-alternative"
            v-model="formRecord.name"
        />

        <base-input 
            label="Email"
            placeholder="Alamat Email"
            input-classes="form-control-alternative"
            v-model="formRecord.email"
        />

        <base-input 
            label="Password"
            placeholder="Password"
            type="password"
            input-classes="form-control-alternative"
            v-model="formRecord.password"
        />

        <base-input alternative="" label="User">
            <select class="form-control form-control-alternative" v-model="formRecord.role">
                <option value="">Pilih Hak Akses</option>
                <option v-for="role in roles" :key="role" :value="role">
                    {{ role }}
                </option>
            </select>
        </base-input>

        <base-input
            label="No Hp"
            placeholder="No HP"
            input-classes="form-control-alternative"
            v-model="formRecord.phone"
        />

        <base-input alternative="" label="Alamat">
            <textarea class="form-control form-control-alternative" v-model="formRecord.address" rows="3" placeholder="Alamat"></textarea>
        </base-input>
    </div>
</template>

<script>
export default {
    props: [
        'formRecord', 'record', 'modelName'
    ],
    
    data: () => ({
        roles: [
            'Admin', 'Pegawai', 'Pengelola'
        ]
    })
}
</script>