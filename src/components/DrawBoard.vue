<template>
  <div class="draw-board">
    <div class="board-container">
      <canvas
        @mousemove.stop="mouseMove"
        @mouseout.stop="mouseOut"
        @mouseup.stop="mouseUp"
        @touchstart.stop="touchMove"
        @touchmove.stop="touchMove"
        @touchend.stop="touchEnd"
        ref="canvas">
      </canvas>
    </div>
    <div class="draw-menu">
      <!-- <div class="color-list">
        颜色表
      </div>
      <div class="eraser">
        橡皮
      </div> -->
    </div>
  </div>
</template>

<script>
const BOARD_WIDTH = 600
const BOARD_HEIGHT = 600

export default {
  data () {
    return {
      ctx: null,
      pathList: [],
      lastTime: 0,
      width: 0,
      height: 0
    }
  },
  mounted () {
    this.ctx = this.$refs.canvas.getContext('2d')
    this.ctx.beginPath()
    this.ctx.lineWidth = 10
    this.$refs.canvas.width = BOARD_WIDTH
    this.$refs.canvas.height = BOARD_HEIGHT
  },
  beforeDestroy() {
    // 
  },
  methods: {
    calPoint (x, y) {
      if (!this.$refs.canvas) return [0, 0]
      let rect = this.$refs.canvas.getBoundingClientRect()
      x -= rect.left
      y -= rect.top
      x = x / rect.width * BOARD_WIDTH
      y = y / rect.height * BOARD_HEIGHT
      return [x, y]
    },
    addPath (x, y) {
      if (!this.ctx) return
      if (!this.lastTime) {
        this.pathList.push([])
        this.lastTime = +new Date()
      }
      [x, y] = this.calPoint(x, y)
      let list = this.pathList[this.pathList.length - 1]
      let delta = 0
      console.log(x, y, list.length)
      if (!list.length) {
        delta = new Date() - this.lastTime
        this.ctx.moveTo(x, y)
      } else {
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
      }
      list.push([x, y, delta])
    },
    mouseMove (event) {
      let leftDown = event.buttons & 1
      if (!leftDown) return
      this.addPath(event.clientX, event.clientY)
    },
    mouseOut () {
      this.lastTime = 0
    },
    mouseUp () {
      this.lastTime = 0
    },
    touchMove (event) {
      console.log(event)
      let touches = event.touches
      if (touches.length != 1) {
        this.touchEnd()
        return
      }
      this.addPath(touches[0].pageX, touches[0].pageY)
      event.preventDefault()
    },
    touchEnd () {
      this.lastTime = 0
    }
  },
}
</script>


<style lang="stylus" scoped>
.draw-board
  .board-container
    width 600px
    height 600px
    margin 0 auto
    canvas
      width 100%
      height 100%
      border 1px solid red

</style>
