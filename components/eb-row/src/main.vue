<template>
  <div class="eb-row" :style="{'margin-left': -gutter / 2 + 'px', 'margin-right': -gutter / 2 + 'px'}">
    <slot></slot>
  </div>
</template>

<script>
import { provide } from 'vue'

export default {
  name: 'EbRow',
  setup(props) {
    provide('gutter', props.gutter)
  },
  props: {
    gutter: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss">
.eb-row {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  box-sizing: border-box;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
