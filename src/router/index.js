import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/instructions",
    name: "Instructions",
    meta: {
      title: "Memory Game - Instructions Page",
      metaTags: [
        {
          name: "description",
          content:
            "This is the instructions page for the accessible Memory Game using Vue.js."
        }
      ]
    },

    component: () =>
      import(/* webpackChunkName: "instructions" */ "../views/Instructions.vue")
  }
]

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
