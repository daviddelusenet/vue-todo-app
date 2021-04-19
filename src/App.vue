<template>
  <Header :todosLength="todosLength" />
  <AddTodoForm :todos="todos" @addTodo="saveTodos" />
  <Filters
    :allTodosAreFinished="allTodosAreFinished"
    :sortBy="sortByValue"
    @sort="onSort"
    @toggleTodosAreFinished="toggleTodosAreFinished"
  />
  <TodoList :sortBy="sortByValue" :todos="sortedTodos" @saveTodos="saveTodos" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AddTodoForm from "./components/add-todo-form/AddTodoForm.vue";
import Header from "./components/header/Header.vue";
import Filters, { sortByOptions } from "./components/filters/Filters.vue";
import TodoList from "./components/todo-list/TodoList.vue";
import { TodoProps } from "./components/todo/Todo.vue";

export default defineComponent({
  name: "App",
  data: function () {
    return {
      sortByValue: sortByOptions[0].value,
    };
  },
  components: {
    AddTodoForm,
    Filters,
    Header,
    TodoList,
  },
  setup() {
    const todos = ref<TodoProps[]>(
      JSON.parse(localStorage.getItem("todos") || "[]")
    );

    return { todos };
  },
  methods: {
    saveTodos(newTodos: TodoProps[]) {
      this.todos = newTodos;
      localStorage.setItem("todos", JSON.stringify(newTodos));
    },
    onSort(value: string) {
      this.sortByValue = value;
    },
    toggleTodosAreFinished() {
      this.saveTodos(
        this.todos.map((todo) => ({
          ...todo,
          isFinished: !this.allTodosAreFinished,
        }))
      );
    },
  },
  computed: {
    sortedTodos(): TodoProps[] {
      if (this.sortByValue === "alphabetically") {
        return this.todos.slice(0).sort((a, b) => (a.value > b.value ? 1 : -1));
      } else if (this.sortByValue === "finished") {
        return this.todos.slice(0).sort((a, b) => {
          if (a.isFinished === b.isFinished) {
            return 0;
          }

          return a.isFinished ? -1 : 1;
        });
      } else if (this.sortByValue === "most-recent") {
        return this.todos.slice(0).sort((a, b) => (a.date > b.date ? 1 : -1));
      }

      return this.todos;
    },
    todosLength(): number {
      return this.todos.length;
    },
    allTodosAreFinished(): boolean {
      return this.todos.every(({ isFinished }) => isFinished);
    },
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
