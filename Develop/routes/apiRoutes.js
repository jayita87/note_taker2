const fs = require('fs');
const uuid = require('../../helpers/generateID');

const router = require('express').Router();
const notes = require('../db/db.json');

router.get("/notes", (req, res) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
      let notes = JSON.parse(data);
      res.json(notes)
    })
  });

router.post("/notes", (req, res) => {
    console.log(req.body)
    res.send(`${req.method} request was received`)
    const { title, text, id } = req.body;
    if(title && text){
        let newNote = {
            title: title,
            text: text,
            id: uuid()
        }
        notes.push(newNote);

        fs.readFile("db/db.json", "utf-8", (err, data) => {
            console.log("printing logs to test")
            console.log(data);
            var parsedRes = JSON.parse(data);
            parsedRes.push(newNote);
            fs.writeFile("db/db.json", JSON.stringify(parsedRes), err => {
                err ? console.error(err) : console.log("Success")
            })
        })
    }
});

 router.delete('/notes/:id', (req, res) => {
   
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        let notes = JSON.parse(data);

        notes = notes.filter(note => (note.id !== req.params.id));

        fs.writeFile('db/db.json', JSON.stringify(notes), (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Note deleted!${notes}`);
                res.json(notes);
            }
        });

    });
})

 module.exports = router;