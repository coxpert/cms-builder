<template>
  <modal
    :classes="['page-setting-modal']"
    name="page-setting-modal"
    @closed="onClose()"
  >
    <div style="background-color: rgb(246, 246, 246)" class="p-3">
      <h5 class="m-0 p-0">{{ activePage.name }}</h5>
    </div>
    <div>
      <bz-tabs>
        <bz-tab label="Properties">
          <bz-input
            v-model="pageName"
            label="Page Name"
            :height="40"
            :required="true"
            :invalid="!pageName"
          />
          <bz-input
            v-show="activePage.url"
            v-model="page_url"
            label="Page Url"
            :height="40"
            class="mt-4"
            prefix="/"
          />
          <small
            v-show="!uniqueUrl"
            style="text-transform: lowercase; color: #ff1744"
            >This url is already used</small
          >
        </bz-tab>
        <bz-tab label="Seo">
          <div class="seo-container">
            <p>
              Improve the way this page shows up in search results by setting a
              good title and description.
            </p>
            <bz-input v-model="seoTitle" label="Title" :height="40" />
            <bz-input
              v-model="seoTags"
              label="Tags"
              :height="40"
              class="mt-3"
            />
            <bz-input
              v-model="seoDescription"
              label="Description"
              :multiple="true"
              class="mt-3"
              :rows="3"
            />
            <image-selector v-model="seoImage" />
          </div>
        </bz-tab>
      </bz-tabs>
    </div>
    <hr style="margin-top: auto" />
    <div class="w-100 d-flex justify-content-end pb-2">
      <button class="btn bz-btn-default-outline mr-3" @click="onClose()">
        <b>Cancel</b>
      </button>
      <button
        class="btn bz-btn-default mr-4 d-flex align-items-center"
        @click="onConfirm()"
      >
        <b>Apply</b>
      </button>
    </div>
  </modal>
</template>

<script>
import BzTabs from "../elements/Tabs";
import BzTab from "../elements/Tab";
import BzInput from "../page/BzInput";
import { cloneDeep } from "lodash";
import ImageSelector from "../elements/ImageSelector";
import builderMixin from "../../mixins/builderMixin";

export default {
  components: { ImageSelector, BzInput, BzTab, BzTabs },
  mixins: [builderMixin],
  data() {
    return {
      pageName: "",
      page_url: "",
      seoTitle: "",
      seoTags: "",
      seoDescription: "",
      seoImage: "",
    };
  },
  computed: {
    uniqueUrl() {
      if (!this.activePage.url) return true;
      if (
        this.page_url &&
        this.allPages.map(({ url }) => url).includes(this.page_url) &&
        this.page_url !== this.activePage.url
      )
        return false;
      return !!this.page_url;
    },
  },
  mounted() {
    this.$modal.show("page-setting-modal");
    this.pageName = this.activePage.name;
    this.page_url = this.activePage.url;
    if (this.activePage.data?.seo) {
      this.seoTitle = this.activePage.data.seo.title;
      this.seoTags = this.activePage.data.seo.tags;
      this.seoDescription = this.activePage.data.seo.description;
      this.seoImage = this.activePage.data.seo.image;
    }
  },
  methods: {
    onClose() {
      this.openPageSettingModal = false;
    },
    onConfirm() {
      if (!this.uniqueUrl) return;
      this.activePage.name = this.pageName;
      this.activePage.url = this.page_url;
      if (!this.activePage.data) {
        this.activePage.data = {};
      }
      this.activePage.data.seo = {
        title: this.seoTitle,
        keywords: this.seoTags,
        description: this.seoDescription,
        image: this.seoImage,
      };
      this.allPages = cloneDeep(this.allPages);
      this.onClose();
    },
  },
};
</script>
<style lang="scss">
@import "style";
.page-setting-modal {
  display: flex;
  flex-direction: column;
  height: auto !important;
  top: 100px !important;

  .md-tabs {
    .md-button-content {
      text-transform: capitalize;
    }
    .md-tabs-navigation.md-elevation-0 {
      background-color: rgb(246, 246, 246) !important;
      padding: 0 20px;
    }
  }

  .md-field .md-input,
  .md-field .md-textarea {
    height: 32px;
    padding: 0;
    display: block;
    flex: 1;
    border: none;
    background: none;
    transition: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    transition-property: font-size, padding-top, color;
    font-family: inherit;
    font-size: 16px;
    line-height: 32px;
  }

  .seo-container {
    max-height: 60vh;
    overflow-y: auto;
  }
}
</style>
