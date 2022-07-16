<template>
  <section class="bz-section-container address1" :class="{ [breakPoint]: true }">
    <bz-background :setting="background" :size="sectionSize" :bzAnimationClass="setting.animationClass">
      <bz-container>
        <div class="w-100 h-100 d-flex justify-content-around flex-column pt-5">
          <bz-text-element v-model="data.elements" :setting="setting.elements" :alignment="setting.layouts.alignment" />

          <bz-business-hours v-if="setting.elements.businessHours" class="mt-3" :location="setting.businessInformation.location" :design="3" />
        </div>
      </bz-container>
    </bz-background>
  </section>
</template>

<script>
import sectionMixin from '../../mixins/sectionMixin'
import BzBackground from '../../components/section/BzBackground'
import BzBusinessHours from '../../components/section/BzBusinessHours'
import BzContainer from '../../components/section/BzContainer'
import BzTextElement from '../../components/section/BzTextElement'

export default {
  name: 'BusinessHours5',
  components: {
    BzTextElement,
    BzContainer,
    BzBusinessHours,
    BzBackground
  },
  mixins: [sectionMixin],
  mounted() {}
}
</script>
<style lang="scss">
.address1 {
}
</style>
