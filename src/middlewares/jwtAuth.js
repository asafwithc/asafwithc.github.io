const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.authJWT = (user) => {
  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);
  return accessToken;
}

exports.authenticate = (req, res, next) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user)
      return res.status(500).json({ message: "User not found." });
    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);
    res.json({ Token: accessToken });
  });
};

exports.authorize = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(500).json({ message: "No JWT token found." });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(500).json({ message: err });
    req.user = user.user;
    next();
  });
};
