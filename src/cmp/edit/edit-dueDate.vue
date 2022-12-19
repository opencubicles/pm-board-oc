<template>
  <section class="edit-dueDate">
    <header>
      <h2>{{ header }}</h2>
      <a @click="closeModel" class="el-icon-close"
        ><el-icon><CloseBold /></el-icon>
      </a>
    </header>
    <div class="dueDate-container">
      <date-picker
        type="date"
        :clearable="false"
        :inline="true"
        @change="setDueDate"
        v-model="dueTime"
        valueType="format"
        :editable="false"
      ></date-picker>

      <div class="dueDate-show">
        <h3 :class="{ activ: checkbox }">Due date</h3>
        <input
          :class="{ activ: checkbox }"
          class="dueDate-checkbox"
          type="checkbox"
          v-model="checkbox"
        />
        <input
          :class="{ activ: checkbox }"
          class="date dueDate-date"
          type="text"
          v-model="dueTime"
          placeholder="M/D/YYY"
        />
        <input
          :class="{ activ: checkbox }"
          class="date dueDate-hour"
          type="text"
          v-model="dateTime"
          placeholder="h/mm A"
        />
      </div>
      <div class="dueDate-reminder">
        <h3>Set due date reminder</h3>
        <select class="dueDate-select">
          <option v-for="(r, idx) in remindOption" :key="idx" value="r">
            {{ r }}
          </option>
        </select>
        <p class="dueDate-txt">
          Reminders will be sent to all members and watchers of this card.
        </p>
      </div>
      <div class="dueDate-btn">
        <a @click="saveDueDate" class="save-btn">Save</a>
        <a class="remove-btn">Remove</a>
      </div>
    </div>
  </section>
</template>

<script>
import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";
export default {
  name: "edit-dueDate",
  props: {
    header: {
      type: String,
    },
    card: {
      type: Object,
    },
  },
  data() {
    return {
      dueTime: new Date(),
      dateTime: null,
      checkbox: false,
      remind: "None",
      datePickerOpen: true,
      remindOption: [
        "None",
        "At time of due date",
        "5 Minutes before",
        "10 Minutes before",
        "15 Minutes before",
        "1 Hour before",
        "2 Hours before",
        "1 Day before",
        "2 Days before",
      ],
    };
  },
  created() {
    if (this.card.dueDate) {
      this.dueTime = this.card.dueDate.date.date;
      this.dateTime = this.card.dueDate.date.time;
      this.checkbox = true;
    }
  },
  methods: {
    closeModel() {
      this.$emit("closeModel");
    },
    setDueDate(date) {
      this.checkbox = true;
      this.datePickerOpen = false;
      this.dueTime = date;
      // this.$emit();
      //   if (!this.dateTime) this.dateTime = new Date(Date.now()).toLocaleTimeString();
      // },
    },
    saveDueDate() {
      // let dueDate = { date: Date.now(this.dueTime), remind: this.remind };
      let dueDate = {
        date: { date: this.dueTime, time: this.dateTime },
        remind: this.remind,
      };
      // let dueDate = { date: this.dueTime, remind: this.remind };
      dueDate = JSON.parse(JSON.stringify(dueDate));
      this.$emit("dueDate", dueDate);
    },
  },
  watch: {
    checkbox() {
      if (this.checkbox) {
        this.dateTime = new Date(Date.now()).toLocaleTimeString();
      } else {
        this.dateTime = null;
        this.dueTime = null;
      }
    },
  },

  components: { DatePicker },
};
</script>

<style></style>
