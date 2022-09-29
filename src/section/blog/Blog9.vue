<template>
  <div
    class="bz-section-container bz-sec--blog-9-root"
    :class="{ [breakPoint]: true }"
  >
    <bz-background
      :setting="background"
      :size="sectionSize"
      :bz-animation-class="setting.animationClass"
    >
      <bz-container>
        <template v-if="showBlogSection">
          <carousel
            ref="carousel"
            :start-index="0"
            :animation-speed="600"
            :controls-visible="true"
            :display="setting.blog.display"
            :perspective="1"
            :disable3d="true"
            :space="365"
            :height="slideHeight"
          >
            <slide
              v-for="(postItem, index) of blogPosts"
              :key="index"
              :index="index"
            >
              <div
                v-if="postItem"
                ref="blogPostItem"
                class="blog-post-item"
                style="pointer-events: none"
              >
                <bz-aspect-view :ratio="aspectRatio">
                  <img
                    class="w-100 blog-image"
                    :src="postItem.image.src"
                    alt="image"
                    :style="imageStyle"
                  />
                </bz-aspect-view>
                <div class="card-text-wrapper">
                  <bz-editor-link :href="postItem.url">
                    <h3 v-if="setting.listElements.title">
                      {{ postItem.title }}
                    </h3>
                  </bz-editor-link>
                  <div
                    v-if="setting.listElements.description"
                    v-html="postItem.description"
                  ></div>
                </div>
              </div>
              <div v-else class="w-100" :style="{ height: slideHeight + 'px' }">
                <div class="col-12 h-100 blog-empty d-flex align-items-center">
                  <div class="m-auto">
                    <a :href="postBlogUrl" class="btn btn-info text-white"
                      >Add Post</a
                    >
                  </div>
                </div>
              </div>
            </slide>
          </carousel>
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
import { Carousel3d as Carousel, Slide } from "vue-carousel-3d";
import BzBackground from "../../components/section/BzBackground";
import BzContainer from "../../components/section/BzContainer";
import BlogBase from "./BlogBase";
import BzAspectView from "../../components/section/BzAspectView";
import BzEditorLink from "../../components/section/BzEditorLink";

export default {
  name: "Blog9",
  components: {
    BzEditorLink,
    BzAspectView,
    Carousel,
    Slide,
    BzContainer,
    BzBackground,
  },
  extends: BlogBase,
  data() {
    return {
      slideHeight: 400,
    };
  },
  mounted() {
    const self = this;
    this.$nextTick(() => {
      if (this.$refs.blogPostItem) {
        this.$refs.blogPostItem.forEach((item) => {
          new ResizeObserver(function (entries) {
            const rect = entries[0].contentRect;
            const height = rect.height;
            if (height > self.slideHeight) {
              self.slideHeight = height;
            }
          }).observe(item);
        });
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.bz-sec--blog-9-root {
  @import "blog";
  .blog-post-item {
    background-color: var(--bz-theme-background-gray);
  }
}
</style>
