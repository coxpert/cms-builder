<template>
  <modal :classes="['attach-link-modal']" name="attach-link-modal" @closed="onClose()">
    <div style="background-color: rgb(246, 246, 246)" class="p-3">
      <h5>Attach link</h5>
    </div>
    <div class="d-flex flex-column pt-3 px-4">
      <md-radio v-model="attachLink.type" value="page">Page</md-radio>
      <md-radio v-model="attachLink.type" value="web-address">Web address</md-radio>
      <md-radio v-model="attachLink.type" value="email-address">Email address</md-radio>
      <md-radio v-model="attachLink.type" value="phone-number">Phone Number</md-radio>
      <md-radio v-model="attachLink.type" value="no-link">No link</md-radio>
    </div>
    <div v-if="attachLink.type === 'page'" class="p-4">
      <bz-select v-model="attachLink.page" :options="pageLinks" />
      <div class="d-flex justify-content-between align-items-center mt-3 px-1">
        <span class="element_item_label">Open in a new tab</span>
        <bz-switch v-model="attachLink.target" />
      </div>
    </div>
    <div v-if="attachLink.type === 'web-address'" class="p-4">
      <input v-model="attachLink.webAddress" class="form-control" placeholder="Web address" />
      <div class="d-flex justify-content-between align-items-center mt-3 px-1">
        <span class="element_item_label">Open in a new tab</span>
        <bz-switch v-model="attachLink.target" />
      </div>
    </div>

    <div v-if="attachLink.type === 'email-address'" class="p-4">
      <input v-model="attachLink.email" class="form-control" placeholder="Enter an email address" />
      <input v-model="attachLink.subject" class="form-control mt-3" placeholder="Enter an email subject (optional)" />
    </div>

    <div v-if="attachLink.type === 'phone-number'" class="p-4">
      <input v-model="attachLink.phoneNumber" class="form-control" placeholder="Enter a phone number" />
    </div>

    <div v-if="attachLink.type === 'document'" class="p-4">
      <label class="btn bz-btn-default-outline" for="uploadDocument">
        <b>Upload document</b>
        <input id="uploadDocument" type="file" hidden />
      </label>
    </div>

    <p v-if="attachLink.type === 'no-link'" class="p-4" style="font-size: 14px">
      There is currently no link attached to this element, you can select on of the various options above to add a link.
    </p>
    <hr />
    <div class="w-100 d-flex justify-content-end">
      <button class="btn bz-btn-default-outline mr-2" @click="onClose()">
        <b>Cancel</b>
      </button>
      <button class="btn btn-danger mr-4 d-flex align-items-center" @click="onConfirm()">
        <b>Save</b>
      </button>
    </div>
  </modal>
</template>

<script>
import BzSelect from '../page/BzSelect'
import BzSwitch from '../page/BzSwitch'
export default {
  components: { BzSwitch, BzSelect },
  data() {
    return {
      loading: false,
      attachLink: {}
    }
  },
  computed: {
    pages() {
      return this.$store.state.pages
    },
    pageLinks() {
      const links = []
      for (const page of this.pages) {
        links.push({
          label: page.name,
          value: `${page.url || ''}`
        })
      }
      links.push({
        label: 'Login',
        value: 'login'
      })
      links.push({
        label: 'Register',
        value: 'register'
      })
      return links
    }
  },
  created() {
    this.attachLink = this.getAttachLink()
  },
  mounted() {
    this.$modal.show('attach-link-modal')
  },
  methods: {
    getAttachLink() {
      const attachLink = this.$store.state.attachLink
      return attachLink.value || {}
    },
    onClose() {
      this.$store.commit('closeAttachLink')
    },
    onConfirm() {
      this.$store.state.attachLink.onChange(this.attachLink)
      this.onClose()
    }
  }
}
</script>

<style lang="scss">
.attach-link-modal {
  max-width: 450px;
  height: min-content !important;
  padding-bottom: 15px;

  .md-radio {
    margin: 0;
    .md-radio-label {
      line-height: 22px;
    }
  }

  .element_item_label {
    width: 170px;
  }
}
</style>
