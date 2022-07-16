<template>
  <div class="bz-section-container bz-sec--event-2-root" :class="{ [breakPoint]: true }">
    <bz-background :setting="background" :size="sectionSize" :bzAnimationClass="setting.animationClass">
      <bz-container>
        <bz-text-element v-model="data.elements" :setting="setting.elements" />

        <bz-items v-model="data.items" :cols="1" :shadow="false">
          <template slot-scope="{ item, index }">
            <div class="bz-event-item-row">
              <div class="bz-event-image">
                <bz-image :ratio="2 / 3" v-model="data.items[index].image" />
              </div>

              <div class="bz-event-date" v-if="setting.listElements.date">
                <!-- <bz-date v-model="data.items[index].date" :variant="2" /> -->
                <div class="bz-el--date-root">
                  <div class="bz-text-date">
                    <div class="bz-ee-date">
                      <bz-text v-model="data.items[index].day" :mb="0" />
                    </div>
                    <div class="bz-ee-month">
                      <bz-text v-model="data.items[index].month" :mb="0" />
                    </div>
                    <div class="bz-ee-year">
                      <bz-text v-model="data.items[index].year" :mb="0" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="bz-event-venue" v-if="setting.listElements.venue">
                <bz-text v-model="data.items[index].venue" :mb="0" />
              </div>

              <div class="bz-event-location" v-if="setting.listElements.location">
                <bz-text v-model="data.items[index].location" :mb="0" />
              </div>
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
import BzTextElement from '../../components/section/BzTextElement'
import BzItems from '../../components/section/BzItems'
import BzImage from '../../components/section/BzImage'
import BzDate from '../../components/section/BzDate'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzText from '../../components/section/BzText'

export default {
  mixins: [sectionMixin],
  components: { BzText, BzSubtitle, BzDate, BzImage, BzItems, BzTextElement, BzContainer, BzBackground }
}
</script>
<style lang="scss" scoped>
.bz-sec--event-2-root {
  .bz-event-item-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    margin: 1rem -15px;
    min-height: 48px;

    .bz-event-image,
    .bz-event-date,
    .bz-event-venue,
    .bz-event-location {
      padding-left: 15px;
      padding-right: 15px;
    }

    .bz-event-image {
      flex: 1 1 15%;
      img {
        border-radius: 4px;
      }
    }

    .bz-event-date {
      flex: 1 1 20%;
      color: var(--bz-secondary-color);
    }

    .bz-event-venue {
      flex: 1 1 20%;
    }

    .bz-event-location {
      flex: 1 1 20%;
    }
  }
}
</style>
