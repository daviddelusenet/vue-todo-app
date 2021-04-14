<template>
  <form @submit.prevent="addTodo()">
    <input name="todo" placeholder="What needs to be done?" v-model="newTodo" />
    <button><font-awesome-icon :icon="['fas', 'plus']" /></button>
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
      required: true,
    },
    saveTodos: {
      type: Function as PropType<(todos: Todo[]) => void>,
      required: true,
    },
  },
  setup(props) {
    const newTodo = ref("");

    const addTodo = () => {
      if (newTodo.value) {
        const newTodos = [
          ...props.todos,
          {
            isFinished: false,
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
