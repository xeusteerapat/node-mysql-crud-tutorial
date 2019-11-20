const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");

const app = express();

const { getHomePage } = require("./routes/index");
const {
  addPlayerPage,
  addPlayer,
  deletePlayer,
  editPlayer,
  editPlayerPage
} = require("./routes/player");

const PORT = 5000;

// create database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "socka"
});

// connect to db
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log("Connected to database...");
});

global.db = db;

// configure middleware
app.set("port", process.env.PORT || PORT);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());

// routes for our app
app.get("/", getHomePage);
app.get("/add", addPlayerPage);
app.get("/edit/:id", editPlayerPage);
app.get("/delete/:id", deletePlayer);
app.post("/add", addPlayer);
app.post("/edit/:id", editPlayer);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
