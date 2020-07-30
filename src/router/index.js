import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Pendaftaran from '../views/Pendaftaran.vue'
import Tindakan from '../views/Tindakan.vue'
import Login from '../views/Login.vue'
import Logout from "../components/Logout.vue"
import Dashboard from "../views/Dashboard.vue"
import Obat from "../views/Obat.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/pendaftaran",
    name: "Pendaftaran",
    component: Pendaftaran
  },
  {
    path: "/tindakan",
    name: "Tindakan",
    component: Tindakan
  },
  {
    path: "/obat",
    name: "Obat",
    component: Obat
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  routes
})

export default router
