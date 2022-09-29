<template>
  <div
    class="bz-section-container bz-sec--blog-3-root"
    :class="{ [breakPoint]: true }"
  >
    <bz-background
      :setting="background"
      :size="sectionSize"
      :bz-animation-class="setting.animationClass"
    >
      <bz-container>
        <div class="bz-col-12">
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
        </div>
        <template v-if="showBlogSection">
          <div class="bz-col-12">
            <div class="bz-row">
              <div v-if="mainBlog" class="bz-col-6">
                <bz-aspect-view :ratio="aspectRatio">
                  <img
                    class="w-100 blog-image"
                    :src="mainBlog.image.src"
                    alt="image"
                    :style="imageStyle"
                  />
                </bz-aspect-view>
                <div class="card-text-wrapper">
                  <h3 v-if="setting.listElements.title">
                    {{ mainBlog.title }}
                  </h3>
                  <div
                    v-if="setting.listElements.description"
                    v-html="mainBlog.description"
                  ></div>
                </div>
              </div>
              <div class="bz-col-6">
                <h3>More Featured</h3>
                <bz-divider :line="true" />
                <bz-items
                  v-model="featuredBlogs"
                  :add-item="addItem"
                  add-item-title="Show more blogs"
                  :enable-sort="false"
                  :show-add-item="false"
                  :cols="1"
                  :shadow="false"
                  :spacing="true"
                >
                  <template #default="{ item }">
                    <template v-if="item">
                      <div class="card-text-wrapper">
                        <bz-editor-link :href="item.url">
                          <h3>{{ item.title }}</h3>
                        </bz-editor-link>
                        <div v-html="item.description"></div>
                      </div>
                    </template>
                    <template v-else>
                      <div class="h-100 w-100 blog-empty">
                        <bz-aspect-view :ratio="0.25">
                          <div class="d-flex flex-column">
                            <a
                              :href="postBlogUrl"
                              class="btn btn-info text-white"
                              >Add Post</a
                            >
                          </div>
                        </bz-aspect-view>
                      </div>
                    </template>
                  </template>
                </bz-items>
              </div>
            </div>
          </div>
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
import BzBackground from "../../components/section/BzBackground";
import BzContainer from "../../components/section/BzContainer";
import BzAlignment from "../../components/section/BzAlignment";
import BzTitle from "../../components/section/BzTitle";
import BzSubtitle from "../../components/section/BzSubtitle";
import BzText from "../../components/section/BzText";
import BzItems from "../../components/section/BzItems";
import BzAspectView from "../../components/section/BzAspectView";
import BlogBase from "./BlogBase";
import BzDivider from "../../components/section/BzDivider";
import BzEditorLink from "../../components/section/BzEditorLink";

export default {
  name: "Blog3",
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
  computed: {
    mainBlog() {
      return this.blogPosts[0];
    },
    featuredBlogs() {
      return this.blogPosts.slice(1);
    },
  },
};
</script>

<style lang="scss" scoped>
.bz-sec--blog-3-root {
  @import "blog";
}
</style>
