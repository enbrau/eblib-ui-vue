import { fn } from '@storybook/test'

import '../theme/index.scss'
import EbCameraInvoker from '../components/eb-camera-invoker/src/main.vue'
import { ref } from 'vue';

export default {
  title: 'EBLib-UI/Complex/EbCameraInvoker',
  component: EbCameraInvoker,
  tags: ['autodocs'],
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
  render: (args) => ({
    components: { EbCameraInvoker },
    setup() {
      const result = ref(null)
      return { args, result };
    },
    methods: {
      handlePhotoTaken(result) {
        this.result = result
      }
    },
    template: `
      <eb-camera-invoker @onPhotoTaken="handlePhotoTaken" /><br>
      {{ result }}
    `
  })
};

export const Default = {
  args: {}
};
