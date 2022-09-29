<template>
  <modal
    :classes="['select-image']"
    width="90%"
    name="selectImage"
    @closed="onClose"
  >
    <div class="bz-modal">
      <div class="bz-modal-header">
        <div
          v-if="backPage != null"
          class="back-icon cursor-pointer"
          @click="handleBack()"
        >
          <BackIcon />
        </div>
        <div class="close-icon cursor-pointer">
          <button
            v-if="deleteItems.length > 0"
            class="delete-button mr-2"
            @click="toggleDeleteConfirmModal()"
          >
            <DeleteIcon />
            <b class="ml-2">Delete ({{ deleteItems.length }})</b>
          </button>
          <button
            v-if="currentPage === 'edit'"
            class="btn bz-btn-default-outline mr-2"
            @click="downloadCroppedImage()"
          >
            <b>Download</b>
          </button>
          <button
            v-if="currentPage === 'edit'"
            class="btn bz-btn-default d-flex align-items-center mr-2"
            @click="saveCroppedImage()"
          >
            <md-progress-spinner
              v-if="loading"
              :md-diameter="16"
              :md-stroke="2"
              md-mode="indeterminate"
              class="text-white mr-2"
            />
            <b>Save and use</b>
          </button>
          <CloseIcon @click="onClose()" />
        </div>
      </div>
      <div v-if="currentPage === 'unsplash'" class="bz-modal-body">
        <div class="bz-modal-section-1">
          <h2 class="bz-text-black bz-fw-700">Image library unsplash</h2>
          <div class="pull-right d-flex">
            <button
              class="btn bz-btn-default mr-4"
              data-current-page="upload"
              data-back-page="unsplash"
              @click="handlePageSwitch"
            >
              <UploadIcon /> Upload image
            </button>
            <div class="input-group" style="width: 350px">
              <input
                v-model="unsplashSearch"
                type="text"
                class="form-control"
                name="search"
                placeholder="Search images in unsplash"
              />
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button">
                  <SearchIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="bz-modal-section-2 d-flex flex-column position-relative">
          <template v-if="unsplashImages.length === 0 && !loadingUnsplash">
            <div v-if="unsplashSearch" class="d-flex justify-content-center">
              <h1 class="text-body text-black-50">No match images</h1>
            </div>
            <template v-else>
              <md-progress-spinner v-if="loading" md-mode="indeterminate" />
              <VueJustifiedLayout
                v-else
                v-slot="{ item }"
                :items="myImages"
                :options="galleryOption"
              >
                <div
                  v-if="item"
                  class="position-relative my-image-container"
                  :class="{ delete: deleteItems.includes(item.id) }"
                >
                  <div class="img-over-layer" @click="updateImage(item)">
                    <div class="control">
                      <!--                  <button @click.stop="photoEdit(item)"><CropRotateIcon :fill-color="'#0076df'" /></button>-->
                      <button
                        :class="{ active: deleteItems.includes(item.id) }"
                        @click.stop="deleteItems.toggle(item.id)"
                      >
                        <DeleteIcon :fill-color="'#0076df'" />
                      </button>
                    </div>
                  </div>
                  <img :src="item.url" alt="Stock Image" />
                </div>
              </VueJustifiedLayout>
            </template>
          </template>
          <VueJustifiedLayout
            v-else
            v-slot="{ item }"
            :items="unsplashImages"
            :options="galleryOption"
            @scroll.native="handleUnSplashImageScroll"
          >
            <div
              v-if="item"
              class="position-relative my-image-container"
              :class="{ delete: deleteItems.includes(item.id) }"
            >
              <div class="img-over-layer" @click="updateImage(item)"></div>
              <img :src="item.url" alt="Unsplash Image" />
            </div>
          </VueJustifiedLayout>
          <div v-if="loadingUnsplash" class="unsplash-loading-container">
            <md-progress-spinner md-mode="indeterminate" />
          </div>
        </div>
      </div>
      <div
        v-if="currentPage === 'upload'"
        class="bz-modal-body"
        :class="{ disabledClick }"
      >
        <div
          class="w-100 h-100 d-flex align-items-center justify-content-center position-relative"
        >
          <vueDropzone
            id="dropzone"
            ref="myVueDropzone"
            :options="dropzoneOptions"
            class="bz-dropzone"
            :use-custom-slot="true"
            :accepted-files="'image/*'"
            @vdropzone-files-added="handleFilesAdded"
          >
            <div class="select-photo-container">
              <div>Drag & drop files here</div>
              <div>or</div>
              <button
                class="btn bz-btn-default"
                @mouseenter="disabledClick = false"
                @mouseleave="disabledClick = true"
              >
                Select a photo
              </button>
              <div class="mt-5">
                Click here to
                <a
                  class="link"
                  @click.stop="fromLink = true"
                  @mouseenter="disabledClick = false"
                  @mouseleave="disabledClick = true"
                >
                  use image link
                </a>
              </div>
            </div>
          </vueDropzone>
          <div class="image-link-form" :class="{ active: fromLink }">
            <div>Enter image link</div>
            <div class="d-flex align-items-center">
              <input class="form-control" placeholder="Add from link" />
              <button class="btn bz-btn-default ml-3 py-2 px-3">Save</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="currentPage === 'uploading'" class="bz-modal-body">
        <div
          class="w-100 h-100 d-flex align-items-center justify-content-center position-relative"
        >
          <VueJustifiedLayout
            v-slot="{ item }"
            :items="uploadingImages"
            :options="galleryOption"
          >
            <img
              :src="item.url"
              class="uploading-image"
              :class="{ uploading }"
              @click="updateImage(item)"
            />
            <md-progress-bar v-if="uploading" md-mode="indeterminate" />
          </VueJustifiedLayout>
        </div>
      </div>
      <div
        v-if="currentPage === 'edit'"
        class="bz-modal-body p-0"
        style="margin-top: 1px"
      >
        <div class="image-editor w-100 d-flex">
          <div class="side-bar">
            <div class="side-menu">
              <hr />
              <div
                class="menu-item"
                :class="{ active: tab === 'tune' }"
                @click.prevent="tab = 'tune'"
              >
                <FilterIcon />
                <span class="pt-1">Tune</span>
              </div>
              <hr />
              <div
                class="menu-item"
                :class="{ active: tab === 'crop' }"
                @click.prevent="tab = 'crop'"
              >
                <CropIcon />
                <span class="pt-1">Crop</span>
              </div>
              <hr />
            </div>
            <div class="side-panel" :class="{ active: tab === 'tune' }">
              <div
                class="d-flex align-items-center my-1"
                @click.prevent="turnFilter()"
              >
                <b class="px-2">Tune</b> <TurnIcon />
              </div>
              <div class="label">Saturation</div>
              <input
                v-model="saturation"
                type="range"
                :min="0"
                :max="2"
                :step="0.01"
                @input="handleFilterChange"
              />

              <div class="label">Brightness</div>
              <input
                v-model="brightness"
                type="range"
                :min="0"
                :max="2"
                :step="0.01"
                @input="handleFilterChange"
              />

              <div class="label">Contrast</div>
              <input
                v-model="contrast"
                type="range"
                :min="0"
                :max="2"
                :step="0.01"
                @input="handleFilterChange"
              />

              <div class="label">Hue</div>
              <input
                v-model="hue"
                type="range"
                :min="0"
                :max="6.28"
                :step="0.01"
                @input="handleFilterChange"
              />

              <div class="label">Intensity</div>
              <input
                v-model="intensity"
                type="range"
                :min="0"
                :max="1"
                :step="0.01"
                @input="handleFilterChange"
              />
            </div>
            <div class="side-panel" :class="{ active: tab === 'crop' }">
              <div class="d-flex align-items-center my-1">
                <b class="px-2">Sizing</b>
              </div>
              <div class="row mt-3">
                <div class="col-4">
                  <div
                    class="d-flex flex-column align-items-center crop-item"
                    :class="{ active: sizing === 'original' }"
                    @click.prevent="sizing = 'original'"
                  >
                    <CropOriginalIcon />
                    <span>Original</span>
                  </div>
                </div>
                <div class="col-4">
                  <div
                    class="d-flex flex-column align-items-center crop-item"
                    :class="{ active: sizing === 'square' }"
                    @click.prevent="sizing = 'square'"
                  >
                    <CropSquareIcon />
                    <span>Square</span>
                  </div>
                </div>
                <div class="col-4">
                  <div
                    class="d-flex flex-column align-items-center crop-item"
                    :class="{ active: sizing === 'portrait' }"
                    @click.prevent="sizing = 'portrait'"
                  >
                    <CropPortraitIcon />
                    <span>Portrait</span>
                  </div>
                </div>
                <div class="col-4">
                  <div
                    class="d-flex flex-column align-items-center crop-item"
                    :class="{ active: sizing === '32' }"
                    @click.prevent="sizing = '32'"
                  >
                    <Crop32Icon />
                    <span>3:2</span>
                  </div>
                </div>
                <div class="col-4">
                  <div
                    class="d-flex flex-column align-items-center crop-item"
                    :class="{ active: sizing === '169' }"
                    @click.prevent="sizing = '169'"
                  >
                    <Crop169Icon />
                    <span>16:9</span>
                  </div>
                </div>
                <div class="col-4">
                  <div
                    class="d-flex flex-column align-items-center crop-item"
                    :class="{ active: sizing === '75' }"
                    @click.prevent="sizing = '75'"
                  >
                    <Crop75Icon />
                    <span>7:5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="editingImage" class="editor-body" :class="{ [tab]: true }">
            <div v-if="tab === 'crop'" class="zoomArea">
              <ZoomOut :fill-color="'#555555'" />
              <input
                :value="zoom"
                type="range"
                :min="1"
                :max="3"
                step="any"
                @input="handleZoomInput"
              />
              <ZoomIn :fill-color="'#555555'" />
            </div>
            <Cropper
              ref="cropper"
              :src="editingImage.base64"
              :stencil-props="{
                movable: false,
                aspectRatio: aspectRatio,
              }"
              class="cropper"
              :auto-zoom="true"
              :resize-image="{ adjustStencil: false }"
              image-restriction="stencil"
              :default-position="{ left: 0, top: 0 }"
              :stencil-size="stencilSize"
              :default-boundaries="defaultBoundaries"
              :default-size="defaultSize"
              :debounce="1"
              @change="handleChange"
              @ready="handleReady"
            />

            <div v-if="tab === 'crop'" class="rotateArea">
              <input
                v-model="rotate"
                type="range"
                min="0.01"
                max="180"
                step="0.01"
                @input="handleRotateChange"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <ImageDeleteConFirmModal
      v-if="openDeleteConfirmModal"
      :on-confirm="deleteMyMedia"
      :on-close="toggleDeleteConfirmModal"
    />
  </modal>
