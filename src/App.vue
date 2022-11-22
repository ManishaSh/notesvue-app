<template>
  <div id="app">
    <kpi-indicators :completed="notes.filter(note => note.status=='Completed' ).length"
                    :not-completed="notes.filter(note => note.status =='Not completed').length"
                    :total="Object.keys(notes).length"></kpi-indicators>
    <todo-list :notes="notes"></todo-list>
  </div>
</template>

<script lang="ts">
import {NotesService} from "./services/Notes.service.js";

const notesService = new NotesService();
export default {
  name: "App",
  mounted() {
    this.getNotes();
  },
  data() {
    return {
      notes: new Array<{
        id: number;
        title: string;
        content: string;
        status: string;
      }>()
    }
  },
  methods: {
    async getNotes() {

      const fetchedNotes = await notesService.getNotes();
      this.notes = fetchedNotes;
    }
  }
}
</script>

