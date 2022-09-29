<template>
  <div class="bz-el-social-icons-root">
    <bz-setting
      :wrap-content="wrapContent"
      class="d-flex"
      @click="openSocialLinksForm"
    >
      <div class="d-flex align-self-center">
        <a
          v-if="templateSetting.socialAccounts.pinterest.show"
          class="social-item"
          :style="socialItemStyle"
          :href="templateSetting.socialAccounts.pinterest.url"
          target="_blank"
        >
          <i class="fa fa-pinterest fa-2x" :style="iconStyle"></i>
        </a>

        <a
          v-if="templateSetting.socialAccounts.youtube.show"
          class="social-item"
          :style="socialItemStyle"
          :href="templateSetting.socialAccounts.youtube.url"
          target="_blank"
        >
          <i class="fa fa-youtube-play" :style="iconStyle"></i>
        </a>

        <a
          v-if="templateSetting.socialAccounts.openTable.show"
          class="social-item"
          :style="socialItemStyle"
          :href="templateSetting.socialAccounts.openTable.url"
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 535 512"
            fill="#FFFFFF"
            :width="size / 2"
            height="18px"
          >
            <circle cx="48.64" cy="256" r="48.64"></circle>
            <path
              d="M340.45,61.45C233,61.45,145.91,148.55,145.91,256S233,450.55,340.45,450.55,535,363.44,535,256,447.9,61.45,340.45,61.45Zm0,243.19A48.64,48.64,0,1,1,389.09,256,48.64,48.64,0,0,1,340.45,304.64Z"
            ></path>
          </svg>
        </a>

        <a
          v-if="templateSetting.socialAccounts.linkedin.show"
          class="social-item"
          :style="socialItemStyle"
          :href="templateSetting.socialAccounts.linkedin.url"
          target="_blank"
        >
          <i class="fa fa fa-linkedin-square" :style="iconStyle"></i>
        </a>

        <a
          v-if="templateSetting.socialAccounts.instagram.show"
          class="social-item"
          :style="socialItemStyle"
          :href="templateSetting.socialAccounts.instagram.url"
          target="_blank"
        >
          <i class="fa fa-instagram" :style="iconStyle"></i>
        </a>

        <a
          v-if="templateSetting.socialAccounts.twitter.show"
          class="social-item"
          :style="socialItemStyle"
          :href="templateSetting.socialAccounts.twitter.url"
          target="_blank"
        >
          <i class="fa fa fa-twitter" :style="iconStyle"></i>
        </a>

        <a
          v-if="templateSetting.socialAccounts.facebook.show"
          class="social-item"
          :style="socialItemStyle"
          :href="templateSetting.socialAccounts.facebook.url"
          target="_blank"
        >
          <i class="fa fa-facebook-official" :style="iconStyle"></i>
        </a>
      </div>
    </bz-setting>
  </div>
</template>

<script>
import BzSetting from "./BzSetting";
import elementMixin from "../../mixins/elementMixin";

export default {
  name: "BzSocialIcons",
  components: { BzSetting },
  mixins: [elementMixin],
  props: {
    wrapContent: {
      type: Boolean,
      default: true,
    },
    size: {
      type: Number,
      default: 36,
    },
    gap: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    backgroundColor() {
      if (this.theme.isAdvanced) {
        return this.theme[this.themeMode].socialIconColor;
      }
      return this.theme[this.themeMode].primaryColor;
    },
    socialItemStyle() {
      return {
        width: this.size + "px",
        height: this.size + "px",
        marginRight: this.gap + "px",
        backgroundColor: this.backgroundColor,
        color: this.getColor(),
      };
    },
    iconStyle() {
      return {
        fontSize: this.size / 2 + "px",
      };
    },
  },
  methods: {
    openSocialLinksForm() {
      this.openSettingSlider(2);
    },
  },
};
</script>

<style lang="scss" scoped>
.bz-el-social-icons-root {
  width: max-content;

  .social-item {
    border-radius: 1000px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
