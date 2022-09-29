<template>
  <span
    :aria-hidden="props.decorative"
    :aria-label="props.title"
    class="material-design-icon delete-icon"
    role="img"
    v-on="listeners"
  >
    <svg
      :fill="props.fillColor"
      class="material-design-icon__svg"
      :width="props.size"
      :height="props.size"
      viewBox="0 0 24 24"
    >
      <path d="M4 20h16v2H4zM4 2h16v2H4zm9 7h3l-4-4-4 4h3v6H8l4 4 4-4h-3z">
        <title>{{ props.title }}</title>
      </path>
    </svg>
  </span>
</template>

<script>
export default {
  name: "BzExpandIcon",
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

<style scoped></style>
