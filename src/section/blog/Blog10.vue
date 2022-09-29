<template>
  <div
    class="bz-section-container bz-sec--blog-10-root"
    :class="{ [breakPoint]: true }"
  >
    <bz-background :setting="background" :size="sectionSize">
      <bz-container>
        <template v-if="showBlogSection && mainBlog">
          <bz-aspect-view :ratio="1 / 2">
            <div
              class="blog-item"
              :style="{ backgroundImage: `url(${mainBlog.image.src})` }"
            >
              <div class="blog-content">
                <h3>{{ mainBlog.title }}</h3>
                <div v-html="mainBlog.description"></div>
                <bz-editor-link :href="mainBlog.url">
                  <div class="mt-3">
                    <bz-button v-model="data.elements.button" />
                  </div>
                </bz-editor-link>
              </div>
            </div>
          </bz-aspect-view>
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
import BzAspectView from "../../components/section/BzAspectView";
import BlogBase from "./BlogBase";
import BzButton from "../../components/section/BzButton";
import BzEditorLink from "../../components/section/BzEditorLink";

export default {
  name: "Blog10",
  components: {
    BzEditorLink,
    BzButton,
    BzAspectView,
    BzContainer,
    BzBackground,
  },
  extends: BlogBase,
  computed: {
    mainBlog() {
      return this.blogPosts[0];
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
      return "/" + blogPage.url;
    },
  },
};
</script>

<style lang="scss" scoped>
.bz-sec--blog-10-root {
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
