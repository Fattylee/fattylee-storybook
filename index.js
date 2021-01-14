require("express-async-errors");
const express = require("express");
const app = express();
const debug = require("debug")("active:app");
const methodOverride = require("method-override");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const stories = require("./routes/stories");
const users = require("./routes/users");
const auth = require("./routes/auth");
const index = require("./routes");
const uploads = require("./routes/uploads");

// API routes import
const apiStories = require("./routes/api/v1/stories");
const apiUsers = require("./routes/api/v1/users");
const apiAuth = require("./routes/api/v1/auth");
const apiIndex = require("./routes/api/v1");
const apiUploads = require("./routes/api/v1/uploads");

const startDB = require("./startups/db");
const passport = require("passport");
const isAuthenticated = require("./middlewares/auth");
const handlebarsConfig = require("./helpers/handlebars");
const storyError = require("./controllers/errors/storyError");
const expressFileupload = require("express-fileupload");
const mongoose = require("mongoose");
const cors = require("cors");

if (app.get("env") === "developmentt") {
  debug("spitting webpack config...");
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const config = require("./client/webpack.config.js")();
  console.log(config);
  const compiler = webpack(config); // Tell express to use the webpack-dev-middleware and use the webpack.config.js
  // configuration file as a base.
  app.use(
    webpackDevMiddleware(compiler, { publicPath: config.output.publicPath })
  );
}

startDB(app);
require("./config/passport")(passport);

app.use(cors());
app.use(morgan("tiny"));
app.use(methodOverride("_method"));

app.use(expressFileupload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine("html", exphbs(handlebarsConfig));
app.set("view engine", "html");

app.use(express.static(path.join(__dirname, "public")));

// cookieSession can also be used in place of this, see above
app.use(
  session({
    secret: "keyboard cat",
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(flash());

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set global variables
app.use((req, res, next) => {
  //debug(req.user);
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user;
  res.locals.success = req.flash("success");
  next();
});

// serve react index for all routes matching react
app.get("/react*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/react.html"));
});

app.use("/", index);
app.use("/stories", isAuthenticated, stories);
app.use("/users", users);
app.use("/auth", auth);
app.use("/uploads", isAuthenticated, uploads);

// API routes

app.use("/api/v1", apiIndex);
app.use("/api/v1/stories", /*isAuthenticated,*/ apiStories);
app.use("/api/v1/users", apiUsers);
app.use("/api/v1/auth", apiAuth);
app.use("/api/v1/uploads", isAuthenticated, apiUploads);

app.use((err, req, res, next) => {
  if (app.get("env") === "production") console.log("Async error", err);
  else debug("Async error", err);

  if (err.message.includes("duplicate key error")) {
    req.flash(
      "error_msg",
      `email "${req.userValue.email}" already registered, pls login to your account`
    );
    return res.redirect("/users/login");
  }
  res.status(500).render("errors/500");
  /*res.status(200).send({
    msg: 'na error bdis',
    err,
  });*/
});

// disable in production
if (app.get("env") === "development" || app.get("env") === "staging") {
  // app.use('/xyz', require('./routes/comments'));
  debug("comments routes loaded");

  // require('./playground/faker');
}

app.all("*", (req, res, next) => {
  res.render("errors/404", { pageTitle: "404" });
});

module.exports = app;
