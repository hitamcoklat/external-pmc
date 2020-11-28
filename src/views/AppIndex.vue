<template>
  <v-app id="inspire">

    <v-app-bar
      app
      clipped-right
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>RS PMC SUPERADMIN</v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
    >
    <v-list dense>
      <router-link tag="span" to="/dashboard">
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>      
      <router-link tag="span" to="/pendaftaran">
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Pendaftaran</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
      <router-link tag="span" to="/tindakan">
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Tindakan</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
      <router-link tag="span" to="/obat">
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Obat</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
      <router-link tag="span" to="/dokter">
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dokter</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
      <router-link tag="span" to="/bridging-kamar">
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Bridging Kamar</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
      <router-link tag="span" to="/dashboard-bpjs">
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard BPJS</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
      <router-link tag="span" to="/config">
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Konfigurasi</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
    </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer
      v-model="left"
      fixed
      temporary
    />

    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-dialog
      v-model="dialog"
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
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },

    data: () => ({
      dialog: false,
      drawer: null,
      drawerRight: null,
      right: false,
      left: false,
    }),

    methods: {
      logout: function() {
        this.dialog = true
        setTimeout(() => {
          this.dialog = false
          this.$router.push('/logout')
        }, 2000);
      }
    }

  }
</script>
