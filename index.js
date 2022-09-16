const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const hostname = "localhost";
const port = process.env.PORT || 8080;
const userList = require("./userList.json");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: 6000 },
    resave: true,
  })
);
app.use(cookieParser());

// GET requests
// route to home page or root /
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages/index.html"));
});
// route to login page
app.get("/login", (req, res) => {
  if (!req.cookies.username || !req.cookies.password) {
    res.sendFile(path.join(__dirname, "pages/login.html"));
  } else {
    res.redirect("/dashboard");
  }
});

// POST request
app.post("/authentication", (req, res) => {
  console.log(req.body);
  let username = req.body.username;
  let password = req.body.password;

  let storedUserName = userList.users.find((user) => user.username == username);
  let storedPassword = userList.users.find((user) => user.password == password);

  if (
    storedUserName.username === username &&
    storedPassword.password === password
  ) {
    res.cookie("username", username);
    res.cookie("password", password);
    res.redirect("/dashboard");
  } else {
    res.redirect("/login");
  }
  res.end();
});
// Post for Updating user info
app.post("/update", (req, res) => {
  let newUserName = req.body.username;
  let newPassword = req.body.password;
  res.write(newUserName + newPassword);
  res.end();
});
// route to dashboard
app.get("/dashboard", (req, res) => {
  if (req.cookies.username) {
    res.sendFile(path.join(__dirname, "/pages/dashboard.html"));
  } else {
    res.redirect("/login");
  }
});
// function to listen on the port
app.listen(port, () =>
  console.log(`server is running at http://${hostname}:${port}`)
);
