<template>
  <span
    :aria-hidden="decorative"
    :aria-label="title"
    class="material-design-icon delete-icon"
    role="img"
  >
    <svg
      :fill="fillColor"
      class="material-design-icon__svg"
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
    >
      <path d="M19 13H5v-2h14v2z">
        {{ title }}
      </path>
    </svg>
  </span>
</template>

<script>
export default {
  name: "BzRemoveIcon",
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
