<template>
  <div class="bz-section-container bz-sec--faq-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :setting="background" :size="sectionSize" :bzAnimationClass="setting.animationClass">
      <bz-container>
        <bz-title v-if="setting.elements.title" v-model="data.elements.title" :text-color="theme.primaryColor" />
        <bz-text v-if="setting.elements.subtitle" v-model="data.elements.subtitle" />
        <bz-text v-if="setting.elements.description" v-model="data.elements.description" />
        <bz-items v-model="data.items" :cols="setting.column">
          <template slot-scope="{ index }">
            <div class="faq-question-wrapper">
              <bz-text v-if="setting.listElements.question" v-model="data.items[index].question" :background-color="theme.primaryColor" size="20px" />
            </div>

            <div class="faq-answer-wrapper">
              <bz-text v-if="setting.listElements.answer" v-model="data.items[index].answer" />
            </div>
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
.bz-sec--faq-root {
  .faq-question-wrapper {
    background-color: var(--bz-primary-color);
    padding: 15px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      width: 15px;
      height: 15px;
      transform: rotate(45deg);
      background-color: var(--bz-primary-color);
      bottom: -8px;
      left: 15%;
    }
  }
  .faq-answer-wrapper {
    padding: 15px;
  }
}
</style>
