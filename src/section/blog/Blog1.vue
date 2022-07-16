<template>
  <div class="bz-section-container bz-sec--faq-1-root" :class="{ [breakPoint]: true }">
    <bz-background :setting="background" :size="sectionSize" :bzAnimationClass="setting.animationClass">
      <bz-container>
        <div class="w-100 h-100 d-flex justify-content-around flex-column p-lg-4">
          <bz-title v-if="setting.elements.title" v-model="data.elements.title" />
          <bz-text-element v-model="data.elements" :setting="setting.elements" v-html="data.elements.body" />
        </div>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import sectionMixin from '../../mixins/sectionMixin'
import BzBackground from '../../components/section/BzBackground'
import BzTitle from '../../components/section/BzTitle'
import BzContainer from '../../components/section/BzContainer'
import BzTextElement from '../../components/section/BzTextElement'

export default {
  components: {
    BzTextElement,
    BzContainer,
    BzBackground,
    BzTitle
  },
  mixins: [sectionMixin],
  name: 'Blog1'
}
</script>

<style scoped></style>
