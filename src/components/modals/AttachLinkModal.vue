<template>
  <modal
    :classes="['attach-link-modal']"
    name="attachLinkModal"
    @closed="onClose()"
  >
    <div style="background-color: rgb(246, 246, 246)" class="p-3">
      <h5>Attach link</h5>
    </div>
    <div class="d-flex flex-column pt-3 px-4">
      <md-radio v-model="data.type" value="page" class="mb-2">Page</md-radio>
      <md-radio v-model="data.type" value="web-address" class="mb-2"
        >Web address</md-radio
      >
      <md-radio v-model="data.type" value="email-address" class="mb-2"
        >Email address</md-radio
      >
      <md-radio v-model="data.type" value="phone-number" class="mb-2"
        >Phone Number</md-radio
      >
      <md-radio v-model="data.type" value="no-link" class="mb-2"
        >No link</md-radio
      >
    </div>
    <div v-if="data.type === 'page'" class="p-4">
      <bz-select v-model="data.page" :options="pageLinks" />
      <div class="d-flex justify-content-between align-items-center mt-3 px-1">
        <span class="element_item_label">Open in a new tab</span>
        <bz-switch v-model="data.target" />
      </div>
    </div>
    <div v-if="data.type === 'web-address'" class="p-4">
      <input
        v-model="data.webAddress"
        class="form-control"
        placeholder="Web address"
      />
      <div class="d-flex justify-content-between align-items-center mt-3 px-1">
        <span class="element_item_label">Open in a new tab</span>
        <bz-switch v-model="data.target" />
      </div>
    </div>

    <div v-if="data.type === 'email-address'" class="p-4">
      <input
        v-model="data.email"
        class="form-control"
        placeholder="Enter an email address"
      />
      <input
        v-model="data.subject"
        class="form-control mt-3"
        placeholder="Enter an email subject (optional)"
      />
    </div>

    <div v-if="data.type === 'phone-number'" class="p-4">
      <input
        v-model="data.phoneNumber"
        class="form-control"
        placeholder="Enter a phone number"
      />
    </div>

    <div v-if="data.type === 'document'" class="p-4">
      <label class="btn bz-btn-default-outline" for="uploadDocument">
        <b>Upload document</b>
        <input id="uploadDocument" type="file" hidden />
      </label>
    </div>

    <p v-if="data.type === 'no-link'" class="p-4" style="font-size: 14px">
      There is currently no link attached to this element, you can select on of
      the various options above to add a link.
    </p>
    <hr />
    <div class="w-100 d-flex justify-content-end">
      <button class="btn bz-btn-default-outline mr-2" @click="onClose">
        <b>Cancel</b>
      </button>
      <button
        class="btn btn-danger mr-4 d-flex align-items-center"
        @click="onConfirm"
      >
        <b>Save</b>
      </button>
    </div>
  </modal>
</template>

<script>
import BzSelect from "../page/BzSelect";
import BzSwitch from "../page/BzSwitch";
import modalMixin from "../../mixins/modalMixin";
export default {
  components: { BzSwitch, BzSelect },
  mixins: [modalMixin],
  data() {
    return {
      loading: false,
      data: {},
    };
  },
  computed: {
    pages() {
      return this.$store.state.pages;
    },
    pageLinks() {
      const links = [];
      for (const page of this.pages) {
        links.push({
          label: page.name,
          value: `${page.url || ""}`,
        });
      }
      links.push({
        label: "Login",
        value: "login",
      });
      links.push({
        label: "Register",
        value: "register",
      });
      return links;
    },
  },
};
</script>

<style lang="scss">
@import "style";
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
