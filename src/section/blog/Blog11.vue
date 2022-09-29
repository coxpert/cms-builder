<template>
  <div
    class="bz-section-container bz-sec--blog-11-root"
    :class="{ [breakPoint]: true }"
  >
    <bz-background :setting="background" :size="sectionSize">
      <bz-container>
        <template v-if="showBlogSection && mainBlog">
          <div class="w-100">
            <bz-aspect-view :ratio="1 / 2">
              <div
                class="blog-item"
                :style="{ backgroundImage: `url(${mainBlog.image.src})` }"
              >
                <div class="blog-content">
                  <bz-editor-link :href="mainBlog.url">
                    <h3>{{ mainBlog.title }}</h3>
                  </bz-editor-link>
                  <div v-html="mainBlog.description"></div>
                </div>
              </div>
            </bz-aspect-view>
            <bz-items
              v-model="featuredBlogs"
              :add-item="addItem"
              add-item-title="Show more blogs"
              :enable-sort="false"
              :show-add-item="false"
              :cols="3"
              :shadow="false"
              :spacing="true"
            >
              <template v-slot="{ item }">
                <template v-if="item">
                  <div class="w-100">
                    <bz-aspect-view :ratio="aspectRatio">
                      <img
                        class="w-100 blog-image"
                        :src="item.image.src"
                        alt="image"
                        :style="imageStyle"
                      />
                    </bz-aspect-view>
                    <div class="card-text-wrapper">
                      <bz-editor-link :href="item.url">
                        <h3>{{ item.title }}</h3>
                      </bz-editor-link>
                      <div v-html="item.description"></div>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="h-100 w-100 mb-2">
                    <div class="col-12 blog-empty">
                      <bz-aspect-view :ratio="0.25">
                        <div class="d-flex flex-column">
                          <a :href="postBlogUrl" class="btn btn-info text-white"
                            >Add Post</a
                          >
                        </div>
                      </bz-aspect-view>
                    </div>
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
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import BlogBase from "./BlogBase";
import BzBackground from "../../components/section/BzBackground";
import BzContainer from "../../components/section/BzContainer";
import BzAspectView from "../../components/section/BzAspectView";
import BzItems from "../../components/section/BzItems";
import BzEditorLink from "../../components/section/BzEditorLink";

export default {
  name: "Blog11",
  components: {
    BzEditorLink,
    BzItems,
    BzAspectView,
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
.bz-sec--blog-11-root {
  @import "blog";
  .blog-item {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .blog-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffffdf;
    padding: 20px;
    border-radius: 2px;
    * {
      color: black;
    }
  }
}
</style>
