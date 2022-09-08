const fs = require('fs');
const uuid = require('../../helpers/generateID');

const router = require('express').Router();

    router.get("/notes", (req, res) => {
        res.json(notes);
});

router.post("/notes", (req, res) => {
    console.log(req.body)
    res.send(`${req.method} request was received`)
    const { title, text, id } = req.body;
    if(title && text){
        let newNote = {
            title: req.body.title,
            text: req.body.text,
            id: uuid(),
        }
        notes.push(newNote);

        fs.readFile("../db/db.json", "utf-8", (err, data) => {
            const parsedRes = JSON.parse(data);
            parsedRes.push(newNote)
            fs.writeFile("../db/db.json", JSON.stringify(parsedRes), err => {
                err ? console.error(err) : console.log("Success")
            })
        })
    }
});

router.delete('/notes/:id', (req, res) => {
    noteDeleteNote(notes, req.params.id);
    res.json(notes);
 })
 module.exports = router;