</template>

<script>
import BackIcon from "../icons/Back";
import CloseIcon from "../icons/Close";
import SearchIcon from "../icons/Search";
import UploadIcon from "../icons/Upload";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { VueJustifiedLayout } from "vue-justified-layout";
import axios from "axios";
import DeleteIcon from "../icons/Delete";
import ImageDeleteConFirmModal from "./ImageDeleteConFirmModal";
import { Cropper } from "vue-advanced-cropper";
import FilterIcon from "../icons/Filter";
import CropIcon from "../icons/Crop";
import TurnIcon from "../icons/Turn";
import CropOriginalIcon from "../icons/CropOriginal";
import CropPortraitIcon from "../icons/CropPortrait";
import CropSquareIcon from "../icons/CropSquare";
import Crop32Icon from "../icons/Crop32";
import Crop75Icon from "../icons/Crop75";
import Crop169Icon from "../icons/Crop169";
import ZoomOut from "../icons/ZoomOut";
import ZoomIn from "../icons/ZoomIn";
import modalMixin from "../../mixins/modalMixin";

export default {
  name: "ImageSelectModal",
  components: {
    ZoomIn,
    ZoomOut,
    ImageDeleteConFirmModal,
    vueDropzone: vue2Dropzone,
    VueJustifiedLayout,
    DeleteIcon,
    SearchIcon,
    UploadIcon,
    CloseIcon,
    BackIcon,
    Cropper,
    FilterIcon,
    CropIcon,
    TurnIcon,
    CropOriginalIcon,
    CropPortraitIcon,
    CropSquareIcon,
    Crop32Icon,
    Crop75Icon,
    Crop169Icon,
  },
  mixins: [modalMixin],
  data() {
    return {
      currentPage: "unsplash", // home, search, edit, upload
      backPage: null,
      disabledClick: true,
      fromLink: false,
      uploadingImages: [],
      uploading: false,
      dropzoneOptions: {
        url: "/",
        maxFilesize: 0.5,
      },
      deleteItems: [],
      openDeleteConfirmModal: false,
      galleryOption: {
        targetRowHeight: 200,
      },
      useDefaultUI: true,
      tab: "tune",
      editingImage: null,
      croppedImage: null,
      unsplashSearch: "",
      unsplashSearchPage: 1,
      unsplashMinPage: 1,
      unsplashMaxPage: 1,
      maxPage: "Max page",
      zoom: 1,
      rotate: 0,
      zoomInput: false,
      initialScale: 1,
      saturation: 1,
      brightness: 1,
      contrast: 1,
      hue: 3.14,
      intensity: 1,
      timer: null,
      sizing: "original", // original, square, portrait, 32, 169, 75
      loadingUnsplash: false,
      loading: false,
      myImages: [],
      unsplashImages: [],
      loadUnsplashImageDeboucingTimer: null,
    };
  },
  computed: {
    position() {
      return this.$store.state.imageEditor.position;
    },
    path() {
      return this.$store.state.imageEditor.path;
    },
    unsplashApiKey() {
      return this.$store.state.unsplashApiKey;
    },
    aspectRatio() {
      switch (this.sizing) {
        case "original": {
          return this.editingImage.width / this.editingImage.height;
        }
        case "square": {
          return 1;
        }
        case "portrait": {
          return this.editingImage.height / this.editingImage.width;
        }
        case "32": {
          return 3 / 2;
        }
        case "169": {
          return 16 / 9;
        }
        case "75": {
          return 7 / 5;
        }
        default:
          return 1;
      }
    },
  },
  watch: {
    sizing() {
      this.$refs.cropper.reset();
    },
    unsplashSearch(value) {
      if (!value) {
        clearTimeout(this.loadUnsplashImageDeboucingTimer);
        this.loadingUnsplash = false;
        this.unsplashImages = [];
        return;
      }
      const self = this;
      if (this.loadUnsplashImageDeboucingTimer !== null) {
        clearTimeout(this.loadUnsplashImageDeboucingTimer);
      }
      this.loadUnsplashImageDeboucingTimer = setTimeout(() => {
        self.unsplashSearchPage = 1;
        self.unsplashImages = [];
        self.getUnsplashFiles();
        self.loadUnsplashImageDeboucingTimer = null;
      }, 500);
    },
  },
  mounted() {
    this.getMyFiles();
  },
  methods: {
    handleUnSplashImageScroll(event) {
      const element = event.target;
      if (
        element.scrollHeight - element.scrollTop < element.clientHeight + 150 &&
        !this.loadingUnsplash
      ) {
        if (this.unsplashMaxPage > this.unsplashSearchPage) {
          this.unsplashSearchPage++;
          this.getUnsplashFiles();
        }
      }
    },
    handlePageSwitch(event) {
      this.currentPage = event.target.dataset.currentPage;
      this.backPage = event.target.dataset.backPage;
    },
    async getMyFiles() {
      const self = this;
      this.loading = true;
      axios.get("/admin/userManage/getStockFiles").then(async ({ data }) => {
        if (data.status) {
          const promiseImages = data.data.map((item) =>
            self.getImageFromURL({ url: item.url, id: item.id })
          );
          await Promise.all(promiseImages);
          this.deleteItems = [];
          self.loading = false;
        }
      });
    },
    async getUnsplashFiles() {
      if (this.unsplashApiKey) {
        this.loadingUnsplash = true;
        axios
          .get("https://api.unsplash.com/search/photos", {
            params: {
              query: this.unsplashSearch,
              page: this.unsplashSearchPage,
              per_page: 20,
              client_id: this.unsplashApiKey,
            },
          })
          .then(async ({ data }) => {
            console.log(
              "ImageSelectModal getStockFiles Response getUnsplashFiles",
              data
            );
            if (data.results.length) {
              this.deleteItems = [];
              this.unsplashMaxPage = data.total_pages;
              this.maxPage = "Min page 1 & Max page: " + data.total_pages;
              const promiseImages = data.results.map((item) =>
                this.getImageFromURL({ url: item.urls.regular }, true)
              );
              await Promise.all(promiseImages);
            }
            setTimeout(() => {
              this.loadingUnsplash = false;
            }, 500);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.error("Unsplash Key does not exist");
      }
    },
    handleBack() {
      this.currentPage = this.backPage;
      switch (this.backPage) {
        case "home": {
          this.backPage = null;
          break;
        }
        default: {
          this.backPage = null;
        }
      }
    },
    async handleFilesAdded(files) {
      this.uploading = true;
      this.currentPage = "uploading";
      this.uploadingImages = [];
      let images = [];
      for (let i = 0; i < files.length; i++) {
        if (i > 10) break;
        images.push(this.getImageFromFile(files[i]));
      }
      images = await Promise.all(images);
      this.uploadingImages = images.filter((img) => img);

      axios
        .post("/admin/userManage/uploadStockFiles", {
          images: this.uploadingImages,
        })
        .then((res) => {
          if (res.data.status) {
            const newImages = this.uploadingImages.map((image, index) => {
              return {
                ...image,
                url: res.data.data[index],
              };
            });
            this.uploadingImages = Object.assign([], newImages);
            this.uploading = false;
            if (this.uploadingImages.length === 1) {
              this.updateImage(this.uploadingImages[0]);
            }
          }
        });
    },
    updateImage(item) {
      if (this.deleteItems.length === 0) {
        if (!this.uploading) {
          this.$store.state.modals.basic.onChange(item);
          this.onClose();
        }
      } else {
        this.deleteItems.toggle(item.id);
      }
    },
    /**
     * Loads Image from the given remove image url and get height and width of the image to use for rendering images in JustifiedLayout component.
     * JustifiedLayout component requires image to have width and height property.
     * Link:  https://codekraft-studio.github.io/vue-justified-layout/guide/
     *
     * In case of my image, we display all images first with default width and height of 100px for both.
     * After then, we load image to get its width and height and rerender the image with correct image and height.
     *
     * In case of unsplash image we load images first and display it with correct width and height.
     * It will be done using Promise.all function to load images asynchronously.
     * So, first loaded image will be displayed first, which is different order from the api returns.
     *
     * @param url
     * @param index
     * @param isUnsplashImage
     */
    getImageFromURL({ url, id }, isUnsplashImage = false) {
      const self = this;
      const img = new Image();
      img.onload = function () {
        if (isUnsplashImage) {
          self.unsplashImages.push({
            width: img.width,
            height: img.height,
            url: url,
          });
        } else {
          self.myImages.push({
            width: img.width,
            height: img.height,
            url: url,
            id: id,
          });
        }
      };
      img.onerror = function (e) {
        // error
      };
      img.src = url;
    },
    deleteMyMedia() {
      axios
        .post("/admin/userManage/deleteStockFiles", { ids: this.deleteItems })
        .then(({ data }) => {
          if (data.status) {
            this.toggleDeleteConfirmModal();
            this.myImages = this.myImages.filter(
              (item) => !this.deleteItems.includes(item.id)
            );
            this.myImages = Object.assign([], this.myImages);
            this.deleteItems = [];
          }
        });
    },
    toggleDeleteConfirmModal() {
      this.openDeleteConfirmModal = !this.openDeleteConfirmModal;
    },
    async getImageFromFile(file) {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = function () {
          const oFReader = new FileReader();
          oFReader.readAsDataURL(file);
          oFReader.onload = function () {
            resolve({
              width: img.width,
              height: img.height,
              url: this.result,
            });
          };
        };
        img.onerror = function () {
          resolve(false);
        };
        img.src = window.URL.createObjectURL(file);
      });
    },
    async photoEdit(item) {
      this.currentPage = "edit";
      this.backPage = "home";
      const base64 = await this.getBase64FromUrl(item.url);
      this.editingImage = {
        ...item,
        base64: base64,
      };
    },
    async getBase64FromUrl(url) {
      const data = await fetch(url + "?1");
      const blob = await data.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result;
          resolve(base64data);
        };
      });
    },
    defaultBoundaries({ cropper, imageSize }) {
      return {
        width: cropper.clientWidth,
        height: cropper.clientHeight,
      };
    },
    defaultSize({ imageSize, visibleArea }) {
      return {
        width: (visibleArea || imageSize).width,
        height: (visibleArea || imageSize).height,
      };
    },
    stencilSize({ boundaries, aspectRatio }) {
      return {
        height: boundaries.height * 0.6,
        width: boundaries.height * 0.6 * this.aspectRatio,
      };
    },
    handleChange(e) {
      if (this.zoomInput === false) {
        this.zoom = e.image.transforms.scaleX / this.initialScale;
      }
      this.applyFilter();
    },
    handleReady() {
      this.initialScale = this.$refs.cropper.image.transforms.scaleX;
    },
    handleZoomInput(e) {
      this.zoomInput = true;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      const value = e.target.value;
      this.timer = setTimeout(() => {
        const currentScale = this.$refs.cropper.image.transforms.scaleX;
        const newScale = parseFloat(value) * this.initialScale;
        this.$refs.cropper.zoom(newScale / currentScale);
        this.zoomInput = false;
        this.timer = null;
      }, 10);
    },
    handleRotateChange() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        const currentRotate = this.$refs.cropper.image.transforms.rotate;
        this.$refs.cropper.rotate(this.rotate - currentRotate);
        this.timer = null;
      }, 10);
    },
    getFilter() {
      return `saturate(${this.saturation * 100}%) brightness(${
        this.brightness
      })  contrast(${this.contrast * 100}%) hue-rotate(${
        ((this.hue - 3.14) * 180) / Math.PI
      }deg)`;
    },
    applyFilter() {
      const canvas = this.$refs.cropper.getResult().canvas;
      const ctx = canvas.getContext("2d");
      ctx.filter = this.getFilter();
      ctx.drawImage(canvas, 0, 0);
      this.croppedImage = canvas.toDataURL();
    },
    handleFilterChange() {
      const filter = this.getFilter();
      this.$refs.cropper.$el.getElementsByTagName("img")[0].style.filter =
        filter;
      this.$refs.cropper.$el.getElementsByTagName("img")[1].style.filter =
        filter;
      this.applyFilter();
    },
    downloadCroppedImage() {
      const image = this.croppedImage;
      const link = document.createElement("a");
      link.href = image;
      link.setAttribute("download", "cropped");
      document.body.appendChild(link);
      link.click();
    },
    saveCroppedImage() {
      this.loading = true;
      axios
        .post("/admin/userManage/uploadStockFiles", {
          images: [{ url: this.croppedImage }],
        })
        .then((res) => {
          if (res.data.status) {
            this.updateImage({ url: res.data.data[0] });
            this.onClose();
          }
          this.loading = false;
        })
        .catch((e) => {
          console.log(e);
          this.loading = false;
        });
    },
    turnFilter() {
      this.saturation = 1;
      this.brightness = 1;
      this.contrast = 1;
      this.hue = 3.14;
      this.handleFilterChange();
    },
  },
};
</script>

