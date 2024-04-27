<template>
  <eb-row :gutter="15">
    <eb-col :span="12" sm="24">
      <eb-example title="EbButton">
        <eb-button v-for="type of btnTypes" :key="type" :type="type">
          {{ $format.toCamelCase(type, true) }}
        </eb-button>
      </eb-example>
    </eb-col>
    <eb-col :span="12" sm="24">
      <eb-example title="EbButton - plain">
        <eb-button v-for="type of btnTypes" :key="type" :type="type" plain>
          {{ $format.toCamelCase(type, true) }}
        </eb-button>
      </eb-example>
    </eb-col>
  </eb-row>
  <eb-example title="EbButton - text">
    <eb-button v-for="type of btnTypes" :key="type" :type="type" text>
      {{ $format.toCamelCase(type, true) }}
    </eb-button>
  </eb-example>
  <eb-example title="EbButton - round">
    <eb-button v-for="type of btnTypes" :key="type" :type="type" round>
      {{ $format.toCamelCase(type, true) }}
    </eb-button>
  </eb-example>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      btnTypes: ['info', 'primary', 'success', 'warning', 'danger']
    }
  }
}
</script>
