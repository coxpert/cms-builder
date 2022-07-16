<template>
  <div>
    <input :id="uid" type="file" accept="image/*" hidden @change="handleChange" />
    <div class="d-flex align-items-center mt-3">
      <label v-if="label" :for="uid" class="btn bz-btn-default">{{ label }}</label>
      <slot v-else />
      <label v-if="src" class="btn bz-btn-default ml-2" @click="handleCrop">Crop</label>
    </div>
    <div v-if="preview && src" style="border: solid 1px #00000012" :style="{ width: previewWidth, height: previewHeight }">
      <img :src="src" alt="Image Selector" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import BzCropper from './BzCropper'

export default {
  name: 'ImageSelector',
  props: {
    value: {
      type: [String, null],
      default: null
    },
    label: {
      type: String,
      default: 'Upload Image'
    },
    previewWidth: {
      type: String,
      default: '100%'
    },
    previewHeight: {
      type: String,
      default: '100%'
    },
    preview: {
      type: Boolean,
      default: true
    },
    uploadUrl: {
      type: String,
      default: undefined
    },
    crop: {
      type: Boolean,
      default: true
    },
    aspectRatio: {
      type: [Number, Boolean],
      default: false
    }
  },
  data() {
    return {
      file: null,
      uid: null,
      base64: null,
      src: null,
      loading: false,
      cropSrc: null,
      cropShow: false,
      croppedImage: null,
      originalSrc: null,
      requireBase64: false
    }
  },
  watch: {
    value() {
      this.src = this.value
      this.base64 = this.value
      if (!this.value.includes('base64')) {
        this.originalSrc = this.value
        window.getBase64FromUrl(this.value).then((base64) => {
          this.base64 = base64
          this.$emit('input', base64)
        })
      } else {
        this.base64 = this.value
      }
      if (this.cropShow && !this.value.includes('base64')) {
        this.cropSrc = this.value + '?' + new Date().getTime()
      }
    }
  },
  created() {
    this.uid = this.$uuid.v4()
    if (this.value) {
      this.src = this.value
    }
  },
  methods: {
    async handleCrop() {
      if (!this.src.includes('base64')) {
        this.originalSrc = this.src
      }
      if (this.originalSrc) {
        if (this.src.includes('blob:')) {
          this.cropSrc = this.originalSrc
        } else {
          this.cropSrc = this.originalSrc + '?v=' + new Date().getTime()
        }
      } else {
        this.cropSrc = this.src
      }
      this.showCropper()
    },
    showCropper() {
      let imageCropper = document.getElementById('bz-image-cropper')
      if (imageCropper === null) {
        imageCropper = document.createElement('div')
        imageCropper.setAttribute('id', 'bz-image-cropper-container')
        document.body.appendChild(imageCropper)
        const self = this
        const cropper = new (Vue.extend(BzCropper))({
          propsData: {
            cropSrc: self.cropSrc
          }
        })
        cropper.$mount('#bz-image-cropper-container')
        cropper.$on('crop', function (cropped) {
          console.log('changed')
          self.src = cropped
          self.$emit('input', cropped)
        })
      }
    },
    handleChange(e) {
      const input = e.target
      if (!input.files?.length) {
        return false
      }
      this.file = input.files[0]
      if (this.file) {
        this.cropSrc = URL.createObjectURL(this.file)
        this.showCropper()
      }
    },
    upload() {
      const self = this
      this.loading = true
      return axios
        .post(this.uploadUrl, { image: this.base64 })
        .then((res) => {
          if (res.status === 200) {
            window.LOG.success('ImageSelector', 'Image Upload Success')
            self.loading = false
            return true
          }
        })
        .catch((err) => {
          window.LOG.error('Image Upload Failed', err)
          return false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
label {
  width: max-content;
}

img {
  width: 100%;
}
</style>
