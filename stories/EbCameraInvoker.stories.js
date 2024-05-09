import '../theme/index.scss'
import EbCameraInvoker from '../components/eb-camera-invoker/src/main.vue'

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
      return { args };
    },
    methods: {
      handlePhotoTaken(result) {
        console.log(result)
        alert('photo taken')
      }
    },
    template: `
      <eb-camera-invoker @onPhotoTaken="handlePhotoTaken" />
    `
  })
};

export const Default = {
  args: {}
};
