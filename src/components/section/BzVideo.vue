<template>
  <div class="bz-el-video-root" :class="{ [breakPoint]: true }">
    <div v-if="edit" class="tool-bar" :class="{ editing: editing }">
      <div class="input-group mb-2">
        <input
          v-model="youtubeURL"
          type="text"
          class="form-control"
          placeholder="Youtube URL here"
        />
        <div class="input-group-postpend">
          <a
            v-tooltip="'Save video URL'"
            href="javascript:void(0)"
            type="button"
            class="btn btn-primary text-white rounded-0 text-decoration-none"
            @click.prevent="changeLink()"
          >
            Change Link
          </a>
        </div>
      </div>
    </div>
    <bz-setting style="height: calc(100% + 16px)" @click="openVideoModal">
      <youtube
        :video-id="videoId"
        width="100%"
        height="500px"
        :resize="true"
        :resize-delay="0"
        :player-vars="playerVars"
      />
    </bz-setting>
  </div>
</template>

<script>
import BzSetting from "./BzSetting";
import elementMixin from "../../mixins/elementMixin";
import { mapMutations } from "vuex";
import { cloneDeep } from "lodash";

export default {
  name: "BzVideo",
  components: { BzSetting },
  mixins: [elementMixin],
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          source: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
          setting: {
            autoPlay: false,
            loop: false,
            controls: true,
          },
        };
      },
    },
  },
  data() {
    return {
      editing: false,
      youtubeURL: "",
      breakPoint: "bz-xl",
    };
  },
  computed: {
    playerVars() {
      return {
        autoplay: this.autoPlay,
      };
    },
    videoId() {
      const url = new URL(this.value.source);
      return url.searchParams.get("v");
    },
  },
  methods: {
    openVideoModal() {
      this.openYoutubeVideo({
        onChange: (value) => {
          this.$emit("input", value);
        },
        value: cloneDeep(this.value),
      });
    },
    changeLink() {
      if (this.youtubeURL) {
        this.value.source = this.youtubeURL;
      }
    },
    ...mapMutations(["openYoutubeVideo"]),
  },
};
</script>

<style lang="scss">
.bz-el-video-root {
  height: 100%;
  iframe {
    width: 100%;
    height: 100%;
  }

  .tool-bar {
    position: absolute;
    top: calc(50% - 30px);
    left: calc(50% - 200px);
    width: 400px;
    height: 35px;
    border-radius: 2px;
    opacity: 0;
    z-index: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;

    button {
      background-color: transparent;
      border: none;
      outline: none;
      padding: 2px;
      margin: 0;
      border-radius: 2px;

      &:hover {
        background-color: #cfcfcf;
      }
    }
  }
  &:hover {
    .tool-bar {
      &:not(.editing) {
        opacity: 1;
        transition: 0.2s;
        z-index: 12;
      }
    }
  }
}
</style>
