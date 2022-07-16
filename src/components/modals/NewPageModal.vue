<template>
  <modal :classes="['new-page-modal']" name="new-page-modal" @closed="onClose()">
    <div style="background-color: rgb(246, 246, 246)" class="d-flex p-3 justify-content-between">
      <h5>Add page</h5>
      <div class="cursor-pointer" @click.prevent="onClose()">
        <CloseIcon />
      </div>
    </div>
    <div class="w-100 h-100">
      <div class="col-12 h-100">
        <div class="w-100 h-100 d-flex justify-content-center align-items-center">
          <bz-input v-model="pageName" label="Page Name" :height="45" />
        </div>
      </div>
    </div>
    <hr style="margin-top: auto" />
    <div class="w-100 d-flex justify-content-end pb-2">
      <button class="btn bz-btn-default mr-4 d-flex align-items-center" @click="onConfirm()">
        <b>Add Page</b>
      </button>
    </div>
  </modal>
</template>

<script>
import CloseIcon from '../icons/Close'
import BzInput from '../page/BzInput'
import axios from 'axios'
import componentMixin from '../../mixins/componentMixin'
export default {
  components: { BzInput, CloseIcon },
  mixins: [componentMixin],
  data() {
    return {
      pageName: ''
    }
  },
  mounted() {
    this.$modal.show('new-page-modal')
  },
  methods: {
    onClose() {
      this.$emit('close')
    },
    onConfirm() {
      if (this.pageName) {
        axios
          .post(route('admin.template.page.addNewPage', this.template.id), {
            page_name: this.pageName,
            parent_id: 0
          })
          .then((res) => {
            let newPage = res.data.data
            if (this.allPages[0].web_id) {
              newPage = {
                ...this.allPages[0],
                name: newPage.name,
                url: newPage.url,
                created_at: newPage.created_at,
                updated_at: newPage.updated_at,
                content: null,
                css: [],
                mainCss: null,
                sectionCss: null,
                sections: [],
                id: newPage.id
              }
            }
            if (this.allPages[0]?.url === null) this.allPages[0].url = ''
            this.allPages.push(newPage)
            this.allPages = _copy(this.allPages)
            this.onClose()
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        alert('Please enter a name of page you are creating')
      }
    }
  }
}
</script>
<style lang="scss">
.new-page-modal {
  height: 200px !important;
  display: flex;
  flex-direction: column;
  top: 150px !important;
}
</style>
