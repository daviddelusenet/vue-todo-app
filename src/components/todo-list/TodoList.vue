<template>
  <ul>
    <li
      v-for="(todo, index) in todos"
      :class="{ finished: todo.isFinished }"
      :key="index"
    >
      <div class="checkbox">
        <input
          @click="toggleTodoIsFinished(index)"
          :checked="todo.isFinished"
          type="checkbox"
        />
        <font-awesome-icon :icon="['fas', 'check']" />
      </div>
      <span>
        {{ todo.value }}
      </span>
      <font-awesome-icon
        class="delete"
        :icon="['fas', 'trash-alt']"
        @click="removeTodo(index)"
      />
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
      required: true,
    },
    saveTodos: {
      type: Function as PropType<(todos: Todo[]) => void>,
      required: true,
    },
  },
  setup(props) {
    const removeTodo = (index: number) => {
      const newTodos = [
        ...props.todos.slice(0, index),
        ...props.todos.slice(index + 1),
      ];

      props.saveTodos(newTodos);
    };

    const toggleTodoIsFinished = (index: number) => {
      const newTodos = [
        ...props.todos.slice(0, index),
        {
          ...props.todos[index],
          isFinished: !props.todos[index].isFinished,
        },
        ...props.todos.slice(index + 1),
      ];

      props.saveTodos(newTodos);
    };

    return { removeTodo, toggleTodoIsFinished };
  },
});
</script>

<style scoped lang="scss">
ul {
  padding: 0 20px 20px;
}

li {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0 0 4px;

  &:last-of-type {
    margin: 0;
  }

  &.finished {
    span {
      text-decoration: line-through;
    }
  }
}

.checkbox {
  position: relative;
  display: flex;
  align-items: center;

  input {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    border: 1px solid var(--primary-button-background-color);
    cursor: pointer;

    &:checked {
      background-color: var(--primary-button-background-color);

      & + svg {
        display: block;
      }
    }
  }

  svg {
    display: none;
    pointer-events: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    font-size: 12px;
    color: var(--primary-button-color);
  }
}

span {
  flex: 1 1 auto;
  padding: 0 12px;
  word-break: break-all;
  hyphens: auto;
}

.delete {
  cursor: pointer;
  color: var(--secondary-color);

  &:hover {
    color: var(--primary-button-background-color);
  }
}
</style>
