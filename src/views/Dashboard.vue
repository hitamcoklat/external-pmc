<template>
  <div>
    <v-alert
      border="left"
      colored-border
      color="deep-purple accent-4"
      elevation="2"
    >
      Aplikasi ini berfungsi untuk memfasilitasi fitur yang error/tidak tersedia di Aplikasi SIMGOS
    </v-alert>
  </div>
</template>

<script>
export default {
    name: 'Dashboard',
    beforeCreate () {
        console.log(this.$store.getters.isLogged)
        console.log(this.$store.getters.userData)
        if (this.$store.getters.isLogged) {
          this.isLoggedIn = this.$store.getters.isLogged
          this.$router.push('/dashboard')            
        }else {
          this.$router.push('/')            
        }
    }      
}
</script>