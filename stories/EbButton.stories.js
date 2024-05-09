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
  args: {},
  render: (args) => ({
    components: { EbButton },
    setup() {
      const types = ['info', 'primary', 'danger', 'warning', 'success']
      return { args, types };
    },
    template: `
      <div>
        <eb-button v-for="type in types" :key="type" :type="type">{{type}}</eb-button>
      </div>
      <div style="margin-top: 10px">
        <eb-button v-for="type in types" :key="type" :type="type" disabled>{{type}}</eb-button>
      </div>
    `
  })
};

export const Default = {
  args: {}
};

export const Plain = {
  args: {},
  render: (args) => ({
    components: { EbButton },
    setup() {
      const types = ['info', 'primary', 'danger', 'warning', 'success']
      return { args, types };
    },
    template: `
      <div>
        <eb-button v-for="type in types" :key="type" :type="type" plain>{{type}}</eb-button>
      </div>
      <div style="margin-top: 10px">
        <eb-button v-for="type in types" :key="type" :type="type" plain disabled>{{type}}</eb-button>
      </div>
    `
  })
};

export const Round = {
  args: {},
  render: (args) => ({
    components: { EbButton },
    setup() {
      const types = ['info', 'primary', 'danger', 'warning', 'success']
      return { args, types };
    },
    template: `
      <div>
        <eb-button v-for="type in types" :key="type" :type="type" round>{{type}}</eb-button>
      </div>
      <div style="margin-top: 10px">
        <eb-button v-for="type in types" :key="type" :type="type" round disabled>{{type}}</eb-button>
      </div>
    `
  })
};

export const Text = {
  args: {},
  render: (args) => ({
    components: { EbButton },
    setup() {
      const types = ['info', 'primary', 'danger', 'warning', 'success']
      return { args, types };
    },
    template: `
      <div>
        <eb-button v-for="type in types" :key="type" :type="type" text>{{type}}</eb-button>
      </div>
      <div style="margin-top: 10px">
        <eb-button v-for="type in types" :key="type" :type="type" text disabled>{{type}}</eb-button>
      </div>
    `
  })
};