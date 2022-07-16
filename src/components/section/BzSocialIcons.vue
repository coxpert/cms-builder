<template>
  <div class="bz-el-social-icons-root">
    <bz-setting :on-click="openSocialLinksForm" :wrap-content="wrapContent" class="d-flex">
      <div class="d-flex align-self-center">
        <a class="social-item" :style="socialItemStyle" :href="templateSetting.socialAccounts.pinterest" v-if="templateSetting.socialAccounts.pinterest" target="_blank">
          <i class="text-white fa fa-pinterest fa-2x" :style="iconStyle"></i>
        </a>

        <a class="social-item" :style="socialItemStyle" :href="templateSetting.socialAccounts.youtube" v-if="templateSetting.socialAccounts.youtube" target="_blank">
          <i class="text-white fa fa-youtube-play" :style="iconStyle"></i>
        </a>

        <a class="social-item" :style="socialItemStyle" :href="templateSetting.socialAccounts.openTable" v-if="templateSetting.socialAccounts.openTable" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 535 512" fill="#FFFFFF" :width="size / 2" height="18px">
            <circle cx="48.64" cy="256" r="48.64"></circle>
            <path
              d="M340.45,61.45C233,61.45,145.91,148.55,145.91,256S233,450.55,340.45,450.55,535,363.44,535,256,447.9,61.45,340.45,61.45Zm0,243.19A48.64,48.64,0,1,1,389.09,256,48.64,48.64,0,0,1,340.45,304.64Z"
            ></path>
          </svg>
        </a>

        <a class="social-item" :style="socialItemStyle" :href="templateSetting.socialAccounts.linkedin" v-if="templateSetting.socialAccounts.linkedin" target="_blank">
          <i class="text-white fa fa fa-linkedin-square" :style="iconStyle"></i>
        </a>

        <a
          v-if="templateSetting.socialAccounts.instagram || placeholder"
          class="social-item"
          :style="socialItemStyle"
          :href="templateSetting.socialAccounts.instagram"
          target="_blank"
        >
          <i class="text-white fa fa-instagram" :style="iconStyle"></i>
        </a>

        <a v-if="templateSetting.socialAccounts.twitter || placeholder" class="social-item" :style="socialItemStyle" :href="templateSetting.socialAccounts.twitter" target="_blank">
          <i class="text-white fa fa fa-twitter" :style="iconStyle"></i>
        </a>

        <a
          v-if="templateSetting.socialAccounts.facebook || placeholder"
          class="social-item"
          :style="socialItemStyle"
          :href="templateSetting.socialAccounts.facebook"
          target="_blank"
        >
          <i class="text-white fa fa-facebook-official" :style="iconStyle"></i>
        </a>
      </div>
    </bz-setting>
  </div>
</template>

<script>
import BzSetting from './BzSetting'
import sectionMixin from '../../mixins/sectionMixin'

export default {
  name: 'BzSocialIcons',
  components: { BzSetting },
  mixins: [sectionMixin],
  props: {
    wrapContent: {
      type: Boolean,
      default: true
    },
    size: {
      type: Number,
      default: 36
    }
  },
  computed: {
    socialItemStyle() {
      return {
        width: this.size + 'px',
        height: this.size + 'px'
      }
    },
    iconStyle() {
      return {
        fontSize: this.size / 2 + 'px'
      }
    },
    placeholder() {
      for (const key in this.templateSetting.socialAccounts) {
        if ((this.templateSetting.socialAccounts[key] || '').isURL()) {
          return false
        }
      }

      return this.edit
    }
  },
  methods: {
    openSocialLinksForm() {
      this.openSettingSlider(2)
    }
  }
}
</script>

<style lang="scss" scoped>
.bz-el-social-icons-root {
  .social-item {
    background-color: var(--bz-primary-color);
    border-radius: 1000px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
    margin-right: 5px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
