<template>
  <header id="header" class="header">
    <h1 class="header-title">Dmail</h1>
    <input
      id="header-search"
      class="header-search"
      type="text"
      placeholder="Search..."
      @keyup="runSearch"
    />
  </header>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    runSearch(event) {
      console.log('Search for', event.target.value)
    }
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  font-size: 1em;
  width: 100%;
  height: var(--header-height);
  padding: 10px 0;
  border-bottom: 1px solid var(--main-border-color);
  text-align: left;
  background: #fff;
  /** 
   * Not a fan of using z-index but for the sake of this demo
   * and time not being on my side this is a best attept so far.
   * The only thing that should be higher than this is a modal 
   */
  z-index: var(--z-index-second-layer);
}
.header-title {
  display: inline-block;
  padding: 0 20px;
  vertical-align: middle;
  width: var(--header-title-width);
  color: #01b6b6;
}
.header-search {
  display: inline-block;
  margin-left: var(--header-search-margin-left);
  width: var(--header-search-width);
  font-size: 1.1em;
  line-height: 30px;
  vertical-align: middle;
  padding: 0 10px;
  border-radius: 50px;
  border: 1px solid var(--main-border-color);
}
.header-search:focus {
  box-shadow: 0px 1px 4px 0px var(--main-border-color);
}
</style>
