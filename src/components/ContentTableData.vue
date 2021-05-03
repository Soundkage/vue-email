<template>
  <tr class="content-table-tr">
    <td class="content-table-td">
      <div class="content-table-td-option">
        <input type="checkbox" :key="id" @change="selected(id)" />
      </div>
      <div class="content-table-td-option">
        <div class="content-table-td-star">
          <span key="far" v-if="!isFavourite" @click="addFavourite(id)"
            ><i class="far fa-star"></i
          ></span>
          <span key="fas" v-else @click="removeFavourite(id)"
            ><i class="fas fa-star"></i
          ></span>
        </div>
      </div>
    </td>
    <td class="content-table-td">{{ emailAddress }}</td>
    <td class="content-table-td" :title="subject">{{ subject }}</td>
    <td class="content-table-td content-table-td-date">
      {{ getFormattedDate(date) }}
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    emailAddress: String,
    subject: String,
    date: String
  },
  emits: ['add-favourite', 'remove-favourite'],
  data() {
    return {
      isFavourite: false,
      isSelected: false
    }
  },
  methods: {
    addFavourite(id) {
      this.isFavourite = !this.isFavourite
      this.$emit('add-favourite', id)
    },
    removeFavourite(id) {
      this.isFavourite = !this.isFavourite
      this.$emit('remove-favourite', id)
    },
    selected(id) {},
    getFormattedDate(date) {
      /**
       * This data would usually be cleaned and validated by a backend service
       * We would receive this from a call to an API or DB so we should already know
       * how this data would look. Hence why I have not added any other checks
       * here (although it is always a good idea to have some validation
       * and some guards. However, for the sake of this demo I will leave this as is.)
       */
      let dateElements = date.split('/')

      let dateString = new Date(
        Number(dateElements[2]), // year
        Number(dateElements[1] - 1), // month (-1 needed to correct index)
        Number(dateElements[0]) // day
      )

      let formattedDate = new Intl.DateTimeFormat('en-GB', {
        month: 'short',
        day: 'numeric'
      }).format(dateString)

      return `${formattedDate}`
    }
  }
}
</script>

<style>
.content-table {
  position: relative;
  top: var(--content-toolbar-height);
  table-layout: fixed;
  width: 100%;
}
.content-table-tr:hover {
  background-color: #01b6b6;
  cursor: pointer;
  color: white;
}
.content-table-tr.selected {
  color: white;
  background-color: darkcyan;
}
.content-table-td {
  text-align: left;
  padding: 8px 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
}
.content-table-td-option {
  display: inline-block;
  padding: 0 5px;
}
.content-table-td-star svg.fa-star {
  color: var(--star-svg-color);
}
.content-table-tr:hover .content-table-td-star svg.fa-star {
  color: white;
}
.content-table-td-date {
  font-size: 0.8em;
}
.content-table-td:nth-child(1) {
  width: 10%;
}
.content-table-td:nth-child(2) {
  width: 27%;
}
.content-table-td:nth-child(3) {
  width: 53%;
}
.content-table-td:nth-child(4) {
  width: 10%;
  text-align: right;
  padding: 0 5px;
}
</style>
