<template>
  <footer id="app-footer" class="app-footer">
    <p>&copy; {{ getDate() }} Copyright TestApp</p>
  </footer>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    getDate() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.app-footer {
  position: absolute;
  background-color: #ccc;
  height: var(--footer-height);
  line-height: var(--footer-height);
  text-align: center;
  width: var(--footer-width);
  margin-top: var(--footer-height);
}

.app-footer p {
  font-size: 0.8em;
}
</style>
