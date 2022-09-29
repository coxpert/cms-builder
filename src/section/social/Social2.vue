<template>
  <div
    class="bz-section-container bz-sec--social-2-root"
    :class="{ [breakPoint]: true }"
    :data-section="section.sectionUUID"
  >
    <bz-background
      :setting="background"
      :size="sectionSize"
      :bz-animation-class="setting.animationClass"
    >
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-title
            v-if="setting.elements.title"
            v-model="data.elements.title"
            :text-color="theme.primaryColor"
          />

          <bz-text
            v-if="setting.elements.subtitle"
            v-model="data.elements.subtitle"
          />

          <bz-text
            v-if="setting.elements.description"
            v-model="data.elements.description"
          />
        </bz-alignment>

        <bz-setting @click="openSocialLinksForm" class="mt-5">
          <div class="bz-row">
            <div
              v-if="templateSetting.socialAccounts.pinterest.show"
              class="bz-col-lg-2 bz-col-md-3 bz-col-sm-4 bz-col-6"
            >
              <a
                :href="templateSetting.socialAccounts.pinterest.url"
                class="w-100 social-link"
                target="_blank"
              >
                <div class="social-item" :style="itemStyle">
                  <i class="bz-text-primary fa fa-pinterest"></i>
                </div>
                <bz-text value="Pinterest" :text-color="theme.primaryColor" />
              </a>
            </div>

            <div
              v-if="templateSetting.socialAccounts.youtube.show"
              class="bz-col-lg-2 bz-col-md-3 bz-col-sm-4 bz-col-6"
            >
              <a
                :href="templateSetting.socialAccounts.youtube.url"
                class="w-100 social-link"
                target="_blank"
              >
                <div class="social-item" :style="itemStyle">
                  <i class="bz-text-primary fa fa-youtube-play"></i>
                </div>
                <bz-text value="Youtube" :text-color="theme.primaryColor" />
              </a>
            </div>

            <div
              v-if="templateSetting.socialAccounts.openTable.show"
              class="bz-col-lg-2 bz-col-md-3 bz-col-sm-4 bz-col-6"
            >
              <a
                :href="templateSetting.socialAccounts.openTable.url"
                class="w-100 social-link"
                target="_blank"
              >
                <div class="social-item" :style="itemStyle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 535 512"
                    :fill="theme.primaryColor"
                    width="32px"
                    height="32px"
                  >
                    <circle cx="48.64" cy="256" r="48.64"></circle>
                    <path
                      d="M340.45,61.45C233,61.45,145.91,148.55,145.91,256S233,450.55,340.45,450.55,535,363.44,535,256,447.9,61.45,340.45,61.45Zm0,243.19A48.64,48.64,0,1,1,389.09,256,48.64,48.64,0,0,1,340.45,304.64Z"
                    ></path>
                  </svg>
                </div>
                <bz-text value="Open Table" :text-color="theme.primaryColor" />
              </a>
            </div>

            <div
              v-if="templateSetting.socialAccounts.linkedin.show"
              class="bz-col-lg-2 bz-col-md-3 bz-col-sm-4 bz-col-6"
            >
              <a
                :href="templateSetting.socialAccounts.linkedin.url"
                class="w-100 social-link"
                target="_blank"
              >
                <div class="social-item" :style="itemStyle">
                  <i class="bz-text-primary fa fa fa-linkedin-square"></i>
                </div>
                <bz-text value="Linkedin" :text-color="theme.primaryColor" />
              </a>
            </div>

            <div
              v-if="templateSetting.socialAccounts.instagram.show"
              class="bz-col-lg-2 bz-col-md-3 bz-col-sm-4 bz-col-6"
            >
              <a
                :href="templateSetting.socialAccounts.instagram.url"
                class="w-100 social-link"
                target="_blank"
              >
                <div class="social-item" :style="itemStyle">
                  <i class="bz-text-primary fa fa-instagram"></i>
                </div>
                <bz-text value="Instagram" :text-color="theme.primaryColor" />
              </a>
            </div>

            <div
              v-if="templateSetting.socialAccounts.twitter.show"
              class="bz-col-lg-2 bz-col-md-3 bz-col-sm-4 bz-col-6"
            >
              <a
                :href="templateSetting.socialAccounts.twitter.url"
                class="w-100 social-link"
                target="_blank"
              >
                <div class="social-item" :style="itemStyle">
                  <i class="bz-text-primary fa fa fa-twitter"></i>
                </div>
                <bz-text value="Twitter" :text-color="theme.primaryColor" />
              </a>
            </div>

            <div
              v-if="templateSetting.socialAccounts.facebook.show"
              class="bz-col-lg-2 bz-col-md-3 bz-col-sm-4 bz-col-6"
            >
              <a
                :href="templateSetting.socialAccounts.facebook.url"
                class="w-100 social-link"
                target="_blank"
              >
                <div class="social-item" :style="itemStyle">
                  <i class="bz-text-primary fa fa-facebook-official"></i>
                </div>
                <bz-text value="Facebook" :text-color="theme.primaryColor" />
              </a>
            </div>
          </div>
        </bz-setting>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import sectionMixin from "../../mixins/sectionMixin";
import BzBackground from "../../components/section/BzBackground";
import BzContainer from "../../components/section/BzContainer";
import BzAlignment from "../../components/section/BzAlignment";
import BzTitle from "../../components/section/BzTitle";
import BzText from "../../components/section/BzText";
import BzSetting from "../../components/section/BzSetting";

export default {
  name: "Social2",
  components: {
    BzSetting,
    BzText,
    BzTitle,
    BzAlignment,
    BzContainer,
    BzBackground,
  },
  mixins: [sectionMixin],
  computed: {
    itemStyle() {
      if (this.setting.layouts.shape === "circle") {
        return { borderRadius: "1000px" };
      }
      return {};
    },
  },
  methods: {
    openSocialLinksForm() {
      this.openSettingSlider(2);
    },
  },
};
</script>

<style lang="scss">
.bz-sec--social-2-root {
  .social-link {
    display: flex;
    align-items: center;
  }

  .social-item {
    border-style: solid;
    border-width: 2px;
    border-color: var(--bz-primary-color);
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    margin-right: 10px;
  }
}
</style>
