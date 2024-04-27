<template>
  <div class="eb-example">
    <div class="eb-example__header">
      <slot name="header">
        {{ title }}
      </slot>
    </div>
    <div class="eb-example__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EbExample',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.eb-example {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--eb-border-color);

  &__header {
    padding: 5px 10px;
    border-bottom: 1px solid var(--eb-border-color);
  }

  &__body {
    padding: 10px 10px;
  }
}
</style>
