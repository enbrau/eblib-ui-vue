<template>
  <div :class="classNames" :style="style">
    <slot></slot>
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'EbCol',
  setup() {
    const gutter = parseInt(inject('gutter') || 0)
    return {
      gutter
    }
  },
  props: {
    span: {
      type: [Number, String],
      default: 0
    },
    xs: {
      type: [Number, String],
      default: 0
    },
    sm: {
      type: [Number, String],
      default: 0
    },
    md: {
      type: [Number, String],
      default: 0
    },
    lg: {
      type: [Number, String],
      default: 0
    },
    xl: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    classNames() {
      return {
        'eb-col': true,
        [`eb-col-${this.span}`]: this.span > 0,
        [`eb-col-xs-${this.xs}`]: this.xs > 0,
        [`eb-col-sm-${this.sm}`]: this.sm > 0,
        [`eb-col-md-${this.md}`]: this.md > 0,
        [`eb-col-lg-${this.lg}`]: this.lg > 0,
        [`eb-col-xl-${this.xl}`]: this.xl > 0,
        'is-guttered': this.gutter > 0
      }
    },
    style() {
      return {
        paddingLeft: this.gutter / 2 + 'px',
        paddingRight: this.gutter / 2 + 'px'
      }
    }
  }
}
</script>

<style lang="scss">
.eb-col {

}

@for $i from 1 through 24 {
  .eb-col-#{$i} {
    max-width: #{$i / 24 * 100%};
    flex: 0 0 #{$i / 24 * 100%};

    &.is-guttered {
      display: block;
    }
  }

  @media only screen and (max-width: 767px) {
    .eb-col-xs-#{$i} {
      max-width: #{$i / 24 * 100%};
      flex: 0 0 #{$i / 24 * 100%};

      &.is-guttered {
        display: block;
      }
    }
  }

  @media only screen and (max-width: 991px) {
    .eb-col-sm-#{$i} {
      max-width: #{$i / 24 * 100%};
      flex: 0 0 #{$i / 24 * 100%};

      &.is-guttered {
        display: block;
      }
    }
  }

  @media only screen and (max-width: 1119px) {
    .eb-col-md-#{$i} {
      max-width: #{$i / 24 * 100%};
      flex: 0 0 #{$i / 24 * 100%};

      &.is-guttered {
        display: block;
      }
    }
  }

  @media only screen and (max-width: 1919px) {
    .eb-col-lg-#{$i} {
      max-width: #{$i / 24 * 100%};
      flex: 0 0 #{$i / 24 * 100%};

      &.is-guttered {
        display: block;
      }
    }
  }

  @media only screen and (min-width: 1920px) {
    .eb-col-xl-#{$i} {
      max-width: #{$i / 24 * 100%};
      flex: 0 0 #{$i / 24 * 100%};

      &.is-guttered {
        display: block;
      }
    }
  }
}
</style>
