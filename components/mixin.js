export const sizeSupport = {
  props: {
    /**
     * component size
     */
    size: {
      type: String,
      default: 'default',
      validator(value) {
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
      validator(value) {
        return ['info', 'primary', 'success', 'warning', 'danger'].includes(value)
      }
    }
  }
}
