<template>
  <div class="bz-el-menu">
    <template v-if="edit">
      <template v-for="(page, index) of allPages">
        <div v-if="showMenuItem(page)" :key="index" @click.stop.prevent="setActivePage({ index, type: page.type })">
          <slot :pageName="page.name" :active="isActiveMenu(page.url)" />
        </div>
      </template>
    </template>
    <template v-else>
      <template v-for="(page, index) of allPages">
        <a v-if="showMenuItem(page)" :key="index" :href="pageUrl(page.url)">
          <slot :pageName="page.name" :active="isActiveMenu(page.url)" />
        </a>
      </template>
    </template>
  </div>
</template>

<script>
import elementMixin from '../../mixins/elementMixin'

export default {
  name: 'BzMenu',
  mixins: [elementMixin],
  methods: {
    showMenuItem(page) {
      if (page.type !== 'module') {
        return true
      }
      return page.name && page.data.nav_status
    }
  }
}
</script>

<style lang="scss" scoped>
.bz-el-menu {
  display: flex;
  a {
    text-decoration: none;
  }
}
</style>
