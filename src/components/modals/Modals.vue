<template>
  <div>
    <navigation-builder-modal v-if="openNavigationBuilderModal" />
    <manage-markers-modal v-if="openManageMarkers" />
    <embed-link-modal v-if="openEmbedLink" />
    <image-select-modal v-if="openImageEditor" />
    <attach-link-modal v-if="openAttachLink" />
    <alt-text-modal v-if="openAltText" />
    <icon-selector-modal v-if="openIconSelector" />
    <page-setting-modal v-if="openPageSettingModal" />
    <contact-form-setting-modal v-if="openContactFormSetting" />
    <bz-time-picker v-if="openTimePicker" />
    <promotion-modal v-if="openPromotionModal" />
    <subscribe-modal v-if="openSubscribeModal" />
    <video-modal v-if="openVideoModal" />
  </div>
</template>

<script>
import ImageSelectModal from "./ImageSelectModal";
import EmbedLinkModal from "./EmbedLinkModal";
import AttachLinkModal from "./AttachLinkModal";
import AltTextModal from "./AltTextModal";
import PageSettingModal from "./PageSettingModal";
import IconSelectorModal from "./IconSelectorModal";
import ContactFormSettingModal from "./ContactFormSettingModal";
import ManageMarkersModal from "./ManageMarkersModal";
import PromotionModal from "./PromotionModal";
import SubscribeModal from "./SubscribeModal";
import VideoModal from "./VideoModal";
import BzTimePicker from "../page/BzTimePicker";
import componentMixin from "../../mixins/componentMixin";
import NavigationBuilderModal from "./NavigationBuilderModal";
import builderMixin from "../../mixins/builderMixin";

export default {
  components: {
    NavigationBuilderModal,
    VideoModal,
    SubscribeModal,
    PromotionModal,
    ManageMarkersModal,
    EmbedLinkModal,
    ContactFormSettingModal,
    IconSelectorModal,
    PageSettingModal,
    AltTextModal,
    AttachLinkModal,
    ImageSelectModal,
    BzTimePicker,
  },
  mixins: [builderMixin],
  computed: {
    openImageEditor() {
      return this.checkOpenModal("selectImage");
    },
    openAttachLink() {
      return this.checkOpenModal("attachLinkModal");
    },
    openAltText() {
      return this.checkOpenModal("altText");
    },
    openIconSelector() {
      return this.checkOpenModal("iconSelector");
    },
    openContactFormSetting() {
      return this.$store.state.modals.contactFormSetting.open;
    },
    openTimePicker() {
      return this.$store.state.modals.timePicker.open;
    },
    openEmbedLink() {
      return this.$store.state.modals.embedLink.open;
    },
    openManageMarkers() {
      return this.$store.state.modals.manageMarkers.open;
    },
    openPromotionModal() {
      return this.$store.state.modals.promotion.open;
    },
    openSubscribeModal() {
      return this.$store.state.modals.subscribe.open;
    },
    openVideoModal() {
      return this.$store.state.modals.youtubeVideo.open;
    },
    openNavigationBuilderModal() {
      return this.checkOpenModal("navigationBuilder");
    },
    showSettingPanel() {
      const activeSlider = this.$store.state.activeSlider;
      const openSlider = this.$store.state.openSlider;
      return !(openSlider && activeSlider === "theme");
    },
  },
  methods: {
    checkOpenModal(modalName) {
      return (
        this.$store.state.modals.openedModals.some(
          (item) => item.name === modalName
        ) || this.$store.state.modals.basic.name === modalName
      );
    },
  },
};
</script>
<style lang="scss">
.edit_page_container {
  position: relative;
  height: 100%;

  .content_body {
    width: 100%;

    .bz-page-content {
      position: absolute;
      margin-left: 70px;
      margin-right: 320px;
      background-color: rgb(217, 222, 227);
      min-height: calc(100vh - 60px);
      height: min-content;
      display: flex;
      justify-content: center;
      padding-bottom: 1000px;
      width: calc(100% - 390px);
    }
  }
}
.item-dropzone-area {
  height: 300px;
  background: transparent;
  opacity: 0.8;
  animation-duration: 0.5s;
  animation-name: nodeInserted;
}
</style>
