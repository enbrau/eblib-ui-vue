<template>
  <button ref="btn" :class="classNames" @click.prevent="handleClick">
    <slot name="loading">
      <span v-if="loading" class="eb-button--spinner"></span>
    </slot>
    <slot></slot>
  </button>
</template>

<script>
import { sizeSupport, typeSupport } from '../../mixin.ts'

export default {
  name: 'EbButton',
  emits: ['click'],
  mixins: [ sizeSupport, typeSupport ],
  props: {
    /**
     * determine whether it's in loading state
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * determine whether it's in disabled state
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * determine whether it's a plain button
     */
    plain: {
      type: Boolean,
      default: false
    },
    /**
     * determine whether it's a dashed button
     */
     dashed: {
      type: Boolean,
      default: false
    },
    /**
     * determine whether it's a text button
     */
    text: {
      type: Boolean,
      default: false
    },
    /**
     * determine whether it's a round button
     */
    round: {
      type: Boolean,
      default: false
    },
    animation: {
      type: [String, Boolean],
      default: 'wave',
      validator(value) {
        return ['wave', 'ripple', false].includes(value)
      }
    }
  },
  computed: {
    classNames() {
      return {
        'eb-button': true,
        [`eb-button--${this.type}`]: true,
        'eb-button--large': this.size === 'large',
        'eb-button--small': this.size === 'small',
        'is-disabled': this.disabled || this.loading,
        'is-text': this.text,
        'is-plain': this.plain || this.dashed,
        'is-round': this.round,
        'is-dashed': this.dashed,
        'is-loading': this.loading
      }
    }
  },
  methods: {
    handleClick(evt) {
      if (this.disabled || this.loading)  {
        return
      }

      this.$emit('click')

      const btn = this.$refs.btn
      playAnimation(btn, evt, this.animation)
    }
  }
}

function playAnimation(btn, evt, animation) {
  if (!animation) {
    return
  }

  let span = null
  let diameter, radius
  switch(animation) {
    case 'ripple':
      btn.style.overflow = 'hidden'
      span =  document.createElement('span')
      diameter = Math.max(btn.clientWidth + 2, btn.clientHeight + 2)
      radius = diameter / 2
      span.style.width  = `${diameter}px`
      span.style.height = `${diameter}px`
      span.style.left = `${evt.clientX - btn.offsetLeft - btn.clientWidth - radius}px`
      // span.style.top  = `${evt.clientY}px`
      break
    case 'wave':
      btn.style.overflow = 'unset'
      span =  document.createElement('span')
      break
  }

  if (span) {
    span.classList.add(animation)

    const old = btn.getElementsByClassName('wave')[0] || btn.getElementsByClassName('ripple')[0]
    if (old) {
      old.remove()
    }

    btn.appendChild(span)
  }
}
</script>

<style lang="scss">
$colors: primary, success, danger, warning, info;

.eb-button {
  position: relative;
  display: inline-flex;
  height: 32px;
  padding: 0 15px;
  font-size: 14px;
  align-items: center;
  justify-content: center;
  vertical-align: top;
  white-space: nowrap;
  border-radius: 2px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: ease-in-out .3s;

  &--large {
    font-size: 16px;
    height: 40px;
  }

  &--small {
    height: 24px;
  }

  &.is-round {
    border-radius: 18px;

    .wave {
      border-radius: 23px;
    }
  }

  &.is-disabled {
    cursor: not-allowed;
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

      &.is-disabled, &.is-disabled:hover {
        background-color:  var(--eb-color-#{$color}-light7);
        border-color: var(--eb-color-#{$color}-light7);
      }

      &.is-plain, &.is-dashed {
        color: var(--eb-color-#{$color});
        background-color: transparent;

        &:hover {
          background-color: var(--eb-color-#{$color}-light9);
        }

        &.is-disabled, &.is-disabled:hover {
          background-color: transparent;
          color: var(--eb-color-#{$color}-light7);
          border-color: var(--eb-color-#{$color}-light7);
        }
      }

      &.is-dashed {
        border-style: dashed;
      }

      &.is-text {
        color: var(--eb-color-#{$color});
        background-color: transparent;
        border-color: transparent;

        &:hover {
          background-color: var(--eb-color-info-light9);
          border-color: var(--eb-color-info-light9);
        }

        &.is-disabled, &.is-disabled:hover {
          background-color: transparent;
          border-color: transparent;
          color: var(--eb-color-#{$color}-light7);
        }

        .ripple {
          background-color: var(--eb-color-info);
        }
      }

      .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 600ms linear;
        background-color: var(--eb-color-#{$color});
      }

      .wave {
        position: absolute;
        transform: scale(1);
        top: -5px;
        bottom: -5px;
        left: -5px;
        right: -5px;
        animation: wave 800ms forwards;
        border: 5px solid var(--eb-color-#{$color});
        opacity: .2;
      }
    }
  }

  .eb-button--spinner {
    width: 0;
    height: 0;
    transform: .2s linear;
  }

  &.is-loading .eb-button--spinner {
    opacity: 1;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    position: relative;
    animation: rotate 1s linear infinite;
    margin-right: 5px;

    &::before {
      content: "";
      box-sizing: border-box;
      position: absolute;
      inset: 2px;
      border-radius: 50%;
      border: 1.5px solid #fff;
      animation: prixClipFix 2s linear infinite;
    }

    @keyframes rotate {
      100%   {transform: rotate(360deg)}
    }

    @keyframes prixClipFix {
      0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
      25%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
      50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
      75%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)}
      100% {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0)}
    }
  }

  &--large .eb-button--spinner {
    width: 16px;
    height: 16px;
  }

  &--small .eb-button--spinner {
    width: 12px;
    height: 12px;
  }

  @each $color in $colors {
    &.eb-button--#{$color}.is-disabled.is-plain .eb-button--spinner::before, 
    &.eb-button--#{$color}.is-disabled.is-text .eb-button--spinner::before {
      border-color: var(--eb-color-#{$color});
    }
  }
}

.eb-button+.eb-button {
  margin-left: 10px;
}

@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(2);
    opacity: .7;
  }
}

@keyframes wave {
  to {
    opacity: 0;
  }
}
</style>
