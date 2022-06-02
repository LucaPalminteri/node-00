const notes = [
    {
        "id": 1,
        "content": "content 1",
        "date": "date 112121",
        "important": false
    },
    {
        "id": 2,
        "content": "content 2",
        "date": "date 2",
        "important": true
    },
    {
        "id": 3,
        "content": "content 3",
        "date": "date 3",
        "important": false
    },
    {
        "id": 4,
        "content": "content 4",
        "date": "date 4",
        "important": true
    }
]
const express = require('express');
const app = express();
app.use(express.json())

const PORT = 3001;

app.get('/', (request,response) => {
    response.send('<h1>Hello World!</h1>');
})

app.get('/api/notes', (request,response) => {
    response.json(notes);
})

app.get('/api/notes/:id', (request,response) => {
    const id = request.params.id;
    const note = notes.find(note => note.id == id)
    if(note){
        response.json(note)
    }
    else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request,response) => {
    const id = request.params.id;
    const note = notes.filter(note => note.id != id)
})

app.post('/api/notes', (request,response) => {
    const note = request.body;
    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)
    const newNote = {
        id: maxId + 1,
        content: note.content,
        important: note.important || false,
        date: new Date().toISOString()
    }
    notes = [...notes,newNote]

    response.json(newNote)
})

app.listen(PORT, ()=>{
    console.log(`server running at ${PORT}port`);
})