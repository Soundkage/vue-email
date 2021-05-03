<template>
  <div id="content-toolbar" class="content-toolbar">
    <div class="content-toolbar-range-container">
      <div class="content-toolbar-range-count">
        <p class="content-toolbar-range-count-text">{{ getRangeText }}</p>
      </div>
      <div class="content-toolbar-range-button-container">
        <button
          class="content-toolbar-range-button button-left"
          :class="isLeftDisabled ? 'disabled' : ''"
          @click="pageLeft"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        <button
          class="content-toolbar-range-button button-right"
          :class="isRightDisabled ? 'disabled' : ''"
          @click="pageRight"
        >
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    totalEmails: Number
  },
  emits: ['page-left', 'page-right'],
  data() {
    return {
      isLeftDisabled: true,
      isRightDisabled: false,
      currentRange: [0, 50]
    }
  },
  methods: {
    pageLeft() {
      this.currentRange = [this.currentRange[0] - 50, this.currentRange[1] - 50]
      if (this.currentRange[0] < 0) this.currentRange = [0, 50]
      if (this.currentRange[0] === 0) this.isLeftDisabled = true
      if (this.currentRange[1] > 50) this.isRightDisabled = false

      this.$emit('page-left', this.currentRange)
    },
    pageRight() {
      this.isLeftDisabled = false
      if (this.currentRange[1] === this.totalEmails) this.isRightDisabled = true

      this.currentRange = [this.currentRange[0] + 50, this.currentRange[1] + 50]
      if (this.currentRange[1] >= this.totalEmails) {
        this.currentRange[1] = this.totalEmails
        this.isRightDisabled = true
      }
      this.$emit('page-right', this.currentRange)
    }
  },
  computed: {
    getRangeText() {
      return `${this.currentRange[0]} - ${this.currentRange[1]} of ${this.totalEmails}`
    }
  }
}
</script>

<style>
.content-toolbar {
  position: fixed;
  background-color: #f1f1f1;
  width: var(--content-components-width);
  height: var(--content-toolbar-height);
  display: inline-block;
  box-shadow: 0px 2px 2px -1px var(--main-border-color);
  /** 
   * Not a fan of using z-index but for the sake of this demo
   * and time not being on my side this is a best attept so far.
   * The only thing that should be higher than this is a modal 
   */
  z-index: var(--z-index-second-layer);
}
.content-toolbar-range-container {
  position: absolute;
  right: 20px;
}
.content-toolbar-range-count {
  display: inline-block;
}
.content-toolbar-range-count-text {
  font-size: 0.85em;
  padding: 0 20px;
}
.content-toolbar-range-button-container {
  display: inline-block;
  vertical-align: middle;
}
.content-toolbar-range-button {
  position: relative;
  width: 30px;
  height: 30px;
  margin: 10px 5px;
  border-radius: 500px;
  background-color: #fff;
  box-shadow: 1px 1px 4px -2px #ababab;
}
.content-toolbar-range-button:hover {
  background-color: #01b6b6;
}
.content-toolbar-range-button:active {
  background-color: darkcyan;
}
.content-toolbar-range-button svg {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  margin: auto;
  color: #01b6b6;
}
.disabled {
  opacity: 0.7;
  pointer-events: none;
}
.content-toolbar-range-button:hover svg {
  color: white;
}
.content-toolbar-range-button:active svg {
  color: white;
}
</style>
