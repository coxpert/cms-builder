<template>
  <div
    class="bz-section-container bz-sec--blog-2-root"
    :class="{ [breakPoint]: true }"
  >
    <bz-background
      :setting="background"
      :size="sectionSize"
      :bz-animation-class="setting.animationClass"
    >
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-title
            v-if="setting.elements.title"
            v-model="data.elements.title"
          />
          <bz-subtitle
            v-if="setting.elements.subtitle"
            v-model="data.elements.subtitle"
          />
          <bz-text
            v-if="setting.elements.description"
            v-model="data.elements.description"
          />
        </bz-alignment>
        <template v-if="showBlogSection">
          <bz-items
            v-model="blogPosts"
            :add-item="addItem"
            add-item-title="Show more blogs"
            :enable-sort="false"
            :show-add-item="false"
            :cols="setting.column"
            :shadow="setting.layouts.shadow"
          >
            <template #default="{ item }">
              <template v-if="item">
                <div class="bz-col-12">
                  <div class="bz-row">
                    <div v-if="setting.listElements.image" class="bz-col-4">
                      <bz-aspect-view :ratio="aspectRatio">
                        <img
                          class="w-100 blog-image"
                          :src="item.image.src"
                          alt="image"
                          :style="imageStyle"
                        />
                      </bz-aspect-view>
                    </div>
                    <div class="bz-col-8">
                      <div class="card-text-wrapper">
                        <bz-editor-link :href="item.url">
                          <h3 v-if="setting.listElements.title">
                            {{ item.title }}
                          </h3>
                        </bz-editor-link>
                        <div
                          v-if="setting.listElements.description"
                          v-html="item.description"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <bz-divider v-if="setting.listElements.lines" :line="true" />
              </template>
              <template v-else>
                <div class="h-100 w-100 blog-empty">
                  <bz-aspect-view :ratio="0.3">
                    <div class="d-flex flex-column">
                      <a :href="postBlogUrl" class="btn btn-info text-white"
                        >Add Post</a
                      >
                    </div>
                  </bz-aspect-view>
                </div>
              </template>
            </template>
          </bz-items>
        </template>
        <template v-else>
          <div
            v-if="edit"
            class="mt-4 d-flex flex-column align-items-center py-5 bg-secondary"
          >
            <p class="text-white">
              You must add blogs to blog module to view blogs
            </p>
            <a :href="postBlogUrl" class="btn btn-primary text-white mt-5"
              >Post blogs</a
            >
          </div>
        </template>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import sectionMixin from "../../mixins/sectionMixin";
import BzBackground from "../../components/section/BzBackground";
import BzTitle from "../../components/section/BzTitle";
import BzContainer from "../../components/section/BzContainer";
import BlogBase from "./BlogBase";
import BzAspectView from "../../components/section/BzAspectView";
import BzItems from "../../components/section/BzItems";
import BzText from "../../components/section/BzText";
import BzSubtitle from "../../components/section/BzSubtitle";
import BzAlignment from "../../components/section/BzAlignment";
import BzDivider from "../../components/section/BzDivider";
import BzEditorLink from "../../components/section/BzEditorLink";

export default {
  name: "Blog2",
  components: {
    BzEditorLink,
    BzDivider,
    BzAspectView,
    BzItems,
    BzText,
    BzSubtitle,
    BzTitle,
    BzAlignment,
    BzContainer,
    BzBackground,
  },
  extends: BlogBase,
  mixins: [sectionMixin],
};
</script>

<style lang="scss" scoped>
.bz-sec--blog-2-root {
  @import "blog";
}
</style>
