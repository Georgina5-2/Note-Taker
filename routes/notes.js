const router = require('express').Router();
const generateUniqueId = require('generate-unique-id');
const fs = require("fs");

router.get("/", (req, res) => {
    fs.readFile('db/notes.json','utf-8',(error, data) => {
        if (error) {
            console.log(error);
        }
        else {
            res.json(JSON.parse(data));
        }
    });
});

router.post("/", (req, res) => {
    console.log("post received req.body =", req.body);
    const { title, text } = req.body;
    const newNote = {
        id: generateUniqueId({length: 6}),
        title,
        text,
    };
    fs.readFile("./db/notes.json", (error, data) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log("in else");
            const parsedData = JSON.parse(data);
            parsedData.push(newNote);
            fs.writeFile('db/notes.json', JSON.stringify(parsedData), (writeError) => {
                if (writeError) {
                    console.log(error);
                }
                else {
                    console.log("The notes are saved");
                }
            });
        }
    });

    const response = {
        status: "success",
        body: newNote
    };
    res.status(200).json(response);


});

router.delete("/:Id", (req, res) => {
    const noteToBeDeleted = req.params.Id;
    fs.readFile("db/notes.json", (error, data) => {
        const parsedData = JSON.parse(data);
        const result = parsedData.filter((note) => note.id !== noteToBeDeleted);
        console.log("result",result);
        fs.writeFile("db/notes.json", JSON.stringify(result,null,4), (error) => {
            if (error) {
                console.log(error);
            }
           // res.end()
        });
    });
});

module.exports = router;
