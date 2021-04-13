<template>
  <form @submit.prevent="addTodo()">
    <input name="todo" placeholder="What needs to be done?" v-model="newTodo" />
    <button>Add todo</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { Todo } from "../../App.vue";

export default defineComponent({
  name: "AddTodoForm",
  props: {
    todos: {
      type: Array as PropType<Todo[]>,
      isRequired: true,
      default: () => [],
    },
    saveTodos: {
      type: Function as PropType<(todos: Todo[]) => void>,
      isRequired: true,
    },
  },
  setup(props) {
    const newTodo = ref("");

    const addTodo = () => {
      if (newTodo.value) {
        const newTodos = [
          ...props.todos,
          {
            isDone: false,
            value: newTodo.value,
          },
        ];

        newTodo.value = "";

        props.saveTodos?.(newTodos);
      }
    };

    return { addTodo, newTodo };
  },
});
</script>

<style scoped lang="scss">
form {
  margin: 40px 0 0;
}
</style>
