<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0">
                    <div class="card-body px-lg-5 py-lg-5">
                        <div class="text-center text-muted mb-4">
                            <small>Or sign in with credentials</small>
                        </div>
                        <form @submit.prevent="loginForm()" role="form">
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Email"
                                        addon-left-icon="ni ni-email-83"
                                        v-model="form.email">
                            </base-input>

                            <base-input class="input-group-alternative"
                                        placeholder="Password"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="form.password">
                            </base-input>

                            <base-checkbox class="custom-control-alternative" v-model="form.remember_me">
                                <span class="text-muted">Remember me</span>
                            </base-checkbox>
                            <div class="text-center">
                                <base-button :disabled="isDisabled" type="primary" @click.prevent="loginForm()" class="my-4">Sign in</base-button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <a href="#" class="text-light"><small>Forgot password?</small></a>
                    </div>
                    <div class="col-6 text-right">
                        <router-link to="/register" class="text-light"><small>Create new account</small></router-link>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
import { Form } from 'vform'
import Swal from 'sweetalert2'
import { mapGetters } from 'vuex'
  export default {
    name: 'login',
    data() {
      return {
        form: new Form ({
          email: '',
          password: '',
          remember_me: false,
        }),
        isDisabled: false,
      }
    },
    computed: {
        ...mapGetters({
            currentUser: 'user',
            isLoggedIn: 'isLoggedIn'
        })
    },
    methods: {
        loginForm() {
            this.isDisabled = true
            this.$store.dispatch('login', this.form).then(() => {
                if (this.isLoggedIn == true) {
                    Swal.fire(
                        'Success',
                        'Login Berhasil',
                        'success'
                    )
                    this.$router.push({ path: 'dashboard' })
                }
                else {
                    Swal.fire(
                        'Gagal',
                        'Login Gagall',
                        'error'
                    )
                    // this.$router.push({ path: 'login' })
                }
            }).catch(() => {
                this.isDisabled = false
                Swal.fire(
                    'Gagal',
                    'Login Gagal',
                    'error'
                )
            })
        }
    },
  }
</script>
<style>
</style>
