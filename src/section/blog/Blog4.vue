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
        <div class="bz-row">
          <div class="bz-col-6">
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
          <div class="bz-col-6">
            <template v-if="showBlogSection">
              <div class="featured-blogs">
                <h2>Featured Blogs</h2>
                <bz-items
                  v-model="blogPosts"
                  :add-item="addItem"
                  add-item-title="Show more blogs"
                  :enable-sort="false"
                  :show-add-item="false"
                  :cols="1"
                  :shadow="false"
                  :spacing="false"
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
                      <div class="h-100 w-100 bg-secondary">
                        <bz-aspect-view :ratio="0.2">
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
          </div>
        </div>
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
import BzEditorLink from "../../components/section/BzEditorLink";

export default {
  name: "Blog4",
  components: {
    BzEditorLink,
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
};
</script>

<style lang="scss" scoped>
.bz-sec--blog-3-root {
  @import "blog";
  .featured-blogs {
    max-width: 500px;
    margin-left: auto;
    background-color: var(--bz-theme-background-gray);
    border-radius: 4px;
    padding: 20px;
  }
}
</style>
