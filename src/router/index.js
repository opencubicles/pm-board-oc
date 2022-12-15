import { createRouter, createWebHashHistory } from "vue-router";

import home from "../pages/home.vue";
import boards from "../pages/board-page.vue";
import cardDetails from "../pages/card-details.vue";
import board from "../pages/board.vue";
import login from "../pages/login.vue";
import logout from "../pages/logout.vue";
import signup from "../pages/signup.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/logout",
    name: "logout",
    component: logout,
  },
  {
    path: "/signup/:email?",
    name: "signup",
    component: signup,
  },
  {
    path: "/:boardId/boards",
    name: "boards",
    component: boards,
  },

  {
    path: "/board/:boardId",
    name: "board",
    component: board,
    children: [
      {
        path: "/board/:boardId/:cardId",
        name: "cardDetails",
        component: cardDetails,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
