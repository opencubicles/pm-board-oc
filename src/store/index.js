import { createStore } from "vuex";
import { boardStore } from "./board.store.js";
import { userStore } from "./user.store.js";

export default createStore({
  strict: true,
  modules: {
    userStore,
    boardStore,
  },
});
