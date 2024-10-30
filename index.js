const express = require("express");

const app = express();
const path = require("path");
const port = 8080;

app.use(express.urlencoded({extended :true}));//to take the url parameters
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


app.get("/",(req,res)=>{
    res.render("animation.ejs");
});

app.get("/home",(req,res)=>{
    res.render("home.ejs");
});
app.get("/home/contact",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","home","contact.html"));
});
app.get("/home/fiq",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","home","fiq.html"));
});
app.get("/home/about",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","home","about","index.html"));
});

app.get("/signup",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend2","index.html"));//css and app is loading to do this add he static path 
});
app.get("/signup/error",(req,res)=>{
    res.render("errorOfLogin.ejs");
});
app.get("/res",(req,res)=>{
    res.render("res.ejs");
})



app.use(express.static(path.join(__dirname,"public")));
app.use(express.static(path.join(__dirname,"frontend2")));

app.listen(port,(res,req)=>{
    console.log(`Listening to the port ${port}`);
});