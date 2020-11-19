import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Home from "../views/Home.vue";
import CrearPelicula from "../views/CrearPelicula.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/registro",
    name: "Registro",
    component: Register
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/crear-pelicula",
    name: "crear-pelicula",
    component: CrearPelicula
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
