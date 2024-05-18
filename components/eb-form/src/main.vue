<template>
  <form class="eb-form">
    <slot></slot>
  </form>
</template>

<script>
import { defineComponent, provide, watch } from 'vue'
import { createStore, FORM } from './form.js'

export default defineComponent({
  name: 'EbForm',
  props: {
    /**
     * Data of form component.
     */
    model: {
      type: Object,
      default: () => {}
    },
    /**
     * Position of label
     * If set to 'left' or 'right', label-width prop is also required.
     */
    labelPosition: {
      type: String,
      default: 'inner'
    },
    /**
     * Width of label
     * e.g. '50px'. All its direct child form items will inherit this value. auto is supported.
     */
    labelWidth: {
      type:[Number, String],
      default: null
    },
    /**
     * Validation rules of form.
     */
     rules: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const store = createStore()
    store.dispatch('setLabelPosition', props.labelPosition)
    store.dispatch('setLabelWidth', props.labelWidth)

    watch(() => props.labelPosition, value => {
      store.dispatch('setLabelPosition', value)
    })

    watch(() => props.labelWidth, value => {
      store.dispatch('setLabelWidth', value)
    })

    provide(FORM.STORE, store)

    return {}
  }
})
</script>
