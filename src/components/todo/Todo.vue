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
    <div class="content" :class="{ 'is-being-edited': isBeingEdited }">
      <input
        ref="inputRef"
        type="text"
        :value="value"
        @dblclick="cancelEdit()"
        @keyup.esc="cancelEdit()"
        @keyup.enter="saveEdit($event)"
      />
      <p class="text" @dblclick="startEdit()">{{ value }}</p>
      <p class="date">{{ formattedDate }}</p>
    </div>
    <font-awesome-icon
      class="delete"
      :icon="['fas', 'trash-alt']"
      @click="remove()"
    />
  </li>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref } from "vue";
import dayjs from "dayjs";

export interface TodoProps {
  date: number;
  index: number;
  isEditedOn?: number;
  isFinished: boolean;
  value: string;
}

export default defineComponent({
  name: "Todo",
  data: function () {
    return {
      isBeingEdited: false,
    };
  },
  props: {
    date: {
      type: Number,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    isEditedOn: {
      type: Number,
      default: undefined,
    },
    isFinished: {
      type: Boolean,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  emits: ["remove", "saveEdit", "toggleIsFinished"],
  setup() {
    const inputRef = ref<HTMLInputElement>();

    return { inputRef };
  },
  methods: {
    remove() {
      this.$emit("remove", this.index);
    },
    toggleIsFinished() {
      this.$emit("toggleIsFinished", this.index);
    },
    async startEdit() {
      this.isBeingEdited = true;
      await nextTick();
      this.inputRef?.focus();
    },
    cancelEdit() {
      this.isBeingEdited = false;
    },
    saveEdit(event: { target: HTMLInputElement }) {
      this.$emit("saveEdit", event.target.value, this.index);
      this.isBeingEdited = false;
    },
  },
  computed: {
    formattedDate(): string {
      return this.isEditedOn
        ? `Last edited on ${dayjs(this.isEditedOn).format("HH:mm, DD/MM/YY")}`
        : `Added on ${dayjs(this.date).format("HH:mm, DD/MM/YY")}`;
    },
  },
});
</script>

<style lang="scss" scoped>
li {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0 0 8px;

  &:last-of-type {
    margin: 0;
  }

  &.finished {
    .text {
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

.content {
  flex: 1 1 auto;
  padding: 0 12px;
  word-break: break-all;
  hyphens: auto;

  .text {
    font-size: 16px;
    margin: 0 0 2px;
    cursor: pointer;
  }

  .date {
    font-size: 12px;
    font-style: italic;
    color: var(--secondary-color);
    line-height: 1;
  }

  input {
    display: none;
    height: 20px;
    margin: 2px 0 4px;
    border-bottom: 1px solid var(--secondary-color);
    width: 100%;
  }

  &.is-being-edited {
    input {
      display: block;
    }

    .text {
      display: none;
    }
  }
}

.delete {
  cursor: pointer;
  color: var(--secondary-color);
  width: 40px;
  flex: 0 0 auto;

  &:hover {
    color: var(--primary-button-background-color);
  }
}
</style>
