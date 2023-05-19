const notes=require('express').Router();
const{v4:uuidv4}=require("uuid");
const fs=require("fs");

notes.get("/",(req,res)=>{
    fs.readFile('./db/notes.json',(error,data)=>{
        if(error){
            console.log(error);
        }
        else{
            return res.json(JSON.parse(data));
        }
    })
    });

    notes.post("/",(req,res)=>{

        const{title,text}=req.body;
        const newNote={
            note_id:uuidv4(),
            title,
            text,
        };
        fs.readFile("./db/notes.json",(error,data)=>{
            if(error){
                console.log(error);
            }
            else{
                const parsedData=JSON.parse(data);
                parsedData.push(newNote);
                fs.writeFile('./db/db/json',JSON.stringify(parsedData),(writeError)=>{
                    if(writeError){
                        console.log(error);
                    }
                    else{
                        console.log("The notes are saved");
                    }
                })
            }
        })

        const response={status:"success",
                        body:newNote
        }
        res.status(200).json(response);


    });

    notes.delete("/:noteId",(req,res)=>{
        const noteToBeDeleted=req.params.noteId;
        fs.readFile("./db/notes.json",(error,data)=>{
            const parsedData=JSON.parse(data);
            const result=parsedData.filter((note)=>note.note_id!==noteToBeDeleted);
            fs.writeFile("./db/notes.json",JSON.stringify(result),(error)=>{
                if(error){
                    console.log(error);
                }
            })
        })
    });

    module.exports=notes;
