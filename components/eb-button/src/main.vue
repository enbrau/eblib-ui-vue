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
  },
  methods: {
    handleClick(event) {
      if (this.disabled)  {
        return
      }

      this.$emit('click')
    
      const btn = this.$refs.btn

      const circle = document.createElement('span')
      const diameter = Math.max(btn.clientWidth, btn.clientHeight)
      const radius = diameter / 2

      circle.style.width = circle.style.height = `${diameter}px`
      circle.style.left  = `${event.clientX - btn.offsetLeft - radius}px`
      circle.style.right = `${event.clientY - btn.offsetTop - radius}px`
      circle.classList.add('wave')

      const oldWave = btn.getElementsByClassName('wave')[0]

      if (oldWave) {
        oldWave.remove()
      }

      btn.appendChild(circle)
    }
  }
}
</script>

<style lang="scss">
$colors: primary, success, danger, warning, info;

.eb-button {
  position: relative;
  display: inline-flex;
  overflow: hidden;
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

      &.is-plain {
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

        .wave {
          background-color: var(--eb-color-info);
        }
      }

      .wave {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: wave 600ms linear;
        background-color: var(--eb-color-#{$color});
        opacity: .7;
      }
    }
  }
}

.eb-button+.eb-button {
  margin-left: 10px;
}

@keyframes wave {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
</style>
