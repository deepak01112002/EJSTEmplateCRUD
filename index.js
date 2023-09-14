const express = require("express")
const multer = require('multer')
const path = require("path")
const mongoose = require("mongoose")
const app = express()
app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))
let data = [
    {id : 1, name : "Item 1"},
    {id : 2, name : "Item 2"},
    {id : 3, name : "Item 3"}
]

app.get("/",(req,res)=>{
    res.render('index',{data:data})
})

app.get("/edit/:id",(req,res)=>{
    const id = req.params.id;
    const item = data.findIndex(el=>el.id==id);
    const itemToEdit = data[item]
    res.render('edit',{itemToEdit})
})

// Handle the edit form submission
app.post("/edit/:id", (req, res) => {
    const id = req.params.id;
    const updatedName = req.body.newName;
    const itemToEdit = data.find((item) => item.id == id);

    if (itemToEdit) {
        itemToEdit.name = updatedName;
    }

    res.redirect("/");
})

app.post("/add",(req,res)=>{
    const newItem = {
        id : data.length +1 ,
        name : req.body.Name
    }
    data.push(newItem);
    res.redirect("/")
})

app.get("/delete/:id",(req,res)=>{
    const id = req.params.id
    const index = data.findIndex(el=>el.id==id);
    data.splice(index,1);
    res.redirect("/")
})


app.listen(8080,async()=>{
    console.log("server connected")
})