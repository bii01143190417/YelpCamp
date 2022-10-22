const express = require("express");
const app = express();
const morgan = require("morgan");

const AppError = require("./AppErrpr");

app.use(morgan("common"));

app.use((req, res, next) => {
  req.requestTime = Date.now();
  console.log(req.method, req.path);
  next();
});

app.use("/dogs", (req, res, next) => {
  console.log("I LOVE DOGS!");
  next();
});

const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === "chickennugget") {
    next();
  }
  throw new AppError("password required", 401);
  // res.send("SORRY YOU NEED A PASSWORD!");
  // res.status(401);
};

app.get("/", (req, res) => {
  console.log(`REQUEST DATE: ${req.requestTime}`);
  res.send("HOME PAGE!");
});

app.get("/error", (req, res) => {
  chkcken.fly();
});

app.get("/dogs", (req, res) => {
  res.send("woof woof!");
});

app.get("/secret", verifyPassword, (req, res) => {
  res.send("My secret is bububu");
});

app.get("/admin", (req, res) => {
  throw new AppError("You are not an Admin!", 403);
});

app.use((req, res) => {
  res.status(404).send("NOT FOUND!");
});

// app.use((err, req, res, next) => {
//   console.log("******************************************");
//   console.log("*****************error********************");
//   console.log("******************************************");
//   console.log(err);
//   next(err);
// });

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).send("errror!!!");
});

app.listen(3000, () => {
  console.log("App is running on localhost:3000");
});
