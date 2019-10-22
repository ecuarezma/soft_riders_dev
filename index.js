require("newrelic");
require("dotenv").config();
const express = require("express"),
  compression = require("compression"),
  helmet = require("helmet"),
  bodyParser = require("body-parser"),
  session = require("express-session"),
  cookieParser = require("cookie-parser"),
  flash = require("connect-flash"),
  app = express(),
  routes = require("./routes");

app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("I hear you"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    saveUninitialized: false,
    resave: false,
    secret: "I hear you"
  })
);
app.use(flash());
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(routes);

let port = process.env.PORT || 8000;
app.listen(port, process.env.IP, () => {
  console.log(`app is running on port ${port}`);
});
