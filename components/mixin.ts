export const sizeSupport = {
  props: {
    /**
     * component size
     */
    size: {
      type: String,
      default: 'default',
      validator(value: string): boolean {
        return ['small', 'default', 'large'].includes(value)
      }
    }
  }
}

export const typeSupport = {
  props: {
    /**
     * component type
     */
    type: {
      type: String,
      derault: 'primary',
      validator(value: string): boolean {
        return ['info', 'primary', 'success', 'warning', 'danger'].includes(value)
      }
    }
  }
}

export const modelValueSupportString = {
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String
    }
  }
}

export const modelValueSupportNumber = {
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Number
    }
  }
}

export const modelValueSupportBoolean = {
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Boolean
    }
  }
}
