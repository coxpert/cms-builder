<template>
  <div class="bz-section-container bz-sec--event-1-root" :class="{ [breakPoint]: true }" :data-section="section.sectionUUID">
    <bz-background :setting="background" :size="sectionSize" :bzAnimationClass="setting.animationClass">
      <bz-container>
        <bz-text-element v-model="data.elements" :setting="setting.elements" />

        <bz-items v-model="data.items" :cols="1" :shadow="false" :spacing="false">
          <template slot-scope="{ item, index }">
            <div class="bz-event-item-row">
              <div class="bz-event-image" v-if="setting.listElements.image">
                <bz-image :ratio="2 / 3" v-model="data.items[index].image" />
              </div>

              <div class="bz-event-date" v-if="setting.listElements.date">
                <!-- <bz-date v-model="data.items[index].date" /> -->
                <div class="bz-el--date-root">
                  <div class="bz-text-date">
                    <bz-text v-model="data.items[index].date" :mb="0" />
                  </div>
                </div>
              </div>

              <div class="bz-event-venue" v-if="setting.listElements.venue">
                <bz-subtitle v-model="data.items[index].venue" :mb="0" />
              </div>

              <div class="bz-event-location" v-if="setting.listElements.location">
                <bz-subtitle v-model="data.items[index].location" :mb="0" />
              </div>

              <div class="bz-event-tickets" v-if="setting.listElements.buttons">
                <bz-button v-model="item.button" />
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
import BzTextElement from '../../components/section/BzTextElement'
import BzText from '../../components/section/BzText'
import BzButtonGroup from '../../components/section/BzButtonGroup'
import BzTitle from '../../components/section/BzTitle'
import BzContainer from '../../components/section/BzContainer'
import BzItems from '../../components/section/BzItems'
import BzImage from '../../components/section/BzImage'
import BzDate from '../../components/section/BzDate'
import BzSubtitle from '../../components/section/BzSubtitle'
import BzButton from '../../components/section/BzButton'

export default {
  mixins: [sectionMixin],
  components: {
    BzButton,
    BzSubtitle,
    BzDate,
    BzImage,
    BzItems,
    BzContainer,
    BzTitle,
    BzButtonGroup,
    BzText,
    BzTextElement,
    BzBackground
  }
}
</script>
<style lang="scss">
.bz-sec--event-1-root {
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
    .bz-event-location,
    .bz-event-tickets {
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
      font-weight: bold;
      color: var(--bz-secondary-color);

      .bz-ee-date {
        font-size: 26px;
        font-weight: bold;
      }
    }

    .bz-event-venue {
      flex: 1 1 20%;
      font-weight: bold;
    }

    .bz-event-location {
      flex: 1 1 20%;
      font-weight: bold;
    }

    .bz-event-tickets {
      flex: 1 1 10%;
      font-weight: bold;
    }
  }
}
</style>
