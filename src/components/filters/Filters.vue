<template>
  <div class="filters">
    <p>Sort by:</p>
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
  emits: ["onSort"],
  methods: {
    onSort(event: { target: HTMLSelectElement }) {
      this.$emit("onSort", event.target.value);
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

p {
  margin: 0 8px 0 0;
}

.select-wrapper {
  position: relative;

  select {
    border: 1px solid var(--secondary-color);
    height: 32px;
    outline: none;
    padding: 0 32px 0 8px;

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
  }
}
</style>
