<template>
  <div :class="classNames" @click.prevent="$emit('click')">
    <span>
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'EbButton',
  emits: ['click'],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    plain: {
      type: Boolean,
      default: false
    },
    text: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'info'
    }
  },
  computed: {
    classNames() {
      return {
        'eb-button': true,
        [`eb-button--${this.type}`]: true,
        'is-disabled': this.disabled,
        'is-text': this.text,
        'is-plain': this.plain,
        'is-round': this.round
      }
    }
  }
}
</script>

<style lang="scss">
$colors: primary, success, danger, warning, info;

.eb-button {
  display: inline-flex;
  height: 36px;
  padding: 0 15px;
  align-items: center;
  justify-content: center;
  vertical-align: top;
  white-space: nowrap;
  border-radius: 2px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: ease-in-out .3s;

  &.is-round {
    border-radius: 18px;
  }

  @each $color in $colors {
    &.eb-button--#{$color} {
      color: #fff;
      border-color: var(--eb-color-#{$color});
      background-color: var(--eb-color-#{$color});

      &:hover {
        background-color: var(--eb-color-#{$color}-light5);
        border-color: var(--eb-color-#{$color}-light5);
      }

      &.is-plain {
        color: var(--eb-color-#{$color});
        background-color: transparent;

        &:hover {
          background-color: var(--eb-color-#{$color}-light9);
        }
      }

      &.is-text {
        color: var(--eb-color-#{$color});
        background-color: transparent;
        border-color: transparent;

        &:hover {
          background-color: var(--eb-color-info-light9);
          border-color: var(--eb-color-info-light9);
        }
      }
    }
  }
}

.eb-button+.eb-button {
  margin-left: 10px;
}
</style>
