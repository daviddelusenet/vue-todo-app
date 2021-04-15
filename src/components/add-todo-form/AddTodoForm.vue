<template>
  <form @submit.prevent="addTodo()">
    <input name="todo" placeholder="What needs to be done?" v-model="newTodo" />
    <button><font-awesome-icon :icon="['fas', 'plus']" /></button>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { TodoProps } from "../todo/Todo.vue";

export default defineComponent({
  name: "AddTodoForm",
  props: {
    todos: {
      type: Array as PropType<TodoProps[]>,
      required: true,
    },
  },
  setup() {
    const newTodo = ref("");

    return { newTodo };
  },
  methods: {
    addTodo() {
      if (this.newTodo) {
        const newTodos = [
          ...this.$props.todos,
          {
            date: Date.now(),
            isEdited: false,
            isFinished: false,
            value: this.newTodo,
          },
        ];

        this.newTodo = "";

        this.$emit("addTodo", newTodos);
      }
    },
  },
});
</script>

<style scoped lang="scss">
form {
  display: flex;
  align-items: center;
  padding: 0 20px 20px;
}

input {
  border: 1px solid var(--secondary-color);
  border-right: 0;
  height: 40px;
  padding: 0 8px;
  flex: 1 1 auto;
  min-width: 0;

  &:focus {
    border-color: var(--primary-button-background-color);
  }
}

button {
  background-color: var(--primary-button-background-color);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    svg {
      color: var(--primary-button-color);
    }
  }
}
</style>
