const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const hostname = "localhost";
const port = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// GET requests
// route to home page or root /
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/pages/index.html"));
});
// route to login page
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "/pages/login.html"));
});
// route to dashboard
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "/pages/dashboard.html"));
});

// POST request
app.post("/login", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  res.send(`Username : ${username} with Password : ${password}`);
});

// function to listen on the port
app.listen(port, () =>
  console.log(`server is running at http://${hostname}:${port}`)
);
