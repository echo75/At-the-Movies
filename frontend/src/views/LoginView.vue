<script>
import axios from 'axios'
import { mapActions } from 'pinia'
import { useAccountStore } from '../stores/account'
import { mapState } from 'pinia'
import '@/assets/fontawesome.min.js'

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      loginError: ''  // Fehlermeldevariable hinzugefügt
    }
  },
  computed: {
    ...mapState(useAccountStore, ['user'])
  },
  methods: {
    ...mapActions(useAccountStore, ['login']),

    async doLogin() {
      try {
        // Nur einmal login aufrufen
        await this.login({ email: this.email, password: this.password })
        
        // Nach erfolgreichem Login zur Suchseite weiterleiten
        this.$router.push('/search')
      } catch (error) {
        // Fehlerbehandlung
        this.loginError = 'Login fehlgeschlagen. Bitte überprüfe deine Anmeldedaten.'
        alert(this.loginError)
      }
    }
  }
}
import '../assets/login.css' // Import login.css only for this component
</script>

<template lang="pug">
.logincontainer
  .d-flex.justify-content-center.h-100
    .card
      .card-header
        h3 Log in
        p(v-if="user") You are logged in as {{ user?.firstName }} {{ user?.surName }}
      .card-body
        form(@submit.prevent="doLogin" v-if="!user")
          .input-group.form-group
            .input-group-prepend
              span.input-group-text
                i.fas.fa-envelope
            input#email.form-control(type="email" v-model="email" placeholder='email' required autofocus)
          .input-group.form-group
            .input-group-prepend
              span.input-group-text
                i.fas.fa-key
            input#password.form-control(type="password" v-model="password" placeholder='password' required)
          .form-group
            input.btn.float-right.login_btn(type='submit' value='Login')
      .card-footer
        .d-flex.justify-content-center.links
          | Don&apos;t have an account?
          a(href='/signup') Sign Up
        .d-flex.justify-content-center
          a(href='#') Forgot your password?
</template>
<style>
.card {
  height: 370px !important;
}

@media (min-width: 1400px) {
  .container-xxl,
  .container-xl,
  .container-lg,
  .container-md,
  .container-sm,
  .container {
    max-width: 1320px !important;
  }
}
.container {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  width: 100%;
  padding-right: calc(var(--bs-gutter-x) * 0.5);
  padding-left: calc(var(--bs-gutter-x) * 0.5);
  margin-right: auto;
  margin-left: auto;
}
</style>
