const Caravan = require("../models/caravan");

exports.getAllCaravans = (req, res, next) => {
  Caravan.find()
    .then((caravans)  => res.status(200).json(caravans))
    .catch((err) => res.status(500).json({ message: err.message }));
};

exports.getCaravansOfUser = (req, res, next) => {
  Caravan.find({ userId: req.userId })
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json({ message: err.message }));
};
