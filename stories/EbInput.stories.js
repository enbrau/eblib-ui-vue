import '../theme/index.scss'

import EbInput from '../components/eb-input/src/main.vue'

import { ref } from 'vue'

export default {
  title: 'EBLib-UI/Data Input/EbInput',
  component: EbInput,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  render: (args) => ({
    components: { EbInput },
    setup() {
      const name = ref('')
      return { args, name };
    },
    template: `
      <eb-input v-model="name" label="Username" placeholder="you can use email as well." />
    `
  })
}

export const Default = {
  args: {}
}
