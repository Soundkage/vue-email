<template>
  <app-header></app-header>
  <main id="app-main" class="app-main">
    <app-side-nav
      @load-inbox="loadInbox"
      @load-favourites="loadFavourites"
    ></app-side-nav>
    <div id="app-content" class="app-content">
      <app-content-toolbar
        :total-emails="totalEmails"
        @page-left="updateRange"
        @page-right="updateRange"
      ></app-content-toolbar>
      <table id="content-table" class="content-table">
        <tbody class="content-table-tbody">
          <app-content-table-data
            v-for="item in emailList"
            :key="item.id"
            :id="item.id"
            :email-address="item.email"
            :subject="item.subject"
            :date="item.date"
            @add-favourite="addToFavourites"
            @remove-favourite="removeFromFavourites"
          ></app-content-table-data>
        </tbody>
      </table>
    </div>
  </main>
  <app-footer></app-footer>
</template>

<script>
import mockData from './assets/mockData/emails.json'

export default {
  data() {
    return {
      totalEmails: mockData.length,
      emailList: mockData,
      favouritesById: [],
      currentRange: [0, 50],
      currentlyViewing: ''
    }
  },
  methods: {
    /**
     * TODO: Look at abstracting the list handling to another component.
     * Might be more effiecent to emit a sginal to a component
     * that deals with sorting and displaying the data
     */
    updateRange(range) {
      this.currentRange = range
      if (range.length === 0) this.loadInbox()

      switch (this.currentlyViewing) {
        case 'inbox':
          this.loadInbox()
          break
        case 'favourites':
          this.loadFavourites()
          break
        default:
          this.loadInbox()
          break
      }
    },
    addToFavourites(id) {
      this.favouritesById.push(id)
      localStorage.setItem(
        'favouritesById',
        JSON.stringify(this.favouritesById)
      )
    },
    removeFromFavourites(id) {
      this.favouritesById.splice(this.favouritesById.indexOf(id), 1)
      localStorage.setItem(
        'favouritesById',
        JSON.stringify(this.favouritesById)
      )
    },
    getlistByRange() {
      let list = []
      for (let i = this.currentRange[0]; i < this.currentRange[1]; i++) {
        list.push(mockData[i])
      }
      return list
    },
    loadInbox() {
      this.currentlyViewing = 'inbox'
      this.emailList = this.getlistByRange()
    },
    loadFavourites() {
      let favouritesList = []
      if (this.favouritesById.length !== 0) {
        this.favouritesById.forEach((item) => {
          favouritesList.push(mockData.find((data) => data.id === item))
        })

        this.currentlyViewing = 'favourites'
        this.emailList = favouritesList
      } else {
        console.log(
          'Route to empty inbox section here with a caption: Please select some favourites from the inbox'
        )
      }
    }
  }
}
</script>

<style>
/** 
 * Please note: 
 * I would usually use material or bootstrap so as not
 * to re-invent the wheel, however I thought it best to
 * give an indication of my css knowledge by writing my
 * own styles. Also I usually use a precompiler.
 * I would have liked to get some animations
 * and transitions for some fun but I kept it simple.
 */
:root {
  /* colors */
  --main-border-color: #cccccc;
  --secondary-bg-color-hover: #d6d6d6;
  --secondary-bg-color-active: #9a9a9a;
  --star-svg-color: #00b6b6;

  /* layout */
  --sidenav-text-display: none;
  --sidenav-listitem-align: center;
  --z-index-utmost-top-layer: 9999; /* reserving this for a modal */
  --z-index-second-layer: 999;

  /* measurements - mobile */
  --body-width: 980px;
  --header-padding-tb: 20px;
  --header-height: 58px;
  --header-title-width: 20vw;
  --header-search-width: 55vw;
  --header-search-margin-left: 25px;
  --content-components-width: calc(100% - 72px);
  --sidenav-width: 72px;
  --sidenav-compose-button-width: 100%;
  --sidenav-compose-button-margin: auto;
  --sidenav-compose-button-padding: 20px 0;
  --sidenav-compose-button-border-radius: 0;
  --content-toolbar-height: 50px;
  --footer-height: 30px;
  --footer-width: 980px;

  --content-table-td1: 15%;
  --content-table-td2: 25%;
  --content-table-td3: 50%;
  --content-table-td4: 10%;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
  font-family: 'Quicksand', sans-serif;
}

html,
body {
  height: 100%;
}

body {
  width: var(--body-width);
}

h1 {
  font-weight: 700;
}

li {
  text-align: left;
  list-style: none;
}

a {
  border: none;
}

button {
  background: none;
  border: none;
  cursor: pointer;
}

table {
  border-collapse: collapse;
}

#app {
  font-size: 16px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: calc(100% - (var(--header-height) + 2px));
}

main.app-main {
  font-size: 1em;
  min-height: 100%;
}

.app-content {
  position: relative;
  top: calc(var(--header-height));
  width: var(--content-components-width);
  left: var(--sidenav-width);
  padding-bottom: 78px;
}

@media screen and (min-width: 640px) {
  :root {
    /* measurements - mobile/tablet */
    --sidenav-width: 12vw;
  }
}

@media screen and (min-width: 820px) {
  :root {
    /* layout - tablet */
    --body-width: auto;

    /* measurements - tablet */
    --content-components-width: 88vw;
    --footer-width: 100%;
    --header-title-width: 12vw;
    --header-search-margin-left: 5px;
  }
}

@media screen and (min-width: 1033px) {
  :root {
    /* layout - desktop */
    --sidenav-text-display: inline;
    --sidenav-listitem-align: unset;

    /* measurements - desktop */
    --header-padding-tb: 20px;
    --header-height: 58px;
    --header-title-width: 15%;
    --header-search-width: 40%;
    --content-components-width: 85%;
    --sidenav-width: 15%;
    --sidenav-compose-button-width: 150px;
    --sidenav-compose-button-margin: 20px auto;
    --sidenav-compose-button-padding: 0;
    --sidenav-compose-button-border-radius: 100px;
    --content-toolbar-height: 50px;
    --footer-height: 30px;

    --content-table-td1: 10%;
    --content-table-td2: 27%;
    --content-table-td3: 53%;
    --content-table-td4: 10%;
  }
}
</style>
