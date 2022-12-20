<template>
  <section class="template-boards main-boards">
    <div class="flex viewed" style="align-items: center; gap: 0.5rem">
      <i class="bi bi-arrow-repeat" style="font-size: 2rem"></i>
      <strong> Popular template </strong>
    </div>
    <div>
      <div
        class="boards-container flex"
        v-if="templateBoards && templateBoards.length"
      >
        <div v-for="temp in getTempS" :key="temp._id">
          <div
            class="card-board flex pointer"
            :style="temp.style"
            @click="createBoardTemp(temp)"
          >
            <h3 class="card-title">{{ temp.title }}</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { boardService } from "../../service/board.service.js";
export default {
  props: {},
  data() {
    return {
      templateBoards: [],
    };
  },
  created() {
    this.getTemplate();
  },
  methods: {
    async getTemplate() {
      this.templateBoards = await boardService.getTemplates();
    },
    openBoard(id) {
      this.$router.push(`/board/${id}`);
    },
    async createBoardTemp(temp) {
      const copyUser = JSON.parse(
        JSON.stringify(this.$store.getters.getUserConnect)
      );
      try {
        const newBoard = await boardService.createBoardTemp(temp, copyUser);
        copyUser.boards.boards.push(newBoard._id);
        this.$store.dispatch({ type: "updateUser", currUser: copyUser });
        this.$router.push(`/board/${newBoard._id}`);
      } catch (err) {
        throw err;
      }
    },
  },
  computed: {
    getTempS() {
      return this.templateBoards;
    },
  },
  components: {},
};
</script>

<style scoped></style>
