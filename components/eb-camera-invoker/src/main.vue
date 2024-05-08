<template>
  <div class="eb-camera-invoker">
    <slot>
      <eb-button>Take Picture</eb-button>
    </slot>
    <input ref="input" type="file" accept="image/*" @change="handleChange()" capture="camera"/>
  </div>
</template>

<script>
import EbButton from '../../eb-button/src/main.vue'

export default {
  name: 'EbCameraInvoker',
  props: {
    format: {
      type: String,
      default: 'binary'
    }
  },
  components: { EbButton },
  emits: ['onPhotoTaken'],
  methods: {
    async handleChange() {
      let result = await ((fileInfo) => {
        const reader = new FileReader()
        switch(this.foramt) {
          case 'base64':
            reader.readAsDataURL(fileInfo)
            break
          case 'binary':
          default:
            reader.readAsArrayBuffer(fileInfo)
            break
        }
        return new Promise(resolve => reader.onloadend = () => resolve(reader.result))
      }) (this.$refs.input.files[0])

      this.$emit('onPhotoTaken', result)
    }
  }
}
</script>

<style lang="scss">
.eb-camera-invoker {
  position: relative;
  display: inline-block;

  input[type="file"] {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
    opacity: 0;
  }
}
</style>
