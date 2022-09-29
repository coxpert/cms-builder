<template>
  <div
    class="bz-section-container bz-sec--subscribe-2-root"
    :class="{ [breakPoint]: true }"
    :data-section="section.sectionUUID"
  >
    <bz-background :size="sectionSize" :setting="background">
      <bz-container>
        <bz-card
          :shadow="setting.layouts.shadow"
          :backgroundColor="cardBackgroundColor"
          class="p-0"
        >
          <div
            class="bz-row"
            :class="{ 'bz-row-reverse': setting.alignment === 'right' }"
          >
            <div class="bz-col-md-5 py-0">
              <bz-image v-model="data.elements.image" resize-mode="full" />
            </div>
            <div
              class="bz-col-md-7 p-4 d-flex flex-column justify-content-center"
            >
              <bz-alignment
                :alignment="setting.layouts.alignment"
                :stretch="false"
              >
                <bz-title
                  v-model="data.elements.title"
                  v-if="setting.elements.title"
                  :text-color="theme.primaryColor"
                  size="32px"
                />

                <bz-text
                  v-model="data.elements.subtitle"
                  v-if="setting.elements.subtitle"
                />

                <bz-text
                  v-model="data.elements.description"
                  v-if="setting.elements.description"
                />
              </bz-alignment>

              <bz-setting @click="openSubscribeModal">
                <div class="bz-fl-email-address">
                  <input
                    class="bz-be-input"
                    placeholder="Enter your e-mail address"
                  />
                </div>
              </bz-setting>

              <bz-button
                v-model="data.elements.button"
                :link="false"
                class="my-3"
              />

              <bz-text
                class="text-left"
                :value="data.subscribe.permissionMessage"
              />
            </div>
          </div>
        </bz-card>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import sectionMixin from "../../mixins/sectionMixin";
import BzBackground from "../../components/section/BzBackground";
import BzContainer from "../../components/section/BzContainer";
import BzCard from "../../components/section/BzCard";
import BzAlignment from "../../components/section/BzAlignment";
import BzIcon from "../../components/section/BzIcon";
import BzTitle from "../../components/section/BzTitle";
import BzText from "../../components/section/BzText";
import BzSetting from "../../components/section/BzSetting";
import BzButton from "../../components/section/BzButton";
import BzImage from "../../components/section/BzImage";

export default {
  components: {
    BzImage,
    BzButton,
    BzSetting,
    BzText,
    BzTitle,
    BzIcon,
    BzAlignment,
    BzCard,
    BzContainer,
    BzBackground,
  },
  mixins: [sectionMixin],
  name: "Subscribe2",
  computed: {
    cardBackgroundColor() {
      return this.backgroundColor.brighten(5);
    },
  },
  methods: {
    openSubscribeModal() {
      this.$store.commit("openSubscribe", {
        value: this.data.subscribe,
        onChange: this.handleSubscribeChange,
      });
    },
    handleSubscribeChange(subscribe) {
      this.data.subscribe = subscribe;
    },
  },
};
</script>

<style lang="scss" scoped>
.bz-sec--subscribe-2-root {
  .bz-fe-button {
    margin: 20px 0;
  }

  .bz-fl-email-address {
    width: 100%;
    background-color: #efefef;
    padding: 10px;
    border-radius: 4px;

    input {
      width: 100%;
      border: none;
      outline: none;
      height: 36px;
      font-family: inherit;
    }
  }
}
</style>
