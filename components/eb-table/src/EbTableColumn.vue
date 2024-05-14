<template>
  <div class="eb-table--hidden-columns" style="display: none;"></div>
</template>

<script>
import { defineComponent, inject } from 'vue'

export default defineComponent({
  name: 'EbTableColumn',
  props: {
    label: {
      type: String,
      default: null
    },
    prop: {
      type: String,
      default: null
    }
  },
  setup(props, { slots }) {
    const store = inject('EB_TABLE_STORE')

    store.dispatch('addColumn', {
      props, slots
    })

    return {
      store
    }
  }
})
</script>
