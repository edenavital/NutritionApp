const express = require("express");
const cors = require("cors");
const pg = require("pg");
const morgan = require("morgan");
const path = require("path");
const PORT = process.env.PORT || 5000;
const app = express();
const jwt = require("jsonwebtoken");
const config = require("config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
const auth = require("./middleware/auth");

//Config for working with ppostgres in localhost environment: (comes from default.json file - environment json)
let configPg = config.get("dbConfig");

if (process.env.NODE_ENV === "production") {
  configPg = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  };
}

const pool = new pg.Pool(configPg);

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
          return res.status(303).send({ msg: "User is already exists" });
        }

        if (err) return res.status(400).send(err);
      }
    );
  });
});

//Invokes if a person is not exists, so I am allowed to insert it!
const createNewPerson = (newUser, res) => {
  let { username, name, password, gender, age, height, weight } = newUser;

  const values = [username, name, password, gender, age, height, weight];
  console.log("Im inside createNewPerson!:", values);

  pool.connect((err, db, done) => {
    if (err) return res.status(400).send(err);

    db.query(
      "INSERT INTO person (username, name, password, gender, age, height, weight) VALUES($1, $2, $3, $4, $5, $6, $7)",
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

  //Connect to the DB - Parameter is a function that gets err - error, db - new client inside the pool, done - release function
  pool.connect((err, db, done) => {
    if (err) {
      console.log("err", err);
      return res.status(400).send(err);
    }
    db.query(
      `SELECT * FROM person WHERE username='${username}'`,
      (err, table) => {
        done();

        //Save the array of objects we get from the database - were getting credentials of user only
        const dataFromDatabase = table.rows[0];

        //If we got nothing from the database, it means the username is not exist in the db
        if (!dataFromDatabase || dataFromDatabase === undefined) {
          res.status(403).send({ msg: "Username is not exist" });
          //We got something because the username exists, however - if the password is not matched it means the password is wrong
        } else if (password !== dataFromDatabase.password) {
          res.status(403).send({ msg: "Password is not matched" });
          //Username and password are matched, which means we can LOGIN! - GET THE DATA OF THE USER AND CREATE A JWT TOKEN
        } else {
          //Calling a function that will return all the stored data of the user, it will be returned to the frontend, and there I will store the object inside redux
          jwt.sign(
            { id: dataFromDatabase.id },
            config.get("jwtSecret"),
            { expiresIn: "7d" },
            (err, token) => {
              if (err) throw error;
              let tok = token;
              getDataOfLoggedUser(dataFromDatabase, res, tok);
            }
          );
        }
        if (err) return res.status(400).send(err);
      }
    );
  });
});

const getDataOfLoggedUser = (newUser, res, token) => {
  console.log("getDataOfLoggedUser invokes!:", newUser);
  pool.connect((err, db, done) => {
    if (err) return res.status(400).send(err);

    db.query(
      `SELECT foodid, foodname, calories, quantity FROM food INNER JOIN person ON (food.person_id = person.id) WHERE person.id='${newUser.id}'`,
      (err, table) => {
        done();

        if (err) return res.status(400).send(err);

        console.log("Got the data from the user !");

        const userData = {
          credentials: newUser,
          food: table.rows,
          token: token,
        };

        console.log("Sending the following data:", userData);

        return res.status(200).send({
          userData: userData,
          msg: "Connection has established successfully",
        });
      }
    );
  });
};

//  @route GET api/getUserData
//  @desc Get user data if jwt token exists
//  @access Private

app.get("/api/getUserData", auth, (req, res) => {
  console.log("inside backend - /api/getUserData");

  const idOfUser = req.user.id;
  let credentials = null;
  let food = null;
  console.log("I'M INSIDE GETUSERDATA, AUTH HAS PASSED!");

  //Connect to the DB - Parameter is a function that gets err - error, db - new client inside the pool, done - release function
  pool.connect((err, db, done) => {
    if (err) return res.status(400).send(err);

    db.query(`SELECT * FROM person WHERE id='${idOfUser}'`, (err, table) => {
      if (err) return res.status(400).send(err);
      credentials = table.rows[0];
    });

    db.query(
      `SELECT foodid, foodname, calories, quantity FROM food INNER JOIN person ON (food.person_id = person.id) WHERE person.id='${idOfUser}'`,
      (err, table) => {
        done();

        if (err) return res.status(400).send(err);

        food = table.rows;
        const userData = { credentials, food };
        console.log("Sending the following data:", userData);

        return res.status(200).send({
          userData: userData,
          msg: "Connection has established successfully",
        });
      }
    );
  });
});

//Increase Food - add new row or increase quantity
app.post("/api/increaseFood", auth, (req, res) => {
  console.log("inside backend - /api/addFood");
  console.log("REQ BODY:", req.body);

  const idOfUser = req.user.id;
  const foodReq = req.body;
  const values = [
    idOfUser,
    foodReq.foodid,
    foodReq.foodname,
    foodReq.calories,
    1,
  ];

  pool.connect(async (err, db, done) => {
    if (err) return res.status(400).send(err);

    let updatingExistingFood = new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM food WHERE person_id='${idOfUser}' AND foodid='${foodReq.foodid}'`,
        (err, table) => {
          if (err) return res.status(400).send(err);

          console.log("SELECT ALL FROM FOOD WHERE... ", table.rows);
          console.log(table.rows.length);

          if (table.rows.length > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      );
    });

    if (await updatingExistingFood) {
      db.query(
        `UPDATE food SET quantity=quantity+1 WHERE person_id='${idOfUser}' AND foodid='${foodReq.foodid}' RETURNING foodid, foodname, calories, quantity;`,
        (err, table) => {
          done();

          console.log(
            "FROM SERVER, AFTER INSERT FOOD WHAT I GET: ",
            table.rows[0]
          );

          if (err) return res.status(400).send(err);

          console.log("A new food has been added successfully!");
          return res.status(201).send({
            addedFood: table.rows[0],
            msg: "Food has been successfully added",
          });
        }
      );
    } else {
      db.query(
        "insert into food (person_id, foodid, foodname, calories, quantity) VALUES ($1, $2, $3, $4, $5) RETURNING foodid, foodname, calories, quantity;",
        [...values],
        (err, table) => {
          done();

          console.log(
            "FROM SERVER, AFTER INSERT FOOD WHAT I GET: ",
            table.rows[0]
          );

          if (err) return res.status(400).send(err);

          console.log("A new food has been added successfully!");
          return res.status(201).send({
            addedFood: table.rows[0],
            msg: "Food has been successfully added",
          });
        }
      );
    }
  });
});

//Decrease Food - remove a row or decrease quantity
app.post("/api/decreaseFood", auth, (req, res) => {
  console.log("inside backend - /api/decreaseFood");

  const idOfUser = req.user.id;
  const foodReq = req.body;

  pool.connect(async (err, db, done) => {
    if (err) return res.status(400).send(err);

    let decreaseFood = new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM food WHERE person_id='${idOfUser}' AND foodid='${foodReq.foodid}'`,
        (err, table) => {
          if (err) return res.status(400).send(err);

          console.log("table.rows", table.rows);

          if (table.rows[0] && table.rows[0].quantity > 1) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      );
    });

    if (await decreaseFood) {
      console.log("BACKEND - DECREASEFOOD");
      db.query(
        `UPDATE food SET quantity=quantity-1 WHERE person_id=${idOfUser} AND foodid='${foodReq.foodid}' RETURNING foodid, foodname, calories, quantity;`,
        (err, table) => {
          done();

          console.log(
            "FROM SERVER, AFTER DECREASE FOOD WHAT I GET: ",
            table.rows[0]
          );

          if (err) return res.status(400).send(err);

          console.log("Food has been decreased successfully!");
          return res.status(201).send({
            selectedFood: table.rows[0],
            msg: "Food has been decreased successfully",
          });
        }
      );
    } else {
      console.log("BACKEND - REMOVEFOOD");
      db.query(
        `DELETE FROM food WHERE person_id='${idOfUser}' AND foodid='${foodReq.foodid}' RETURNING foodid;`,
        (err, table) => {
          done();

          if (err) return res.status(400).send(err);

          console.log("Food has been removed successfully!");
          return res.status(201).send({
            foodRemoved: true,
            msg: "Food has been removed",
          });
        }
      );
    }
  });
});

app.post("/api/updateAvatar", auth, (req, res) => {
  console.log("inside backend - /api/updateAvatar");
  console.log("REQ BODY:", req.body);

  const idOfUser = req.user.id;
  const avatarUrl = req.body.avatarUrl;

  pool.connect((err, db, done) => {
    if (err) return res.status(400).send(err);

    db.query(
      `UPDATE person SET avatar='${avatarUrl}' WHERE id='${idOfUser}'`,
      (err, table) => {
        done();

        if (err) return res.status(400).send(err);

        console.log("Avatar has been updated successfully!");
        return res.status(201).send({
          msg: "Food has been successfully added",
        });
      }
    );
  });
});

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
