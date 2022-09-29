<script>
import sectionMixin from "../../mixins/sectionMixin";

export default {
  mixins: [sectionMixin],
  data() {
    return {
      aspectRatio: 1,
    };
  },
  computed: {
    showBlogSection() {
      if (!this.preview) {
        return this.$store.state.modules.blog.posts.length > 0;
      }
      return true;
    },
    blogPosts() {
      if (this.preview) {
        return this.data.items;
      }
      const blogModule = this.$store.state.modules.blog;
      if (this.$store.state.modules.blog) {
        let blogCount = parseInt(this.setting.blog.blogCount);
        let allPosts = blogModule.posts;

        if (this.setting.blog.category) {
          allPosts = allPosts.filter((item) => {
            return item.category_id === this.setting.blog.category;
          });
        }

        if (
          isNaN(blogCount) ||
          typeof blogCount !== "number" ||
          blogCount < 1
        ) {
          blogCount = 1;
        }
        const posts = [];
        for (let i = 0; i < blogCount; i++) {
          const blogItem = allPosts[i];
          if (blogItem) {
            let blogDescription = this.extractContent(blogItem.body);

            if (blogDescription.length > this.setting.blog.descriptionLength) {
              blogDescription =
                blogDescription.substring(
                  0,
                  this.setting.blog.descriptionLength
                ) + " ...";
            }

            posts.push({
              image: {
                src: blogItem.image,
              },
              visible_date: blogItem.visible_date,
              title: blogItem.title,
              description: blogDescription,
              slug: blogItem.slug,
              url:
                "/" +
                this.$store.state.modules.blog.page.url +
                "/detail/" +
                blogItem.slug,
            });
          } else {
            if (this.edit) {
              posts.push(null);
            }
          }
        }
        return posts;
      }
      return [];
    },
    postBlogUrl() {
      return this.template.webUrl + "/admin/blog/post/create";
    },
    imageStyle() {
      if (this.setting.layouts.aspectRatio === "circle") {
        return {
          borderRadius: "100000px",
        };
      }
      return {};
    },
  },
  watch: {
    setting: {
      deep: true,
      immediate: true,
      handler(value) {
        switch (value.layouts.aspectRatio) {
          case "landscape": {
            this.aspectRatio = 2 / 3;
            break;
          }
          case "portrait": {
            this.aspectRatio = 4 / 3;
            break;
          }
          case "square": {
            this.aspectRatio = 1;
            break;
          }
          default: {
            this.aspectRatio = 1;
          }
        }
      },
    },
  },
  methods: {
    addItem() {},
    extractContent(s) {
      const html = document.createElement("div");
      html.innerHTML = s;
      return html.textContent || html.innerText;
    },
  },
};
</script>
