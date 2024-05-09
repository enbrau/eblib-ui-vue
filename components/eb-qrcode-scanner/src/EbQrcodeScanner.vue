<template>
  <div class="eb-qrcode-scanner" ref="wrapper">
    <div class="eb-qrcode-scanner--cover">
      <p class="line"></p>
      <span class="square top left"></span>
      <span class="square top right"></span>
      <span class="square bottom right"></span>
      <span class="square bottom left"></span>
      <p class="tips">tips</p>
    </div>
    <video v-show="showPlay" ref="video" :width="width" :height="height" controls></video>
    <canvas v-show="!showPlay" ref="canvas" />
    <button v-show="showPlay" @click="run">开始</button>
  </div>
</template>

<script>
import { ref } from 'vue'
// eslint-disable-next-line no-unused-vars
import adapter from 'webrtc-adapter'
import jsQR from 'jsqr'

export default {
  name: 'EbQrcodeScanner',
  emits: ['onError', 'onScanned'],
  props: {
    useBackCamera: {
      type: Boolean,
      default: true
    },
    drawOnfound: {
      type: Boolean,
      default: true
    },
    stopOnScanned: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const showPlay = ref(false)
    const width  = ref(0) 
    const height = ref(0)
    const active = ref(true)
    const canvasContext = ref(null)
    return { showPlay, width, height, active, canvasContext }
  },
  mounted() {
    this.init()
  },
  beforeUnmount() {
    this.stop()
  },
  watch: {
    active: {
      handler(active) {
        if (!active) {
          this.stop()
        }
      },
      immdeiate: true
    }
  },
  methods: {
    init() {
      const wrapper = this.$refs.wrapper
      this.width  = wrapper.clientWidth
      this.height = wrapper.clientHeight

      this.$refs.canvas.width  = this.width
      this.$refs.canvas.height = this.height
      this.canvasContext = this.$refs.canvas.getContext('2d')

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const facingMode = this.useBackCamera ? { exact: 'environment' } : 'user'

        const handleSuccess = stream => {
          if (this.$refs.video.srcObject !== undefined) {
            this.$refs.video.srcObject = stream
          } else if (window.videoEl.mozSrcObject !== undefined) {
            this.$refs.video.mozSrcObject = stream
          } else if (window.URL.createObjectURL) {
            this.$refs.video.src = window.URL.createObjectURL(stream)
          } else if (window.webkitURL) {
            this.$refs.video.src = window.webkitURL.createObjectURL(stream)
          } else {
            this.$refs.video.src = stream
          }

          this.$refs.video.playsInline = true

          const playPromise = this.$refs.video.play()
          playPromise.catch(() => (
            this.showPlay = true
          ))
          playPromise.then(() => {
            if (this.active) {
              requestAnimationFrame(tick)
            }
          })
        }

        const tick = () => {
          if (this.$refs.video && this.$refs.video.readyState === this.$refs.video.HAVE_ENOUGH_DATA) {
            this.canvasContext.drawImage(this.$refs.video, 0, 0, this.$refs.canvas.width, this.$refs.canvas.height)
            const imageData = this.canvasContext.getImageData(0, 0, this.$refs.canvas.width, this.$refs.canvas.height)

            let code = null
            try {
              code = jsQR(imageData.data, imageData.width, imageData.height);
            } catch (e) {
              console.error(e);
            }

            if (code) {
              if (this.drawOnfound) {
                const location = code.location
                drawLine(location.topLeftCorner, location.topRightCorner);
                drawLine(location.topRightCorner, location.bottomRightCorner);
                drawLine(location.bottomRightCorner, location.bottomLeftCorner);
                drawLine(location.bottomLeftCorner, location.topLeftCorner);
              }
              this.active = this.stopOnScanned ? false : true
              this.$emit('onScanned', code.data)
            }
          }
          if (this.active) {
            requestAnimationFrame(tick)
          }
        }

        const drawLine = (begin, end) => {
          this.canvasContext.beginPath()
          this.canvasContext.moveTo(begin.x, begin.y)
          this.canvasContext.lineTo(end.x, end.y)
          this.canvasContext.lineWidth = this.lineWidth
          this.canvasContext.strokeStyle = this.lineColor
          this.canvasContext.stroke()
        }

        navigator.mediaDevices
          .getUserMedia({ video: { facingMode } })
          .then(handleSuccess)
          .catch(() => {
            navigator.mediaDevices
              .getUserMedia({ video: true })
              .then(handleSuccess)
              .catch(error => {
                this.$emit('onError', error);
              })
          })
      }
    },
    stop () {
      if (this.$refs.video && this.$refs.video.srcObject) {
        this.$refs.video.srcObject.getTracks().forEach(t => t.stop())
      }
    }
  }
}
</script>

<style lang="scss">
.eb-qrcode-scanner {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #000000;

  &--cover {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    height: 220px;
    width: 220px;
    border: .5px solid var(--eb-border-color);
    z-index: 9999;

    .line {
      position: absolute;
      width: 200px;
      height: 1px;
      margin: 0 10px;
      background: var(--eb-color-primary);
      background: linear-gradient(to right, transparent, var(--eb-color-primary), var(--eb-color-primary-light9), var(--eb-color-primary), transparent);
      -webkit-animation: scan 1.75s infinite linear;
      -moz-animation: scan 1.75s infinite linear;
      -ms-animation: scan 1.75s infinite linear;
      -o-animation: scan 1.75s infinite linear;
      animation: scan 1.75s infinite linear;
      -webkit-animation-fill-mode: both;
      -moz-animation-fill-mode: both;
      -ms-animation-fill-mode: both;
      -o-animation-fill-mode: both;
      animation-fill-mode: both;
      border-radius: 1px;
    }

    .square {
      position: absolute;
      display: inline-block;
      height: 20px;
      width: 20px;

      &.top {
        top: 0;
        border-top: 1px solid var(--eb-border-color);
      }

      &.left {
        left: 0;
        border-left: 1px solid var(--eb-border-color);
      }

      &.bottom {
        bottom: 0;
        border-bottom: 1px solid var(--eb-border-color);
      }

      &.right {
        right: 0;
        border-right: 1px solid var(--eb-border-color);
      }
    }

    .tips {
      position: absolute;
      bottom: -48px;
      width: 100%;
      font-size: 14px;
      color: #FFFFFF;
      opacity: 0.8;
    }
  }
}

@-webkit-keyframes scan {
  0% {top: 0}
  25% {top: 50px}
  50% {top: 100px}
  75% {top: 150px}
  100% {top: 200px}
}
@-moz-keyframes scan {
  0% {top: 0}
  25% {top: 50px}
  50% {top: 100px}
  75% {top: 150px}
  100% {top: 200px}
}
@-o-keyframes scan {
  0% {top: 0}
  25% {top: 50px}
  50% {top: 100px}
  75% {top: 150px}
  100% {top: 200px}
}
@keyframes scan {
  0% {top: 0}
  25% {top: 50px}
  50% {top: 100px}
  75% {top: 150px}
  100% {top: 200px}
}
</style>
