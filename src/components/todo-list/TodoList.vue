<template>
  <ul>
    <Todo
      v-for="({ isFinished, value }, index) in todos"
      :key="index"
      :isFinished="isFinished"
      @remove="removeTodo(index)"
      @toggleIsFinished="toggleTodoIsFinished(index)"
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
    saveTodos: {
      type: Function as PropType<(todos: TodoProps[]) => void>,
      required: true,
    },
  },
  methods: {
    removeTodo(index: number) {
      const newTodos = [
        ...this.$props.todos.slice(0, index),
        ...this.$props.todos.slice(index + 1),
      ];

      this.$props.saveTodos(newTodos);
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

      this.$props.saveTodos(newTodos);
    },
  },
});
</script>

<style scoped lang="scss">
ul {
  padding: 0 20px 20px;
}
</style>
