<template>
  <div class="bz-section-container bz-sec--faq4-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :setting="background" :size="sectionSize" :bzAnimationClass="setting.animationClass">
      <bz-container>
        <bz-title v-if="setting.elements.title" v-model="data.elements.title" :text-color="theme.primaryColor" />
        <bz-text v-if="setting.elements.subtitle" v-model="data.elements.subtitle" />
        <bz-text v-if="setting.elements.description" v-model="data.elements.description" />
        <bz-items v-model="data.items" :cols="setting.column" :shadow="false">
          <template slot-scope="{ index }">
            <div class="bz-faq-question-wrapper">
              <bz-title v-if="setting.listElements.question" v-model="data.items[index].question" />
            </div>

            <bz-text v-if="setting.listElements.answer" v-model="data.items[index].answer" />
          </template>
        </bz-items>
      </bz-container>
    </bz-background>
  </div>
</template>

<script>
import sectionMixin from '../../mixins/sectionMixin'
import BzBackground from '../../components/section/BzBackground'
import BzContainer from '../../components/section/BzContainer'
import BzTitle from '../../components/section/BzTitle'
import BzText from '../../components/section/BzText'
import BzItems from '../../components/section/BzItems'

export default {
  components: { BzItems, BzText, BzTitle, BzContainer, BzBackground },
  mixins: [sectionMixin]
}
</script>
<style lang="scss" scoped>
.bz-sec--faq4-root {
  .bz-faq-question-wrapper {
    border-width: 0 0 2px 0;
    border-color: var(--bz-primary-color);
    border-style: solid;
    margin-bottom: 15px;
  }
}
</style>
