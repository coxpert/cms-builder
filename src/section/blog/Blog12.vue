<template>
  <div
    class="bz-section-container bz-sec--blog-12-root"
    :class="{ [breakPoint]: true }"
  >
    <bz-background
      :setting="background"
      :size="sectionSize"
      :bz-animation-class="setting.animationClass"
    >
      <bz-container>
        <template v-if="showBlogSection">
          <div class="bz-col-12">
            <div class="bz-row">
              <div class="bz-col-8">
                <div v-if="mainBlog" class="main-blog-item">
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
                    </div>
                    <div class="bz-col-6">
                      <div class="card-text-wrapper">
                        <div class="mb-2">{{ mainBlog.visible_date }}</div>
                        <h3>{{ mainBlog.title }}</h3>
                        <div v-html="mainBlog.description"></div>
                        <bz-editor-link :href="mainBlog.url">
                          <div class="mt-3">
                            <bz-button v-model="data.elements.button" />
                          </div>
                        </bz-editor-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bz-col-4">
                <h3>More Featured</h3>
                <bz-divider :line="true" />
                <bz-items
                  v-model="featuredBlogs"
                  :add-item="addItem"
                  :enable-sort="false"
                  :show-add-item="false"
                  :cols="1"
                  :shadow="false"
                  :spacing="true"
                >
                  <template v-slot="{ item }">
                    <template v-if="item">
                      <div class="card-text-wrapper mb-2">
                        <bz-editor-link :href="item.url">
                          <h3>{{ item.title }}</h3>
                        </bz-editor-link>
                        <div v-html="item.description"></div>
                      </div>
                    </template>
                    <template v-else>
                      <div class="h-100 w-100 blog-empty mb-2">
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
import BzDivider from "../../components/section/BzDivider";
import BzButton from "../../components/section/BzButton";
import BzEditorLink from "../../components/section/BzEditorLink";

export default {
  name: "Blog12",
  components: {
    BzEditorLink,
    BzButton,
    BzDivider,
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
    mainBlogLink() {
      if (this.edit) {
        return "javascript:void(0)";
      }
      const blogModule = this.$store.state.modules.blog;
      if (!blogModule) {
        console.error("blog module does not exist");
        return "/";
      }

      const blogPage = blogModule.page;
      if (!blogPage) {
        console.error("blog page does not exist");
        return "/";
      }
      return "/" + blogPage.url + "/detail/" + this.mainBlog.slug;
    },
  },
};
</script>

<style lang="scss" scoped>
.bz-sec--blog-12-root {
  @import "blog";

  .main-blog-item {
    background-color: var(--bz-theme-background-gray);
  }
}
</style>
