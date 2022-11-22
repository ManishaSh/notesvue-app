<template>
  <table class="list-container">
    <thead>
    <tr>
      <th><input type="checkbox" class="checkbox" :checked="allSelected" @click="selectAll"/></th>
      <th  @click="sort('id')">ID</th>
      <th @click="sort('title')">Title</th>
      <th @click="sort('content')">Content</th>
      <th @click="sort('status')">Status</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="note in sortedNotes" key={{note.id}}>
      <td><input type="checkbox" class="checkbox" @click="toggleShowPanel({noteid : note.id})"/></td>
      <td>{{ note.id }}</td>
      <td>{{ note.title }}</td>
      <td>{{ note.content }}</td>
      <td>{{ note.status }}</td>
    </tr>
    </tbody>
  </table>
  <div class="cta-container">
    <button @click="showDialog = true">Add notes</button>
  </div>
  <div class="form-container" v-show="showDialog">
    <v-dialog>
      <h2>Add note</h2>
      <div class="form-field">
        <input type="text" placeholder="Title" name="title" required="true" v-model="title">
      </div>
      <div>
        <textarea name="content" placeholder="Content" rows="5" required="true" v-model="content"></textarea>
      </div>
      <div>
        <button type="submit" class="save-btn" v-on:click="saveNotes(title, content)">Save</button>
        <button type="reset" class="cancel-btn" @click="showDialog= false">Cancel</button>
      </div>
    </v-dialog>
  </div>
  <div>
    <div>
      <div class="div-right">
        <v-panel v-show="showPanel">
          <div>
            <div>
              <v-text-field>Do you want to delete this note ?</v-text-field>
            </div>
            <button type="submit" class="yes-panel-btn" @click="deleteNotes(noteid)">Yes</button>
            <button type="reset" class="no-panel-btn" @click="toggleShowPanel(noteid)">No</button>
          </div>
        </v-panel>
      </div>
    </div>
  </div>
</template>
<script lang="ts">

import Dialog from "@/components/dialogue.vue";
import axios from "axios";

declare type cols = "id" | "title" | "content" | "status";

export default {
  name: "todo-list",
  components: {Dialog},
  props: {
    notes: Array<{
      id: number,
      title: String,
      content: String,
      status: String
    }>
  },
  mounted() {
  //@ts-ignore
    console.log(this.notes)
  },
  data() {
    return {
      noteid: null,
      showDialog: false,
      showPanel: false,
      items: [],
      currentSort: 'id' as cols,
      currentSortDir: 'asc'

    }
  },
  methods: {
    saveNotes(title: any, content: any) {
      fetch('http://localhost:8080/api/notes', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          content: content,
          status: 'New'
        })
      }).then(() => alert('Saved notes succesfully'));
      window.location.reload();
    },

    deleteNotes(noteid: any) {
      fetch('http://localhost:8080/api/notes/' + noteid, {method: 'DELETE'})
          .then(() => alert('Delete successful'));
      window.location.reload();
    },
    toggleShowPanel({noteid}: { noteid: any }) {
      //@ts-ignore
      this.noteid = noteid;
      //@ts-ignore
      if (this.showPanel) {
        //@ts-ignore
        this.showPanel = false;
      } else {
        //@ts-ignore
        this.showPanel = true;

      }
    },
    selectAll() {
      //@ts-ignore
      let all_s = this.allSelected;
      //@ts-ignore
      this.notes.forEach(note => note.selected = !all_s);
    },
    //@ts-ignore
    sort: function (s) {
      //if s == current sort, reverse
      //@ts-ignore
      if (s === this.currentSort) {
        //@ts-ignore
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      }
      //@ts-ignore
      this.currentSort = s;
    },
    closeDialog() {
      return {
        showDialog: false
      }
    },
  },

  computed: { //@ts-ignore
    sortedNotes: function () {
      //@ts-ignore
      return this.notes.sort((a, b) => {
        let modifier = 1;
        //@ts-ignore
        if (this.currentSortDir === 'desc') modifier = -1;
        //@ts-ignore
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        //@ts-ignore
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
    },
    //@ts-ignore
    allSelected: function () {
      //@ts-ignore
      return this.notes.every(note => note.selected);
    }
  }

}
</script>

<style scoped>

.list-container {
  width: 100%;
  margin-top: 16px;
  background-color: var(--color-white);
  padding: 8px;
}

td {
  min-width: 80px;
  padding: 0px 8px;
}

thead > tr {
  background-color: var(--vt-c-text-dark-2);
  color: var(--color-white);
}

tbody td {
  color: var(--color-black);
}

.cta-container {
  display: flex;
  justify-content: right;
  margin-top: 16px;
}

.div-right {
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: red;
}

.form-container {
  background-color: var(--color-white);
  margin-top: 24px;
  padding: 16px;
  max-width: 400px;
  color: #000000
}

button {
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  background-color: var(--color-primary);
  color: var(--color-white);
}

.save-btn {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.cancel-btn {
  background-color: var(--color-white);
  color: var(--color-primary);
}

.yes-panel-btn {
  background-color: red;
  color: var(--color-white);
}

.no-panel-btn {
  background-color: var(--color-white);
  color: var(--color-primary);
}
</style>