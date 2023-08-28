const User = require("../models/user");

exports.getUsers = async (req, res, next) => {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(500).json(err));
};

exports.postAddUser = async (req, res, next) => {
  User.create(req.body)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ message: err.message }));
};

exports.postEditUser = async (req, res, next) => {
  const userId = req.params["userId"];

  User.findById(userId)
    .then((user) => User.updateOne(user, req.body))
    .then((ret) => {
      res.status(200).json(ret);
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

exports.getFindById = async (req, res, next) => {
  User.findById(req.params["userId"])
    .then((user) => {
      if(user) res.status(200).json(user);
      else throw new Error('User not found.');
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};
