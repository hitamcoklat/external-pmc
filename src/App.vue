<template>
<div>
  <template>
    <AppIndex />
  </template> 
</div>
</template>
<script>
  import AppIndex from '@/views/AppIndex.vue'

  export default {
    props: {
      source: String,
    },
    components: {
      AppIndex
    },    
    data: () => ({
      isLoggedIn: false,
    }),   
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
