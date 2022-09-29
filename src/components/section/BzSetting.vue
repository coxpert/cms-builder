<template>
  <div
    class="bz-el-setting-root"
    :class="{ edit, wrapContent }"
    @click="handleClick"
  >
    <slot />
    <div v-if="edit" class="setting">
      <div class="setting-icon">
        <setting-icon fill-color="#808080" />
      </div>
    </div>
  </div>
</template>

<script>
import SettingIcon from "../icons/Setting";
export default {
  name: "BzSetting",
  components: { SettingIcon },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      default: 0,
    },
    wrapContent: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick(e) {
      if (this.edit) {
        e.preventDefault();
        e.stopPropagation();
        this.$emit("click", this.index);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.bz-el-setting-root {
  position: relative;
  margin: -12px;
  padding: 12px;

  a {
    text-decoration: none !important;
  }

  &.wrapContent {
    width: max-content;
  }

  &.edit {
    border: solid 2px transparent;
  }

  .setting {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: transparent;
    left: 0;
    top: 0;
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 2;
    cursor: pointer;

    .setting-icon {
      background-color: white;
      padding: 5px;
      box-shadow: 0 0 4px 2px #00000022;
      border-radius: 2px;
    }
  }

  &.edit {
    &:hover {
      border: solid 2px var(--bz-edit-active);

      .setting {
        display: flex;
      }
    }
  }
}
</style>
