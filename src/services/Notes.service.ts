import axios from "axios";

export class NotesService {
  public async getNotes() {
    // when backed is available enable this line of code
    // return await (await fetch("http:// endpoint")).json();
    return Promise.resolve(axios.get('http://localhost:8080/api/notes')
        .then(response => ( response.data)));
  }
}
