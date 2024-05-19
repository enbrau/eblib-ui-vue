import '../theme/index.scss'

import { EbForm, EbFormItem, EbInput } from '../components'

import { ref } from 'vue'

export default {
  title: 'EBLib-UI/Data Input/EbForm',
  component: EbForm,
  tags: ['autodocs'],
  argTypes: {
    formLabelPosition: { control: { type: 'select' }, options: ['left', 'right', 'top', 'inner'] },
    formLabelWidth: { control: { type: 'number' } },
    labelPosition: { control: { type: 'select' }, options: ['left', 'right', 'top', 'inner'] },
    labelWidth: { control: { type: 'number' } } 

  },
  args: {
    formLabelPosition: 'left',
    labelPosition: null
  },
  render: (args) => ({
    components: { EbForm, EbFormItem, EbInput },
    setup() {
      const formData = ref({
        actName: null
      })
      const formRules = {}

      return { args, formData, formRules };
    },
    template: `
      <eb-form :model="formData" :rules="formRules" :label-position="args.formLabelPosition" :label-width="args.formLabelWidth">
        <eb-form-item label="Activity name" :label-position="args.labelPosition" :label-width="args.labelWidth">
          <eb-input v-model="formData.actName" placeholder="please enter activity name" />
        </eb-form-item>
      </eb-form>
    `
  })
}

export const Default = {
  args: {}
}
