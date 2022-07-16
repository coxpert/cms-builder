<template>
  <div class="bz-el-logo-root">
    <!-- <template v-if="url">
      <img :src="url" :alt="template.name + 'logo'" />
    </template> -->
    <template v-if="templateSetting.internalTemplateSettings.logo">
      <img class="web-logo mr-2" :src="templateSetting.internalTemplateSettings.logo" :alt="templateSetting.internalTemplateSettings.templateName + 'logo'" />
    </template>
    <bz-title v-if="title" v-model="template.name" :text-color="theme.primaryColor" :mb="0" />
  </div>
</template>

<script>
import BzTitle from './BzTitle'
import elementMixin from '../../mixins/elementMixin'
export default {
  name: 'BzLogo',
  components: { BzTitle },
  mixins: [elementMixin],
  props: {
    title: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    url() {
      return this.$store.state.template.logo
    },
    template() {
      return this.$store.state.template
    },
    theme() {
      return this.$store.state.theme
    }
  },
  mounted() {
    console.log('section', this.section)
  }
}
</script>

<style lang="scss" scoped>
.bz-el-logo-root {
  height: 60px;
  display: flex;
  img {
    max-width: 150px;
    height: 100%;
    object-fit: contain;
  }
}
</style>
