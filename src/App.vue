<template>
  <Header :todosLength="todosLength" />
  <AddTodoForm :saveTodos="saveTodos" :todos="todos" />
  <TodoList :saveTodos="saveTodos" :todos="todos" />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import AddTodoForm from "./components/add-todo-form/AddTodoForm.vue";
import Header from "./components/header/Header.vue";
import TodoList from "./components/todo-list/TodoList.vue";

export interface Todo {
  isFinished: boolean;
  value: string;
}

export default defineComponent({
  name: "App",
  components: {
    AddTodoForm,
    Header,
    TodoList,
  },
  setup() {
    const todos = ref<Todo[]>(
      JSON.parse(localStorage.getItem("todos") || "[]")
    );

    const todosLength = computed(() => todos.value.length);

    const saveTodos = (newTodos: Todo[]) => {
      todos.value = newTodos;
      localStorage.setItem("todos", JSON.stringify(newTodos));
    };

    return { saveTodos, todos, todosLength };
  },
});
</script>

<style lang="scss">
@import "~ress";

:root {
  --primary-color: #14213d;
  --secondary-color: #e5e5e5;
  --highlight-color: #14213d;
  --primary-button-background-color: #fca311;
  --primary-button-color: #fff;
  --primary-background-color: #fff;
}

html {
  background-color: #e5e5e5;
  padding: 0 12px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--primary-color);
  max-width: 400px;
  margin: 60px auto;
  padding: 20px 0 0 0;
  background-color: var(--primary-background-color);
  line-height: 1.5;

  button,
  input {
    outline: none;
  }
}
</style>
