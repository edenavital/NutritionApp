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
  database: "nutrition",
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

const pool = new pg.Pool(config);

//Register a new person to the application:
//First, query so check if the person.username is exists in the database!
//If the person is already exists - return a msg "person is already exists"
//If the person is not exists, insert it into person table
app.post("/api/register", (req, res) => {
  console.log("INSIDE /api/register FROM BACKEND");
  console.log("REQ BODY:", req.body);

  //Destruct the data from the client
  let { username } = req.body;

  //Connect to the DB - parameter is a function that gets err - error, db - new client inside the pool, done - release function
  pool.connect((err, db, done) => {
    if (err) return res.status(400).send(err);

    db.query(
      `SELECT * FROM person WHERE username='${username}'`,
      (err, table) => {
        done();

        const dataFromDatabase = table.rows;
        console.log("dataFromDatabase:", dataFromDatabase);

        if (dataFromDatabase.length === 0) {
          console.log("User is being created");
          createNewPerson(req.body, res);
        } else {
          return res.status(303).send({ msg: "User is already created " });
        }

        if (err) return res.status(400).send(err);
      }
    );
  });
});

//Invokes if a person is not exists, so I am allowed to insert it!
const createNewPerson = (newUser, res) => {
  let { username, password, age, height, weight } = newUser;

  const values = [username, password, age, height, weight];
  console.log("Im inside createNewPerson!:", values);

  pool.connect((err, db, done) => {
    if (err) return res.status(400).send(err);

    db.query(
      "INSERT INTO person (username, password, age, height, weight) VALUES($1, $2, $3, $4, $5)",
      [...values],
      err => {
        done();
        if (err) return res.status(400).send(err);

        console.log("A new user is inserted successfully!");
        return res.status(201).send({ msg: "New user has been created" });
      }
    );
  });
};

//Create a Login check - if the username and password match to one of the records in DB than LOGGED!

app.listen(PORT, () => console.log(`Server is listening to port ${PORT}`));
