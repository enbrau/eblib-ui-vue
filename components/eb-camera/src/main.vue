<template>
  <div ref="wrapper" class="eb-camera">
    <div class="eb-camera-toolbar--top">
      <slot name="header"></slot>
    </div>
    <video ref="video" :class="{ face }" autoplay></video>
    <canvas v-show="false" ref="canvas" style="display: none;"></canvas>
    <div class="eb-camera-toolbar--bottom">
      <eb-button type="danger" @click="handleSnap">Shoot</eb-button>
      <eb-button type="danger" @click="handleScan">Scan</eb-button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import jsQR from 'jsqr'

import EbButton from '../../eb-button/src/main.vue'

export default {
  name: 'EbCamera',
  components: { EbButton },
  emits: ['snapped', 'scanned'],
  setup() {
    const face = ref(false)

    return { face }
  },
  mounted() {
    this.start()
  },
  // mounted() {
  //   const wrapper = this.$refs.wrapper
  //   const video   = this.$refs.video
  //   const canvas  = this.$refs.canvas

  //   const context = canvas.getContext('2d')

  //   this.$nextTick(() => {
  //     const that = this
  //     function tick() {
  //       if (video.readyState === video.HAVE_ENOUGH_DATA) {
  //         const cw = video.clientWidth;
  //         const ch = video.clientHeight;
  //         context.drawImage(video, 0, 0, cw, ch, 0, 0, cw / 2, ch / 3)

  //         if (that.mode === 'scan') {
  //           const imageData = context.getImageData(0, 0, cw, ch)
  //           const code = jsQR(imageData.data, cw, ch, {
  //             inversionAttempts: 'dontInvert'
  //           })
  //           if (code) {
  //             console.log('===>', code.data)
  //             that.$emit('scanned', code)
  //           }
  //         }
  //       }

  //       requestAnimationFrame(tick)
  //     }

  //     navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia
  //     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  //       navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false }).then(function(stream) {
  //         video.srcObject = stream
  //         requestAnimationFrame(tick)
  //       })
  //     }
  //   })
  // },
  methods: {
    start() {
      const video = this.$refs.video
      
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: this.face ? 'user' : 'environment' }, width: { ideal: 1280 }, audio: false })
          .then(function (stream) {
            video.srcObject = stream
          })
          .catch((error) => {
            console.error(error)
            let videoId = null
            navigator.mediaDevices.enumerateDevices()
              .then((devices) => {
                devices.forEach(device => {
                  console.info(device, device.kind + ": " + device.label + " id = " + device.deviceId)

                  if (device.kind === 'videoinput' && device.label.indexOf(this.face ? 'front' : 'back') !== -1) {
                    videoId = device.deviceId
                  }

                  if (videoId) {
                    navigator.mediaDevices.getUserMedia({ video: { sourceId: videoId }, width: { ideal: 1280 }})
                      .then((stream) => {
                        video.srcObject = stream 
                      })
                      .catch((error) => {
                        this.$emit(error)
                      })
                  }
                })
              })
              .catch((error) => {
                this.$emit('error', error)
              })
          })
      } else {
        this.$emit('error', new Error('Device error!'))
      }
    },
    stop() {
      const video = this.$refs.video
      video.srcObject && video.srcObject.getTracks().map(function (t) { t.stop() })
    },
    switchCamera() {
      this.stop()
      this.face = !this.face
      this.start()
    },
    handleSnap() {
      const video = this.$refs.video

      const videoRatio  = video.videoHeight / video.videoWidth
      const videoWidth  = video.clientWidth
      const videoHeight = video.clientHeight
      const videoTrueRatio = video.clientWidth / video.clientHeight
      let videoTrueWidth = video.videoWidth
      let videoTrueHeight = video.videoHeight

      // 如果video宽高比率大于视频源比率
      if (videoTrueRatio > videoRatio) {
          // 让视频真实宽度等于真实高度乘以video比率
          videoTrueWidth = videoTrueHeight / videoTrueRatio;
      } else {
          // 让视频真实高度等于真实宽度乘以video比率
          videoTrueHeight = videoTrueWidth * videoTrueRatio;
      }

      // canvas截取视频源的起点
      const sX = (video.videoWidth - videoTrueWidth) / 2
      const sY = (video.videoHeight - videoTrueHeight) / 2

      const canvas = this.$refs.canvas

      canvas.width = videoTrueWidth
      canvas.height = videoTrueHeight

      if (this.face) {
        // 如果是，则翻转图片
        var cxt = canvas.getContext('2d')
            cxt.translate($canvas.width, 0);
            cxt.scale(-1, 1);
            // 绘制视频
            cxt.drawImage($video, sX, sY, videoTrueWidth, videoTrueHeight, 0, 0, canvas.width, canvas.height);
            //翻转回来
            cxt.translate($canvas.width, 0);
            cxt.scale(-1, 1);
      } else {
        canvas.getContext('2d').drawImage($video, sX, sY, videoTrueWidth, videoTrueHeight, 0, 0, canvas.width, canvas.height)
      }
    },
    handleScan() {

    }
  }
}
</script>

<style lang="scss">
.eb-camera {
  position: relative;
  width: 100%;
  height: 100%;

  video, canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &-toolbar--bottom, &-toolbar--top {
    position: absolute;
    height: 40px;
    text-align: center;
    left: 0;
    right: 0;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: black;
      opacity: .6;
      z-index: 0;
    }
  }

  &-toolbar--top {
    top: 0;
    z-index: 1;
  }

  &-toolbar--bottom {
    bottom: 0px;
    z-index: 1;
  }
}
</style>
