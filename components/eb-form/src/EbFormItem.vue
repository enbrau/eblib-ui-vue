<template>
  <div :class="classNames">
    <div v-if="finalLabelPosition !== 'inner'" class="eb-form-item--label-wrapper" :style="{ width: finalLabelWidth }">
      <label class="el-form-item--label">
        {{ finalLabel }}
      </label>
    </div>
    <div class="eb-form-item--content">
      <slot></slot>
    </div>
	</div>
</template>

<script>
import { defineComponent, inject, provide, computed, watch } from 'vue'
import { FORM, FORM_ITEM, createItemStore } from './form.js'

export default defineComponent({
  name: 'EbFormItem',
  props: {
    /**
     * Content of label
     */
    label: {
      type: String,
      default: null
    },
    /**
     * Style of label
     */
    labelPosition: {
      type: String,
      default: 'inner'
    },
    /**
     * 
     */
    labelWidth: {
      type: Number,
      default: 120
    }
  },
  setup(props) {
    const formStore = inject(FORM.STORE)

    const itemStore = createItemStore()
    itemStore.dispatch('setLabel', props.label)

    const finalLabelPosition = computed(() => {
      return props.labelPosition || formStore.state.labelPosition || 'inner'
    })

    watch(finalLabelPosition, value => {
      itemStore.dispatch('setLabelPosition', value)
    })
    
    const finalLabelWidth = computed(() => {
      return (props.labelWidth || formStore.state.labelWidth) + 'px'
    })

    watch(finalLabelWidth, value => {
      itemStore.dispatch('setLabelWidth', value)
    })

    const finalLabel = computed(() => {
      return itemStore.state.label || props.label
    })

    const classNames = computed(() => {
      return {
        'eb-form-item': true,
        [finalLabelPosition.value]: true
      }
    })

    provide(FORM_ITEM.STORE, itemStore)

    return {
      finalLabelPosition,
      finalLabelWidth,
      finalLabel,
      classNames
    }
  }
})
</script>

<style lang="scss">
.eb-form-item {
  display: flex;
  margin-bottom: 18px;

  .eb-form-item--label-wrapper {
    display: flex;
    align-content: center;
    justify-content: flex-start;

    label {
      height: 32px;
      line-height: 32px;
      padding: 0 12px 0 0;
    }
  }

  &.right {
    .eb-form-item--label-wrapper {
      justify-content: flex-end;
    }
  }

  &.top {
    flex-direction: column;
  }

  &.inner {
    .eb-form-item--label-wrapper {
      display: none;
    }
  }

  .eb-form-item--content {
    flex-wrap: wrap;
    align-items: center;
    flex-grow: 1;
  }
}
</style>
