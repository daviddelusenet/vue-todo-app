<template>
  <ul>
    <li v-for="(todo, index) in todos" :key="index">
      <span :class="{ done: todo.done }" @click="doneTodo(todo)">
        {{ todo.value }}
      </span>
      <button @click="removeTodo(index)">Remove</button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Todo } from "../../App.vue";

export default defineComponent({
  name: "TodoList",
  props: {
    todos: {
      type: Array as PropType<Todo[]>,
      isRequired: true,
    },
  },
  setup(props) {
    const removeTodo = (index: number) => {
      if (props.todos) {
        const newTodos = [
          ...props.todos.slice(0, index),
          ...props.todos.slice(index + 1),
        ];

        props.saveTodos?.(newTodos);
      }
    };

    return { removeTodo };
  },
});
</script>

<style scoped lang="scss">
.todo-list {
  margin: 40px 0 0;
}
</style>
