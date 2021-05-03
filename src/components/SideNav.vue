<template>
  <nav id="sidenav" class="sidenav">
    <div class="sidenav-compose-button-container">
      <button
        id="sidenav-compose-button"
        class="sidenav-compose-button"
        @click="showEmailModal"
      >
        <i class="far fa-edit"></i>
        <span class="sidenav-text">Compose</span>
      </button>
    </div>
    <ul id="sidenav-list" class="sidenav-list">
      <li
        class="sidenav-listitem"
        :key="navItem.itemName"
        v-for="navItem in navItems"
        @click="loadList(navItem.itemName)"
      >
        <span class="sidenav-icon">
          <i class="fas" :class="'fa-' + navItem.icon"></i>
        </span>
        <span class="sidenav-name sidenav-text">
          {{ navItem.itemName }}
        </span>
      </li>
    </ul>
    <button class="sidenav-button" @click="toggleInput" v-if="!inputVisible">
      <i class="fas fa-plus"></i> <span class="sidenav-text">Add folder</span>
    </button>
    <div class="sidnav-input-container" v-else>
      <input
        id="sidenav-label-input"
        class="sidenav-input"
        type="text"
        placeholder="Label name"
        @input="updateLabelName"
        @keypress.enter="addSideNavItem"
      />
      <button
        class="sidenav-button sidenav-button-appended"
        @click="addSideNavItem"
      >
        <i class="fas fa-plus"></i>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  emits: ['load-inbox', 'load-favourites'],
  data() {
    return {
      labelName: '',
      inputVisible: false,
      lastSelectedNavItem: '',
      navItems: [
        {
          icon: 'inbox',
          itemName: 'Inbox',
          totalEmails: 0,
          selected: true
        },
        {
          icon: 'star',
          itemName: 'Favourites',
          totalEmails: 0,
          selected: false
        }
      ]
    }
  },
  methods: {
    saveSelectedNavItem(navItem) {
      localStorage.setItem('selectedNavItem', JSON.stringify(navItem))
    },
    addSideNavItem() {
      let item = {
        icon: 'folder',
        itemName: this.labelName,
        totalEmails: 0,
        selected: false
      }
      if (this.labelName !== '') {
        this.navItems.push(item)
      }
      this.toggleInput()
    },
    updateLabelName(event) {
      this.labelName = event.target.value
    },
    toggleInput() {
      this.inputVisible = !this.inputVisible
    },
    loadList(listName) {
      // TODO: Remove this if when setting up new folder button and persistence.
      if (listName === 'Inbox' || listName === 'Favourites') {
        this.$emit(`load-${listName.toLowerCase()}`)
        this.saveSelectedNavItem(listName)
      }
    },
    loadLastSelectedNavItem() {
      this.lastSelectedNavItem =
        JSON.parse(localStorage.getItem('selectedNavItem')) || 'inbox'

      this.loadList(this.lastSelectedNavItem)
    },
    showEmailModal() {
      alert('Placeholder - create and show email template modal')
    }
  },
  mounted() {
    this.loadLastSelectedNavItem()
  }
}
</script>

<style scoped>
.sidenav {
  position: fixed;
  top: var(--header-height);
  height: calc(100vh - var(--header-height));
  left: 0;
  width: var(--sidenav-width);
  border-right: 1px solid var(--main-border-color);
  user-select: none;
  background-color: white;
  /** 
   * Not a fan of using z-index but for the sake of this demo
   * and time not being on my side this is a best attept so far.
   * The only thing that should be higher than this is a modal 
   */
  z-index: var(--z-index-second-layer);
}
.sidenav-compose-button-container {
  width: 100%;
}
.sidenav-compose-button {
  display: block;
  margin: var(--sidenav-compose-button-margin);
  border-radius: var(--sidenav-compose-button-border-radius);
  line-height: 48px;
  font-size: 1.1em;
  width: var(--sidenav-compose-button-width);
  background-color: #01b6b6;
  color: #fff;

  padding: var(--sidenav-compose-button-padding);
}
.sidenav-compose-button:hover {
  background-color: #04adad;
}
.sidenav-compose-button:active {
  background-color: #039494;
}
.sidenav-text {
  display: var(--sidenav-text-display);
}
.sidenav-listitem {
  padding: 0 20px;
  line-height: 52px;
  border-bottom: 1px solid var(--main-border-color);
  text-align: var(--sidenav-listitem-align);
}
.sidenav-listitem.nav-selected {
  background-color: darkcyan;
  color: #fff;
}
.sidenav-listitem:first-child {
  border-top: 1px solid var(--main-border-color);
}
.sidenav-listitem:link,
.sidenav-listitem:visited,
.sidenav-listitem:hover {
  background-color: var(--secondary-bg-color-hover);
  cursor: pointer;
}
.sidenav-icon {
  width: 30px;
  display: inline-block;
}
.sidenav-icon i,
.sidenav-icon svg {
  width: 100%;
  margin: auto;
  color: var(--star-svg-color);
}

.sidenav-icon svg .sidenav-label {
  font-size: 0.7em;
}
.sidnav-input-container {
  text-align: center;
  width: 100%;
  background-color: #e2e2e2;
  padding: 12px 15px 0px;
}
.sidenav-input {
  line-height: 30px;
  border: 1px solid #01b6b6;
  border-radius: 100px;
  padding: 0 10px;
  width: inherit;
}
.sidenav-button {
  cursor: pointer;
  width: 100%;
  line-height: 50px;
}
.sidenav-button:hover {
  background-color: var(--secondary-bg-color-hover);
}
.sidenav-button:active {
  background-color: var(--secondary-bg-color-active);
}
</style>
