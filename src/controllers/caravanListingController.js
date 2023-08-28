const Caravan = require("../models/caravan");

exports.postAddCaravanListing = (req, res) => {
  const userId = req.user._id;
  const accomodation = req.body.accomodation;
  const caravanType = req.body.caravanType;
  const caravan = new Caravan({
    userId: userId,
    accomodation: accomodation,
    caravanType: caravanType,
  });

  caravan
    .save()
    .then((caravan) => res.status(200).json(caravan))
    .catch((err) => res.status(500).json({ message: err.message }));
};

exports.getGetCaravansOfUser = (req, res) => {
  const userId = req.user._id;

  Caravan.find({ userId: userId }).select('-_id -userId -__v').then((result) =>
    res.status(200).json(result)
  );
};
