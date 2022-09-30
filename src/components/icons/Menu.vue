<template>
  <span
    :aria-hidden="decorative"
    :aria-label="title"
    :class="[data.class, data.staticClass]"
    class="material-design-icon delete-icon"
    role="img"
    v-bind="data.attrs"
  >
    <svg
      :fill="fillColor"
      class="material-design-icon__svg"
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
    >
      <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z">
        {{ title }}
      </path>
    </svg>
  </span>
</template>

<script>
export default {
  name: "menu-icon",
  props: {
    title: {
      type: String,
      default: "Delete icon",
    },
    decorative: {
      type: Boolean,
      default: false,
    },
    fillColor: {
      type: String,
      default: "currentColor",
    },
    size: {
      type: Number,
      default: 24,
    },
  },
};
</script>
