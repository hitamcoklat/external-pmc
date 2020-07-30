<template>
  <v-app>
<v-app-bar
      app
      clipped-right
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Toolbar</v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
    >
    <v-list dense>
      <router-link to="/">
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>      
      <router-link to="/pendaftaran">
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Pendaftaran</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
      <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-contact-mail</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer
      v-model="left"
      fixed
      temporary
    />
  </v-app>
</template>
<script>
export default {
    name: 'AppBar',

    data: () => ({
      drawer: null,
      drawerRight: null,
      right: false,
      left: false,
    }),
}
</script>