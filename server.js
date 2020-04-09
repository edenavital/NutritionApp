const express = require("express");
const cors = require("cors");
const pg = require("pg");
const morgan = require("morgan");
const path = require("path");
const PORT = process.env.PORT || 5000;
const app = express();
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
const SECRET = "MY_SECRET_KEY";
//Config for working with postgres in localhost environment:
config = {
  user: "postgres",
  database: "nutrition",
  password: "1a1a1a",
  host: "localhost",
  port: 5432,
  max: 10,
};
//Config for working with postgres in deployment environment - heroku: (Use this config only when pushing the code into master branch)
// config = {
//   connectionString: process.env.DATABASE_URL,
//   ssl: true
// };

const pool = new pg.Pool(config);

//Register a new person to the application:
//First, query so check if the person.username is exists in the database!
//If the person is already exists - return a msg "person is already exists"
//If the person is not exists, insert it into person table
app.post("/api/register", (req, res) => {
  console.log("INSIDE /api/register FROM BACKEND");
  console.log("REQ BODY:", req.body);

  //Getting some data from the client
  let { username } = req.body;

  //Connect to the DB - a function that gets err - error, db - new client inside the pool, done - release function
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
  let { username, password, gender, age, height, weight } = newUser;

  const values = [username, password, gender, age, height, weight];
  console.log("Im inside createNewPerson!:", values);

  pool.connect((err, db, done) => {
    if (err) return res.status(400).send(err);

    db.query(
      "INSERT INTO person (username, password, gender, age, height, weight) VALUES($1, $2, $3, $4, $5, $6)",
      [...values],
      (err) => {
        done();
        if (err) return res.status(400).send(err);

        console.log("A new user is inserted successfully!");
        return res.status(201).send({ msg: "New user has been created" });
      }
    );
  });
};

//Create a Login check - if the username and password match to one of the records in DB than LOGGED!
app.post("/api/login", (req, res) => {
  console.log("inside backend - /api/login");
  console.log("REQ BODY:", req.body);
  console.log("REQ HEADERS:", req.headers.authorization);

  //Destruct the data from the client
  let { username, password } = req.body;
  console.log("password from user", password);

  //Connect to the DB - Parameter is a function that gets err - error, db - new client inside the pool, done - release function
  pool.connect((err, db, done) => {
    if (err) return res.status(400).send(err);

    db.query(
      `SELECT * FROM person WHERE username='${username}'`,
      (err, table) => {
        done();

        //Save the array of objects we get from the database
        const dataFromDatabase = table.rows[0];

        //If we got nothing from the database, it means the username is not exist in the db
        if (!dataFromDatabase || dataFromDatabase === undefined) {
          res.status(403).send({ msg: "Username is not exist" });
          //We got something because the username exists, however - if the password is not matched it means the password is wrong
        } else if (password !== dataFromDatabase.password) {
          res.status(403).send({ msg: "Password is not matched" });
          //Username and password are matched, which means we can LOGIN! - GET THE DATA OF THE USER
        } else {
          //Calling a function that will return all the stored data of the user, it will be returned to the frontend, and there I will store the object inside redux
          if (checkToken(req, res)) getDataOfLoggedUser(dataFromDatabase, res);
        }
        if (err) return res.status(400).send(err);
      }
    );
  });
});

app.get("/api/getUserData", (req, res) => {
  console.log("inside backend - /api/getUserData");
  console.log("REQ HEADERS:", req.headers.authorization);
  const token = req.headers.authorization;

  if (!token) res.status(300).send({ msg: "JWT not found" });

  let username;
  jwt.verify(token, SECRET, function (err, authorizedData) {
    if (err) {
      return console.log("ERROR: ", err);
    }
    username = authorizedData.username;
    console.log("JWT is valid and authorizedData is\n", authorizedData);
  });

  //Connect to the DB - Parameter is a function that gets err - error, db - new client inside the pool, done - release function
  pool.connect((err, db, done) => {
    if (err) return res.status(400).send(err);

    db.query(
      `SELECT * FROM person WHERE username='${username}'`,
      (err, table) => {
        done();

        //Save the array of objects we get from the database
        const dataFromDatabase = table.rows[0];

        //If we got nothing from the database, it means the username is not exist in the db
        if (!dataFromDatabase || dataFromDatabase === undefined) {
          res.status(403).send({ msg: "Username is not exist" });
        } else {
          //Calling a function that will return all the stored data of the user, it will be returned to the frontend, and there I will store the object inside redux
          getDataOfLoggedUser(dataFromDatabase, res);
        }
        if (err) return res.status(400).send(err);
      }
    );
  });
});

const getDataOfLoggedUser = (newUser, res) => {
  console.log("Im inside getDataOfLoggedUser!:", newUser);

  pool.connect((err, db, done) => {
    if (err) return res.status(400).send(err);

    db.query(
      `SELECT foodid, foodname, quantity FROM food INNER JOIN person ON (food.person_id = person.id) WHERE person.id='${newUser.id}'`,
      (err, table) => {
        done();

        if (err) return res.status(400).send(err);

        console.log("Got the data from the user !");

        const userData = {
          credentials: newUser,
          food: table.rows,
        };

        console.log("Sending the following data:", userData);

        return res
          .status(200)
          .send({ userData: userData, msg: "New user has been created" });
      }
    );
  });
};

//Check to make sure header is not undefined, if so, return Forbidden (403)
const checkToken = (req, res) => {
  const header = req.headers.authorization.split(" ")[1];
  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];

    req.token = token;
    return true;
  } else {
    //If header is undefined return Forbidden (403)
    res.sendStatus(403).send({ msg: "header is undefined!" });
  }
};

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
  });
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/frontend/public/index.html"));
});

app.listen(PORT, () => console.log(`Server is listening to port ${PORT}`));
