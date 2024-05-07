import { fn } from '@storybook/test'

import '../theme/index.scss'
import EbButton from '../components/eb-button/src/main.vue'

export default {
  title: 'EBLib-UI/Basic/EbButton',
  component: EbButton,
  tags: ['autodocs'],
  argTypes: {
    type: { control: { type: 'select' }, options: ['info', 'primary', 'danger', 'warning', 'success'] },
    animation: { control: { type: 'select' }, options: ['wave', 'ripple', ''] }
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { click: fn() },
  render: (args) => ({
    components: { EbButton },
    setup() {
      return { args };
    },
    template: `
      <eb-button v-bind="args" type="info">Info</eb-button>
      <eb-button v-bind="args" type="primary">Primary</eb-button>
      <eb-button v-bind="args" type="success">Success</eb-button>
      <eb-button v-bind="args" type="warning">Warning</eb-button>
      <eb-button v-bind="args" type="danger">Danger</eb-button>
    `,
  })
};

export const Default = {
  args: {}
};
