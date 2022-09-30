<template>
  <span
    :aria-hidden="decorative"
    :aria-label="title"
    :class="[data.class, data.staticClass]"
    class="material-design-icon delete-icon"
    role="img"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <svg
      :fill="fillColor"
      class="material-design-icon__svg"
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
    >
      <path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z">
        {{ title }}
      </path>
    </svg>
  </span>
</template>

<script>
export default {
  name: "bz-arrow-left-icon",
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
