<template>
  <div class="filters">
    <div class="select-wrapper">
      <select @change="onSort($event)" :value="sortBy">
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
      <font-awesome-icon :icon="['fas', 'chevron-down']" />
    </div>
    <button @click="toggleTodosAreFinished">{{ buttonText }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export const sortByOptions: { text: string; value: string }[] = [
  {
    text: "Most recent",
    value: "most-recent",
  },
  {
    text: "Alphabetically",
    value: "alphabetically",
  },
  {
    text: "Finished",
    value: "finished",
  },
];

export default defineComponent({
  name: "Filters",
  props: {
    allTodosAreFinished: {
      type: Boolean,
      required: true,
    },
    sortBy: {
      type: String,
      required: true,
    },
  },
  data: function () {
    return {
      options: sortByOptions,
    };
  },
  emits: ["sort", "toggleTodosAreFinished"],
  methods: {
    onSort(event: { target: HTMLSelectElement }) {
      this.$emit("sort", event.target.value);
    },
    toggleTodosAreFinished() {
      this.$emit("toggleTodosAreFinished");
    },
  },
  computed: {
    buttonText(): string {
      return `Mark all as ${this.allTodosAreFinished ? "un" : ""}finished`;
    },
  },
});
</script>

<style lang="scss" scoped>
.filters {
  display: flex;
  align-items: center;
  padding: 0 20px 20px;
}

.select-wrapper {
  position: relative;
  margin: 0 8px 0 0;

  select {
    border: 1px solid var(--secondary-color);
    height: 32px;
    outline: none;
    padding: 0 32px 0 8px;
    width: 100%;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      border-color: var(--highlight-color);
    }

    &:focus,
    &:active {
      border-color: var(--highlight-color);

      & + svg {
        color: var(--primary-button-background-color);
      }
    }
  }

  svg {
    position: absolute;
    top: 50%;
    transform: translate3d(0, -50%, 0);
    right: 8px;
    color: var(--secondary-color);
    pointer-events: none;
  }
}

button {
  border: 1px solid var(--secondary-color);
  height: 32px;
  outline: none;
  padding: 0 8px;
  font-size: 14px;
  margin: 0 0 0 auto;

  &:hover {
    border-color: var(--highlight-color);
  }
}
</style>
