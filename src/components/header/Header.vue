<template>
  <header>
    <h1>Todo's</h1>
    <p>{{ todosLength }} items</p>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
  props: {
    todosLength: {
      type: Number,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 20px;
}

h1 {
  font-size: 24px;
}

p {
  font-size: 16px;
  color: var(--secondary-color);
}
</style>
