const express = require("express");
const cors = require("cors");
const pg = require("pg");
const morgan = require("morgan");
const path = require("path");
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

//Config for working with postgres in localhost environment:
config = {
  user: "postgres",
  database: "postgres",
  password: "1a2d3i4",
  host: "localhost",
  port: 5432,
  max: 10
};

//Config for working with postgres in development environment - heroku:
// config = {
//     connectionString: process.env.DATABASE_URL,
//     ssl: true
// }

app.post("/api/register", (req, res, next) => {
  console.log("INSIDE /api/register FROM BACKEND");
  console.log("REQ BODY:", req.body);
  ({ username, password, age, height, weight } = req.body);
});

app.listen(PORT, () => console.log(`Server is listening to port ${PORT}`));
