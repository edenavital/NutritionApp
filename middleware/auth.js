const config = require("config");
const jwt = require("jsonwebtoken");

//Check to make sure header is not undefined, if so, return Forbidden (403)
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  //Check for token
  if (!token) res.status(401).json({ msg: "No token, authorization denied" });

  try {
    //Verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    console.log("auth.js - DECODED: ", decoded);
    //Add user from payload
    req.user = decoded;

    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid" });
  }
};

module.exports = auth;
