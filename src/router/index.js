import { createRouter, createWebHashHistory } from "vue-router";
import RecipeView from "../views/RecipeView.vue";
import AddIngredientView from "../views/AddIngredientView.vue";

const routes = [
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/recipe",
    name: "recipe",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: RecipeView,
  },
  {
    path: "/foodsearch",
    name: "foodsearch",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AddIngredientView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
