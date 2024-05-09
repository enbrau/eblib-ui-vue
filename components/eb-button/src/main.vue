<template>
  <div ref="btn" :class="classNames" @click.prevent="handleClick">
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
    dashed: {
      type: Boolean,
      default: false
    },
    /**
     * type of the button
     */
    type: {
      type: String,
      default: 'primary'
    },
    animation: {
      type: String,
      default: 'wave'
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
        'is-round': this.round,
        'is-dashed': this.dashed
      }
    }
  },
  methods: {
    handleClick(evt) {
      if (this.disabled)  {
        return
      }

      this.$emit('click')

      const btn = this.$refs.btn
      playAnimation(btn, evt, this.animation)
    }
  }
}

function playAnimation(btn, evt, animation) {
  let span = null
  let diameter, radius
  switch(animation) {
    case 'ripple':
      btn.style.overflow = 'hidden'
      span =  document.createElement('span')
      diameter = Math.max(btn.clientWidth, btn.clientHeight)
      radius = diameter / 2
      span.style.width = span.style.height = `${diameter}px`
      span.style.left  = `${evt.clientX - btn.offsetLeft - radius}px`
      span.style.right = `${evt.clientY - btn.offsetTop - radius}px`
      break
    case 'wave':
      span =  document.createElement('span')
      break
  }
  if (span) {
    span.classList.add(animation)

    const old = btn.getElementsByClassName(animation)[0]
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
        transform: scale(1);
        animation: ripple 600ms forwards;
        background-color: var(--eb-color-#{$color});
        opacity: .7;
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
        opacity: .3;
      }
    }
  }
}

.eb-button+.eb-button {
  margin-left: 10px;
}

@keyframes ripple {
  to {
    transform: scale(2.5);
    opacity: 0;
  }
}

@keyframes wave {
  to {
    opacity: 0;
  }
}
</style>
