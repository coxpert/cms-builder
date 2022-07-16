<template>
  <div class="bz-section-container bz-sec-business-hours-1-root" :class="{ [breakPoint]: true }">
    <bz-background :setting="background" :size="sectionSize" :bzAnimationClass="setting.animationClass">
      <bz-container>
        <div class="w-100 h-100 d-flex justify-content-around flex-column p-lg-4">
          <bz-text-element v-model="data.elements" :setting="setting.elements" :alignment="setting.layouts.alignment" />
          <bz-business-hours v-if="setting.elements.businessHours" :location="setting.businessInformation.location" />
        </div>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import BzBackground from '../../components/section/BzBackground'
import BzBusinessHours from '../../components/section/BzBusinessHours'
import BzContainer from '../../components/section/BzContainer'
import BzTextElement from '../../components/section/BzTextElement'
import sectionMixin from '../../mixins/sectionMixin'

export default {
  name: 'BusinessHours2',
  components: {
    BzTextElement,
    BzContainer,
    BzBusinessHours,
    BzBackground
  },
  mixins: [sectionMixin]
}
</script>
<style lang="scss">
.bz-sec-business-hours-1-root {
}
</style>
