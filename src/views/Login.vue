<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Masukan username"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="username"
                  />

                  <v-text-field
                    id="password"
                    label="Masukan password"
                    name="password"
                    prepend-icon="mdi-lock-question"
                    type="password"
                    v-model="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn v-on:click="loginSubmit" color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Info!</v-card-title>

        <v-card-text>
          Username atau Password yang anda masukan salah!. Silahkan cek kembali username dan password yang anda masukan.
        </v-card-text>

      </v-card>
    </v-dialog>
    <!-- Loading Login -->
    <v-dialog
      v-model="dialogLoading"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Please wait...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>     
    <!-- Loading Login -->
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      dialog: false,
      dialogLoading: false,
      username: "",
      password: ""
    }),     
    methods: {
        loginSubmit: function() {
            let data = {
                username: this.username,
                password: this.password
            }
            this.$http.post(this.$apiUrl + '/login', data)
                .then((response) => {
                  console.log(response)
                  if(response.data.success == true) {
                    this.dialogLoading = true
                    setTimeout(() => {
                      this.dialogLoading = false
                      localStorage.setItem('token', response.data.api_token);
                      this.$store.commit('LOGIN_USER', response.data.message)
                      this.$router.push('/dashboard')                    
                    }, 2000);                    
                  }else{
                    this.dialog = true
                  }
                })
        }
    },
    beforeCreate () {
        console.log(this.$store.getters.isLogged)
        console.log(this.$store.getters.userData)
        if (this.$store.getters.isLogged) {
          this.isLoggedIn = this.$store.getters.isLogged
          this.$router.push('/dashboard')            
        }
    }   
  }
</script>
