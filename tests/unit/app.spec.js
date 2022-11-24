import App from '../../src/App.vue'
import {NotesService} from "@/services/Notes.service";
import Vue from 'vue'


describe('App.vue', () => {
    let vm
    before(() => {
        const Constructor = Vue.extend(App)
        vm = new Constructor({
            props: {
                service: {
                    notesService: NotesService
                }
            }
        }).$mount()
    })

})