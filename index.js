require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const connectDB = require("./server/config/db");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");

const app = express();
const port = 3000 || process.env.PORT;

const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGODB_URI,
});

app.use(
  session({
    secret: "newsecret",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    // cookie: { maxAge: new Date(Date.now() + 3600000) },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

//Connect to DB
connectDB();

//Public
app.use(express.static("public"));

//Main
app.use(expressLayouts);
const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Routes
app.use("/", require("./server/routes/auth"));
app.use("/", require("./server/routes/index"));
app.use("/", require("./server/routes/dashboard"));

//Handling 404
app.use((req, res, next) => {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
