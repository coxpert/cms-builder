<template>
  <div class="bz-el--google-map-root" :style="mapStyle">
    <google-map
      ref="mapRef"
      :center="mapLocation"
      :zoom="zoom"
      :map-type-id="type"
      style="width: 100%; height: 100%"
      :style="mapStyle"
      :options="mapOptions"
    >
      <google-maker :position="mapLocation" />
    </google-map>
  </div>
</template>

<script>
import elementMixin from "../../mixins/elementMixin";

export default {
  name: "BzGoogleMap",
  mixins: [elementMixin],
  props: {
    options: {
      type: Object,
      default: () => {
        return {};
      },
    },
    height: {
      type: [String, Number],
      default: 500,
    },
    type: {
      type: String,
      default: "roadmap",
    },
    zoom: {
      type: Number,
      default: 15,
    },
    grayscale: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      defaultOptions: {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: true,
        fullscreenControl: false,
        disableDefaultUi: false,
      },
    };
  },
  computed: {
    mapOptions() {
      return { ...this.defaultOptions, ...this.options };
    },
    mapStyle() {
      let height = "500px";
      if (isNaN(this.height)) {
        height = this.height;
      } else {
        height = this.height + "px";
      }

      if (this.grayscale) {
        return {
          height,
          filter: "gray",
          WebkitFilter: "grayscale(99%)",
        };
      } else {
        return {
          height,
        };
      }
    },
    mapLocation() {
      let selectedBusiness;
      if (this.location) {
        selectedBusiness = this.templateSetting.businesses.find(
          (business) => business.companyName === this.location
        );
      } else {
        selectedBusiness = this.templateSetting.businesses[0];
      }

      if (typeof selectedBusiness === "undefined") {
        selectedBusiness = this.templateSetting.businesses[0];
      }
      if (selectedBusiness && selectedBusiness.location) {
        return selectedBusiness.location;
      }

      // return default location
      return {
        lat: 1.38,
        lng: 103.8,
      };
    },
  },
};
</script>
<style lang="scss">
.bz-el--google-map-root {
  width: 100%;
  min-height: 150px;
}
</style>
