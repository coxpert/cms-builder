<template>
  <modal
    :classes="['preset-theme-name-modal']"
    name="preset-theme-name-modal"
    @closed="onClose()"
  >
    <div
      style="background-color: rgb(246, 246, 246)"
      class="d-flex p-3 justify-content-between"
    >
      <h5>Add Theme template.</h5>
      <div class="cursor-pointer" @click.prevent="onClose()">
        <CloseIcon />
      </div>
    </div>
    <div class="w-100 h-100">
      <div class="col-12 h-100">
        <p>what would you like to name this template?</p>
        <div
          class="w-100 h-100 d-flex justify-content-center align-items-center"
        >
          <bz-input v-model="themeName" label="Template Name" :height="45" />
        </div>
      </div>
    </div>
    <hr style="margin-top: auto" />
    <div class="w-100 d-flex justify-content-end pb-2">
      <button
        class="btn bz-btn-default mr-4 d-flex align-items-center"
        @click="onConfirm"
      >
        <b>Add Template</b>
      </button>
    </div>
  </modal>
</template>

<script>
import CloseIcon from "../icons/Close";
import BzInput from "../page/BzInput";

export default {
  name: "PresetThemeNameModal",
  components: { BzInput, CloseIcon },
  data() {
    return {
      themeName: "",
    };
  },
  mounted() {
    this.$modal.show("preset-theme-name-modal");
  },
  methods: {
    onClose() {
      this.$emit("close");
    },
    onConfirm() {
      if (!this.themeName) {
        this.$toast.error("Enter the theme name!");
        return;
      }
      this.$emit("confirm", this.themeName);
    },
  },
};
</script>
<style lang="scss">
.preset-theme-name-modal {
  height: 200px !important;
  display: flex;
  flex-direction: column;
  top: 150px !important;
}
</style>
