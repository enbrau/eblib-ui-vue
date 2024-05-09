import '../theme/index.scss'
import EbCamera from '../components/eb-camera/src/main.vue'

export default {
  title: 'EBLib-UI/Complex/EbCamera',
  component: EbCamera,
  tags: ['autodocs'],
  argTypes: {
    type: { control: { type: 'select' }, options: ['info', 'primary', 'danger', 'warning', 'success'] },
    animation: { control: { type: 'select' }, options: ['wave', 'ripple', ''] }
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
  render: (args) => ({
    components: { EbCamera },
    setup() {
      const types = ['info', 'primary', 'danger', 'warning', 'success']
      return { args, types };
    },
    template: `
      <div style="width: 414px; height: 896px">
        <eb-camera />
      </div>
    `
  })
};

export const Default = {
  args: {}
};
