import '../theme/index.scss'
import EbQrcodeScanner from '../components/eb-qrcode-scanner/src/EbQrcodeScanner.vue'
import EbButton from '../components/eb-button/src/main.vue'
import { ref } from 'vue'

export default {
  title: 'EBLib-UI/Complex/EbQrcodeScanner',
  component: EbQrcodeScanner,
  tags: ['autodocs'],
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
  render: (args) => ({
    components: { EbQrcodeScanner, EbButton },
    setup() {
      const code = ref(null)
      const show = ref(false)
      return { args, code, show };
    },
    methods: {
      handleQrcodeScanned(code) {
        this.code = code
        this.show = false
      }
    },
    template: `
      <eb-button plain @click="show = true">Scan</eb-button><br>
      <span><strong>Scan Result</strong>: {{code}}</span>
      <div v-if="show" style="width: 414px; height: 896px">
        <eb-qrcode-scanner @onScanned="handleQrcodeScanned" />
      </div>
    `
  })
};

export const Default = {
  args: {}
};
