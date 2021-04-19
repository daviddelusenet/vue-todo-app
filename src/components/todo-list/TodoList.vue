<template>
  <transition-group name="todo-list" tag="ul">
    <Todo
      v-for="todo in todos"
      v-bind="todo"
      :key="todo.id"
      @remove="removeTodo"
      @saveEdit="saveEditedTodo"
      @toggleIsFinished="toggleTodoIsFinished"
    >
      {{ todo.value }}
    </Todo>
  </transition-group>
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
    sortBy: {
      type: String,
      required: true,
    },
    todos: {
      type: Array as PropType<TodoProps[]>,
      required: true,
    },
  },
  methods: {
    removeTodo(id: string) {
      const index = this.getTodoIndex(id);

      const newTodos = [
        ...this.$props.todos.slice(0, index),
        ...this.$props.todos.slice(index + 1),
      ];

      this.$emit("saveTodos", newTodos);
    },
    saveEditedTodo(value: string, id: string) {
      const index = this.getTodoIndex(id);

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
    toggleTodoIsFinished(id: string) {
      const index = this.getTodoIndex(id);

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
    getTodoIndex(id: string): number {
      return this.$props.todos.findIndex((todo) => todo.id === id);
    },
  },
});
</script>

<style scoped lang="scss">
ul {
  padding: 0 20px 20px;

  li {
    transition: all 200ms ease-out;
  }
}

.todo-list {
  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
  }

  &-leave-from,
  &-enter-to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  &-leave-to {
    transform: translate3d(0, -20px, 0);
  }
}
</style>
