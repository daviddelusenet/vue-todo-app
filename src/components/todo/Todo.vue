<template>
  <li :class="{ finished: isFinished }">
    <div class="checkbox">
      <input
        type="checkbox"
        :checked="isFinished"
        @click="toggleIsFinished()"
      />
      <font-awesome-icon :icon="['fas', 'check']" />
    </div>
    <span>
      <slot></slot>
    </span>
    <font-awesome-icon
      class="delete"
      :icon="['fas', 'trash-alt']"
      @click="remove()"
    />
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export interface TodoProps {
  isFinished: boolean;
  value: string;
}

export default defineComponent({
  name: "Todo",
  props: {
    isFinished: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    remove() {
      this.$emit("remove");
    },
    toggleIsFinished() {
      this.$emit("toggleIsFinished");
    },
  },
});
</script>

<style lang="scss" scoped>
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
