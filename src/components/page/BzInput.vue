<template>
  <div class="bz-input-root">
    <div class="bz-input-base" :class="{ [size]: true }" :style="baseStyle">
      <label
        v-if="label"
        :class="{ active: value || prefix, focused }"
        style="pointer-events: none"
        >{{ label }} {{ required ? "*" : "" }}</label
      >
      <template v-if="multiple">
        <textarea
          v-model="data"
          :rows="rows"
          @focus="focused = true"
          @focusout="focused = false"
        ></textarea>
      </template>
      <template v-else>
        <div
          style="display: flex; align-items: center; height: 100%; width: 100%"
          :class="{ prefix }"
        >
          <span>{{ prefix }}</span>
          <input
            v-model="data"
            :class="{ prefix }"
            :placeholder="prefix ? '' : placeholder || label"
            @focus="focused = true"
            @focusout="focused = false"
            @blur="onBlur"
          />
        </div>
      </template>
    </div>
    <small
      v-show="required && label && !value"
      style="text-transform: lowercase; color: #ff1744"
      >{{ label }} is required</small
    >
  </div>
</template>

<script>
export default {
  name: "BzInput",
  props: {
    onBlur: {
      type: Function,
      default: () => {},
    },
    value: {
      type: [String, Number],
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: Number,
      default: 10,
    },
    height: {
      type: Number,
      default: 40,
    },
    required: {
      type: Boolean,
      default: false,
    },
    prefix: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "normal",
    },
  },
  data() {
    return {
      focused: false,
    };
  },
  computed: {
    data: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    baseStyle() {
      if (!this.multiple && this.height) {
        return { height: this.height + "px" };
      }
      return {};
    },
  },
};
</script>
<style lang="scss" scoped>
$active: #0069d9;
.bz-input-root {
  width: 100%;
  min-height: 40px;

  .bz-input-base {
    width: 100%;
    position: relative;
    border: solid 1px #8080807f;
    border-radius: 4px;
    display: flex;
    align-items: center;
    background-color: white;
    flex-direction: column;

    &:focus,
    &:focus-within,
    &:focus-visible {
      border: solid 1px #0069d9;
    }

    .prefix {
      padding-left: 10px;
    }

    label {
      position: absolute;
      left: 5px;
      padding: 0 5px;
      top: min(calc(50% - 9px), 12px);
      background-color: white;
      line-height: 18px;
      font-size: 16px;
      transition: top 0.3s, font-size 0.3s;
      color: #808080;
      font-weight: 300;

      &.active,
      &.focused {
        top: -8px;
        line-height: 10px;
        background-color: inherit;
        font-size: 12px;
        transition: top 0.3s, font-size 0.3s;
      }
      &.focused {
        color: $active;
      }
    }

    textarea,
    input {
      padding-left: 10px;
      background-color: transparent;
      border: none;
      width: 100%;
      font-size: 16px;
      font-weight: 300;
      height: 100%;
    }
    input {
      &.prefix {
        padding-left: 0;
      }
    }
    textarea {
      padding-top: 10px;
    }
  }
}
</style>
