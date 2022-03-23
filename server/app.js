const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const { body } = require("express-validator");
const app = express();
const path = require("path");
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(body());
const isProduction = process.env.NODE_ENV === "production";
app.use(cors({ origin: isProduction ? "" : "http://localhost:3000" }));
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => {
    console.error("app.js " + err);
  });

app.use("/api", require("./routes/apiRouter"));

if (isProduction) {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
  });
} else {
  app.get("/", (req, res) =>
    res.send(`Please set your environment to 'production'.`)
  );
}

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 5010;
app.listen(PORT, () =>
  console.log(`Listening on port http://localhost:${PORT}`)
);
