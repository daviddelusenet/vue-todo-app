<template>
  <div>
    <p>Sort by:</p>
    <select @change="onSort($event)" :value="sortBy">
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
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
div {
  display: flex;
  align-items: center;
  padding: 0 20px 20px;
}
</style>
