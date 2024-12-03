const mysql = require("mysql2");
const express = require("express");
const app = express();
let port = 8080;
const path = require("path");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "rooms",
  password: "forgot 123",
});

app.get("/", (req, res) => {
  res.render("animation.ejs");
});

app.get("/home", (req, res) => {
  res.render("home.ejs");
});
app.get("/home/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home", "contact.html"));
});
app.get("/home/fiq", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home", "fiq.html"));
});
app.get("/home/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home", "about", "index.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend2", "index.html")); //css and app is loading to do this add he static path
});
app.get("/signup/error", (req, res) => {
  res.render("errorOfLogin.ejs");
});
app.get("/res", (req, res) => {
  res.render("res.ejs");
});


//today (22/11)
app.get("/home/jcer",(req,res)=>{
    res.render("jcer-home.ejs");
});

app.get("/home/jcer/rooms", (req, res) => {
  let q = "SELECT * FROM jcer";
  connection.query(q, (err, result) => {
    try {
      if (err) {
        throw err;
      }
      res.render("jcer.ejs", {pgList:result});
    } catch (err) {
      console.log(err);
      res.send("Some error has been occured in the db");
    }
  });
});

// /⁡⁣⁣⁢/𝟮𝟯/𝟭𝟭⁡
app.get("/home/jcer/rooms/add",(req,res)=>{
  res.render("add-jcer-pg.ejs");
});


app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "frontend2")));

app.listen(port, (res, req) => {
  console.log(`Listening to the port ${port}`);
});
