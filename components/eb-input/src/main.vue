<template>
  <div class="eb-input">
    <label class="legend-top">
      <input :value="value" :placeholder="finalPlaceholder" />
      <span v-if="showLabel">{{ finalLabel }}</span>
    </label>
  </div>
</template>

<script>
import { inject, computed } from 'vue'
import { FORM_ITEM } from '../../eb-form/src/form.js'

export default {
  name: 'EbInput',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: 'default'
    }
  },
  setup(props) {
    const itemStore = inject(FORM_ITEM.STORE, null)

    if (itemStore && props.label) {
      itemStore.dispatch('setLabel', props.label)
    }

    const finalLabel = computed(() => {
      return itemStore ? itemStore.state.label : null || props.label
    })

    const finalPlaceholder = computed(() => {
      return (finalLabel.value || props.placeholder) ?
              (finalLabel.value ? `${finalLabel.value}` : '') + (props.placeholder ? (finalLabel.value ? ', ' : '') + props.placeholder : '') :
              null
    })

    const showLabel = computed(() => {
      return !itemStore || itemStore.state.labelPosition === 'inner'
    })

    return {
      finalLabel,
      finalPlaceholder,
      showLabel
    }
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>

<style lang="scss">
.eb-input {
  display: flex;
  height: 32px;
  border-radius: 4px;
  border: 1px solid var(--eb-border-color);
  flex-direction: row;
  align-content: center;

  .legend-top {
    display: flex;
    position: relative;
    flex-grow: 1;
    align-content: center;

    input {
      display: flex;
      flex-grow: 1;
      -moz-appearance: none;
      appearance: none;
      -webkit-appearance: none;
      border: none;
      background-color: transparent;
      outline: none;
      margin: auto 10px;

      &:not(:placeholder-shown) ~ span {
        opacity: 1;
        font-size: 12px;
        top: -10px;
        left: 8px;
        background: var(--eb-bg-color);
        padding: 0 2px;
      }
    }

    span {
      position: absolute;
      left: 10px;
      top: 5px;
      opacity: 0;
      color: var(--eb-text-color-placeholder);
      transition: all 0.15s ease-in-out;
    }
  }
}
</style>
