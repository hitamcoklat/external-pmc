<template>
<div>
  <form>
    <v-text-field
      v-model="noIp"
      label="Masukan IP Address Aplikasi ini berada."
      required
      outlined
      style="width: 40%; margin-top: 20px;"
    ></v-text-field>
    <v-btn class="mr-4" @click="submit">submit</v-btn>
  </form>
  <br />
  <pre>
    Masukan IP Address dari server Aplikasi ini berada (Bukan server SIMGOS)      
  </pre>
</div>
</template>

<script>
export default {
    name: 'Dashboard',
    data: () => ({
        noIp: ''      
    }),
    methods: {
      submit() {
        // Store
        localStorage.setItem("ip_address", this.noIp);
      }
    },
    created() {
        this.noIp = localStorage.getItem("ip_address")
    },
    beforeCreate () {

    }      
}
</script>