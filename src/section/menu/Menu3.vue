<template>
  <div class="bz-section-container bz-sec--sectionName-root" :class="{ [breakPoint]: true }">
    <bz-background :setting="background" :size="sectionSize" :bzAnimationClass="setting.animationClass">
      <bz-container>
        <bz-alignment :alignment="setting.layouts.alignment">
          <bz-title v-model="data.elements.title" v-if="setting.elements.title" :text-color="theme.primaryColor" />

          <bz-text v-model="data.elements.subtitle" v-if="setting.elements.subtitle" />

          <bz-text v-model="data.elements.description" v-if="setting.elements.description" />
        </bz-alignment>

        <bz-items v-model="data.items" :cols="setting.column" :shadow="false" :spacing="false">
          <template slot-scope="{ item, index }">
            <div class="bz-col-12 py-0">
              <div class="bz-row" :class="{ 'bz-row-reverse': setting.layouts.alignment === 'right' }">
                <div class="bz-col-8 py-0">
                  <bz-alignment :alignment="setting.layouts.alignment">
                    <bz-text :bold="true" v-model="item.title" v-if="setting.listElements.title" :size="'1.1em'" :text-color="theme.primaryColor" />
                  </bz-alignment>
                </div>
                <div class="bz-col-4 py-0">
                  <bz-alignment :alignment="setting.layouts.alignment">
                    <bz-text v-model="item.price" v-if="setting.listElements.price" :size="'1.1em'" :text-color="theme.primaryColor" />
                  </bz-alignment>
                </div>
              </div>
            </div>
            <div class="bz-col-12 py-0">
              <bz-alignment :alignment="setting.layouts.alignment">
                <bz-text v-model="item.subtitle" v-if="setting.listElements.description" />
              </bz-alignment>
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
import BzAlignment from '../../components/section/BzAlignment'
import BzTitle from '../../components/section/BzTitle'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzText from '../../components/section/BzText'
import BzItems from '../../components/section/BzItems'

export default {
  components: { BzItems, BzText, BzSubtitle, BzTitle, BzAlignment, BzContainer, BzBackground },
  mixins: [sectionMixin],
  name: 'Menu3'
}
</script>

<style scoped></style>
