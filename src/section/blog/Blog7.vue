<template>
  <div
    class="bz-section-container bz-sec--blog-7-root"
    :class="{ [breakPoint]: true }"
  >
    <bz-background
      :setting="background"
      :size="sectionSize"
      :bz-animation-class="setting.animationClass"
    >
      <bz-container>
        <div class="bz-col-12">
          <bz-text-element
            v-model="data.elements"
            :alignment="setting.elements.alignment"
          />
        </div>
        <template v-if="showBlogSection">
          <div class="bz-col-12">
            <div class="bz-row">
              <div class="bz-col-6">
                <bz-aspect-view :ratio="aspectRatio">
                  <img
                    class="w-100 blog-image"
                    :src="mainBlog.image.src"
                    alt="image"
                    :style="imageStyle"
                  />
                </bz-aspect-view>
                <div class="card-text-wrapper">
                  <bz-editor-link :href="mainBlog.url">
                    <h3 v-if="setting.listElements.title">
                      {{ mainBlog.title }}
                    </h3>
                  </bz-editor-link>
                  <div
                    v-if="setting.listElements.description"
                    v-html="mainBlog.description"
                  ></div>
                </div>
              </div>
              <div class="bz-col-6">
                <bz-items
                  v-model="featuredBlogs"
                  :add-item="addItem"
                  add-item-title="Show more blogs"
                  :enable-sort="false"
                  :show-add-item="false"
                  :cols="2"
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
import BzItems from "../../components/section/BzItems";
import BzAspectView from "../../components/section/BzAspectView";
import BlogBase from "./BlogBase";
import BzTextElement from "../../components/section/BzTextElement";
import BzEditorLink from "../../components/section/BzEditorLink";

export default {
  name: "Blog7",
  components: {
    BzEditorLink,
    BzTextElement,
    BzAspectView,
    BzItems,
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
.bz-sec--blog-7-root {
  @import "blog";
}
</style>