<style lang="scss">
@import "style";
.unsplash-loading-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff34;
  z-index: 2;
  top: 0;
  left: 0;
}
$activeColor: #0076df;
.vm--modal.select-image {
  max-width: 1480px !important;
  align-self: center;
  height: 80vh !important;
  overflow: hidden;
  .justified-container {
    width: 100%;
    height: 100% !important;
    background-color: white;
    overflow-y: auto;
    overflow-x: hidden;
    .justified-item {
      height: 200px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .bz-modal {
    width: 100%;
    height: 100%;
    .bz-modal-header {
      width: 100%;
      height: 60px;
      box-shadow: 0 0 8px 4px #00000034;
      align-items: center;
      display: flex;
      padding: 5px 20px;

      .close-icon {
        display: flex;
        margin-left: auto;
        align-items: center;

        .delete-button {
          margin: 4px 4px;
          border: none;
          outline: none;
          border-radius: 4px;
          box-shadow: 0 0 4px 2px #00000012;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #ff850f;
          padding: 7px 15px;

          &:hover {
            background-color: #d93f02;
          }
        }
      }
    }

    .bz-modal-body {
      width: 100%;
      height: calc(100% - 60px);
      padding: 20px;

      .bz-modal-section-1 {
        width: 100%;
        align-items: center;
        display: flex;

        .pull-right {
          margin-left: auto;
        }
      }

      .bz-modal-section-2 {
        margin-top: 20px;
        width: 100%;
        align-items: center;
        display: flex;
        justify-content: center;
        height: calc(100% - 70px);
      }

      .bz-dropzone {
        width: 100%;
        height: 100%;
        border: none;
        box-shadow: none;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;

        .dz-message {
          width: 100%;
          height: 100%;
          justify-content: center;
          align-items: center;
          display: flex;
          flex-direction: column;
        }
      }

      &.disabledClick {
        &:hover {
          pointer-events: none;
        }
      }

      .select-photo-container {
        width: 100%;
        height: 100%;
        border: 2px dashed rgb(204, 204, 204);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 600px;
        max-height: min(300px, 100% - 200px);
      }

      .image-link-form {
        bottom: -100px;
        width: 100%;
        position: absolute;
        left: 0;
        &.active {
          bottom: 0;
          transition: 0.5s;
        }
      }
    }
  }
  .link {
    color: #0076df;
    text-decoration: underline;
    padding: 10px 5px;
    border-radius: 4px;
    &:hover {
      background-color: rgba(0, 118, 223, 0.04);
      cursor: pointer;
    }
  }
  .uploading-image {
    &.uploading {
      pointer-events: none;
    }
    &:not(.uploading) {
      &:hover {
        border: solid 4px #0076df;
        cursor: pointer;
      }
    }
  }
  .my-image-container {
    height: inherit;

    &.delete {
      border: solid 3px crimson;
    }

    .control {
      position: absolute;
      right: 0;
      top: 0;
      align-items: center;
      justify-content: space-between;
      margin-top: 5px;
      display: flex;

      button {
        margin: 4px 4px;
        border: none;
        outline: none;
        border-radius: 4px;
        box-shadow: 0 0 4px 2px #00000012;
        align-items: center;
        justify-content: space-between;
        background-color: white;
        padding: 4px 10px;

        &:not(.active) {
          display: none;
        }

        &:hover {
          background-color: wheat;
        }

        b {
          padding-left: 4px;
          color: $activeColor;
        }
      }
    }

    &:hover {
      .img-over-layer {
        height: inherit;
        width: 100%;
        position: absolute;
        background-color: #00000034;

        button {
          display: flex !important;
        }
      }

      &:not(.delete) {
        img {
          border: solid 3px #0076df;
          cursor: pointer;
        }
      }
    }
  }
  .image-editor {
    .side-bar {
      width: 280px;
      display: flex;

      hr {
        margin-top: 0;
        margin-bottom: 0;
      }

      .side-menu {
        background-color: rgb(246, 246, 246);
        width: 80px;
        height: 100%;
        padding-top: 30px;
        box-shadow: inset 0 0 0 1px #8080803f;

        .menu-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          padding: 14px 0;
          cursor: pointer;

          &.active {
            color: $activeColor;
            background-color: white;
          }
        }
      }
      .side-panel {
        width: 200px;
        background-color: white;
        display: none;
        flex-direction: column;
        padding: 5px;

        &.active {
          display: flex;
        }

        .slider-horizontal {
          height: 10px;
          min-width: 190px;
          padding: 0;
          margin: 0;

          .slider-wrapper {
            top: 5px;
          }
          .slider-thumb,
          .slider-thumb-label,
          .slider-track-fill {
            background-color: $activeColor;
          }
        }

        .label {
          padding-left: 7px;
          margin-top: 20px;
        }

        .row {
          margin-right: -5px;
          margin-left: -5px;
          flex: unset;
        }

        .col-4 {
          padding-right: 6px;
          padding-left: 6px;
        }

        .crop-item {
          padding: 6px;
          border-radius: 4px;
          &.active,
          &:hover {
            background-color: rgba(0, 118, 223, 0.1);
          }
        }
      }
    }
    .editor-body {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgb(240, 240, 240);
      width: calc(100% - 280px);
      height: 100%;
      position: relative;
      overflow: hidden;

      .zoomArea {
        position: absolute;
        width: 100%;
        top: calc(10% - 30px);
        left: 0;
        z-index: 99999999;
        display: flex;
        align-items: center;
        justify-content: center;

        input {
          width: 50%;
        }
      }

      .rotateArea {
        position: absolute;
        width: 100%;
        bottom: calc(10% - 30px);
        left: 0;
        z-index: 99999999;
        display: flex;
        align-items: center;
        justify-content: center;

        input {
          width: 50%;
        }
      }

      .cropper {
        height: 100%;
        width: 100%;
        .vue-advanced-cropper__image-wrapper {
          overflow: unset !important;
        }
        .vue-advanced-cropper__background {
          background-color: transparent !important;
        }
        img {
          object-fit: contain !important;
        }
      }

      &.crop {
        .vue-advanced-cropper__foreground {
          opacity: 0.7;
          background-color: white !important;
        }
      }

      &.tune {
        .vue-advanced-cropper__foreground {
          opacity: 1;
          background-color: rgb(240, 240, 240) !important;
        }
      }
    }
  }
}

.bz-btn-default {
  background-color: #0076df !important;
  border: solid 1px #0076df !important;
  border-radius: 4px;
  color: white !important;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: #0076df;
  }
}
</style>
