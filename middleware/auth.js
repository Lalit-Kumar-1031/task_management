const jwt = require("jsonwebtoken");
const User = require("../model/user");

exports.auth = async (req, res, next) => {
  try {
    const bearerToken = req.headers["authorization"];

    if (typeof bearerToken != "undefined") {
      const token = bearerToken.split(" ")[1];
      console.log(token);
      const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      console.log(user);
      if (!user) {
        console.log(user);
        return res.status(401).json({ message: "Token is Expired" });
      }
      console.log(`user data got from token =>${user}`);
      req.userId = user.userId;
      next();
    } else {
      console.log(" this is executed");
      return res.status(401).json({ message: "No Token Provided" });
    }
  } catch (err) {
    console.log("catch is executed");
    console.log(err.name);

    return res.status(401).json({ error: err.message });
  }
};
