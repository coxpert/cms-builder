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
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z">
        {{ title }}
      </path>
    </svg>
  </span>
</template>

<script>
export default {
  name: "bz-plus-icon",
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
