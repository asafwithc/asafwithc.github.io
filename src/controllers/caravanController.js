const Caravan = require("../models/caravan");

exports.postAddCaravan = (req, res, next) => {
  const caravanModel = req.body.model;
  const caravanYear = req.body.year;
  const userId = req.user._id;
  const caravan = new Caravan({
    model: caravanModel,
    year: caravanYear,
    userId: userId,
  });

  caravan
    .save()
    .then(caravan => res.status(200).json(caravan))
    .catch((err) => res.status(500).json({ message: err.message }));
  // Caravan.create(req.body)
  //   .then((caravan) => res.status(200).json(caravan))
  //   .catch((err) => res.status(500).json({ message: err.message }));
};
