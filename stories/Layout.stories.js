import '../theme/index.scss'
import EbRow from '../components/eb-row/src/main.vue'
import EbCol from '../components/eb-col/src/main.vue'

export default {
  title: 'EBLib-UI/Basic/Layout',
  component: EbRow,
  subcomponents: { EbCol },
  tags: ['autodocs'],
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
  render: (args) => ({
    components: { EbCol, EbRow },
    setup() {
      return { args };
    },
    template: `
      <eb-row :gutter="10" style="height: 80px">
        <eb-col :span="12">
          <div class="eb-bordered dashed" style="height: 60px"></div>
        </eb-col>
        <eb-col :span="12">
          <div class="eb-bordered dashed" style="height: 60px"></div>
        </eb-col>
      </eb-row>
    `
  })
};

export const Simple = {};
