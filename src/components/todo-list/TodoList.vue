<template>
  <ul>
    <Todo
      v-for="(todo, index) in todos"
      v-bind="todo"
      :index="index"
      :key="index"
      @remove="removeTodo"
      @saveEdit="saveEditedTodo"
      @toggleIsFinished="toggleTodoIsFinished"
    >
      {{ value }}
    </Todo>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Todo, { TodoProps } from "../todo/Todo.vue";

export default defineComponent({
  name: "TodoList",
  components: {
    Todo,
  },
  props: {
    todos: {
      type: Array as PropType<TodoProps[]>,
      required: true,
    },
  },
  methods: {
    removeTodo(index: number) {
      const newTodos = [
        ...this.$props.todos.slice(0, index),
        ...this.$props.todos.slice(index + 1),
      ];

      this.$emit("saveTodos", newTodos);
    },
    saveEditedTodo(value: string, index: number) {
      const newTodos = [
        ...this.$props.todos.slice(0, index),
        {
          ...this.$props.todos[index],
          isEditedOn: Date.now(),
          value,
        },
        ...this.$props.todos.slice(index + 1),
      ];

      this.$emit("saveTodos", newTodos);
    },
    toggleTodoIsFinished(index: number) {
      const newTodos = [
        ...this.$props.todos.slice(0, index),
        {
          ...this.$props.todos[index],
          isFinished: !this.$props.todos[index].isFinished,
        },
        ...this.$props.todos.slice(index + 1),
      ];

      this.$emit("saveTodos", newTodos);
    },
  },
});
</script>

<style scoped lang="scss">
ul {
  padding: 0 20px 20px;
}
</style>
