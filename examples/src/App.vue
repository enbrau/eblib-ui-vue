<template>
  <eb-row :gutter="15">
    <eb-col :span="12" sm="24">
      <eb-example title="EbButton">
        <eb-row :gutter="20">
          <eb-col :span="24">
            <eb-button v-for="type of btnTypes" :key="type" :type="type">
              {{ $format.toCamelCase(type, true) }}
            </eb-button>
          </eb-col>
          <eb-col :span="24" style="margin-top: 10px;">
            <eb-button v-for="type of btnTypes" :key="type" :type="type" disabled>
              {{ $format.toCamelCase(type, true) }}
            </eb-button>
          </eb-col>
        </eb-row>
      </eb-example>
    </eb-col>
    <eb-col :span="12" sm="24">
      <eb-example title="EbButton - plain">
        <eb-row :gutter="20">
          <eb-col :span="24">
            <eb-button v-for="type of btnTypes" :key="type" :type="type" plain>
              {{ $format.toCamelCase(type, true) }}
            </eb-button>
          </eb-col>
          <eb-col :span="24" style="margin-top: 10px;">
            <eb-button v-for="type of btnTypes" :key="type" :type="type" plain disabled>
              {{ $format.toCamelCase(type, true) }}
            </eb-button>
          </eb-col>
        </eb-row>
      </eb-example>
    </eb-col>
  </eb-row>
  <eb-example title="EbButton - text">
    <eb-row :gutter="20">
      <eb-col :span="24">
        <eb-button v-for="type of btnTypes" :key="type" :type="type" text>
          {{ $format.toCamelCase(type, true) }}
        </eb-button>
      </eb-col>
      <eb-col :span="24" style="margin-top: 10px;">
        <eb-button v-for="type of btnTypes" :key="type" :type="type" text disabled>
          {{ $format.toCamelCase(type, true) }}
        </eb-button>
      </eb-col>
    </eb-row>
  </eb-example>
  <eb-example title="EbButton - round">
    <eb-row :gutter="20">
      <eb-col :span="24">
        <eb-button v-for="type of btnTypes" :key="type" :type="type" round>
          {{ $format.toCamelCase(type, true) }}
        </eb-button>
      </eb-col>
      <eb-col :span="24" style="margin-top: 10px;">
        <eb-button v-for="type of btnTypes" :key="type" :type="type" round disabled>
          {{ $format.toCamelCase(type, true) }}
        </eb-button>
      </eb-col>
    </eb-row>
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
