<template>
  <div class="w-100 bz-drag-drop-items-container">
    <div class="list no-gutters" :class="{ 'bz-grid': grid, 'bz-row': !grid }" :style="{ flexDirection: reverse ? 'row-reverse' : 'row' }">
      <sortable
        v-for="(item, index) in data"
        :key="index"
        v-model="dragData"
        :index="index"
        :class="getColsClass(index)"
        :style="getStyles(index)"
        @sortEnd="sortEnd($event)"
        @remove="removeItem"
      >
        <div class="w-100" :class="{ spacing: spacing }">
          <div class="w-100 h-100" :class="{ 'bz-shadow': spacing && shadow }" :style="cardStyle(index)">
            <slot :item="item" :index="index" />
          </div>
        </div>
      </sortable>
    </div>
    <div v-if="edit && showAddItem" class="w-100 d-flex justify-content-center">
      <button class="btn-add-item" @click.prevent="addItem()">Add Item</button>
    </div>
  </div>
</template>

<script>
import Sortable from './DragSortable'
import { cloneDeep } from 'lodash'
import elementMixin from '../../mixins/elementMixin'

export default {
  name: 'BzItems',
  components: {
    Sortable
  },
  mixins: [elementMixin],
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    cols: {
      type: Number,
      default: 3
    },
    grid: {
      type: Boolean,
      default: false
    },
    shadow: {
      type: Boolean,
      default: true
    },
    spacing: {
      type: Boolean,
      default: true
    },
    categoryName: {
      type: String,
      default: 'gallery'
    },
    styles: {
      type: [Function, Object],
      default: () => {
        return {}
      }
    },
    reverse: {
      type: Boolean,
      default: false
    },
    showAddItem: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      dragData: {}
    }
  },
  computed: {
    data: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    cardStyle(index) {
      if (typeof this.styles === 'function') {
        return this.styles(index).card
      } else {
        return this.styles.card
      }
    },
    getColsClass() {
      if (!this.grid) {
        return { ['col-lg-' + 12 / this.cols]: true }
      }
    },
    getStyles(index) {
      if (this.grid) {
        if (index % 10 === 9) {
          return {
            gridRow: `${(Math.floor(index / 10) + 1) * 4 - 1} / span 2`
          }
        }
      }
    },
    sortEnd(e) {
      const { oldIndex, newIndex } = e
      const temp = this.data[newIndex]
      this.data[newIndex] = this.data[oldIndex]
      this.data[oldIndex] = temp
      this.data = cloneDeep(this.data)
    },
    addItem() {
      this.data.push(this.data[window.getRandomInt(this.data.length - 1)])
      this.data = cloneDeep(this.data)
    },
    removeItem(index) {
      if (this.data.length > 1) {
        this.data.splice(index, 1)
        this.data = cloneDeep(this.data)
      }
    }
  }
}
</script>

<style lang="scss">
.bz-drag-drop-items-container {
  .spacing {
    padding: 10px;
  }

  .bz-shadow {
    box-shadow: rgb(0 0 0 / 24%) 0px 0.5rem 1rem -0.25rem !important;
  }

  .btn-add-item {
    background-color: #0069d9;
    border: none;
    outline: none;
    color: white;
    border-radius: 4px;
    padding: 5px 10px;
    margin-bottom: 10px;
    margin-top: 10px;
    &:hover {
      background-color: #014fa5;
    }
  }
}
</style>
