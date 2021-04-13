<template>
  <AddTodoForm :saveTodos="saveTodos" :todos="todos" />
  <TodoList :todos="todos" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AddTodoForm from "./components/add-todo-form/AddTodoForm.vue";
import TodoList from "./components/todo-list/TodoList.vue";

export interface Todo {
  isDone: boolean;
  value: string;
}

export default defineComponent({
  name: "App",
  components: {
    AddTodoForm,
    TodoList,
  },
  setup() {
    const todos = ref<Todo[]>(
      JSON.parse(localStorage.getItem("todos") || "[]")
    );

    const saveTodos = (newTodos: Todo[]) => {
      todos.value = newTodos;
      localStorage.setItem("todos", JSON.stringify(newTodos));
    };

    return { saveTodos, todos };
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
