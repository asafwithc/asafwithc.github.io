const Caravan = require("../models/caravan");

const CARAVANS_PER_PAGE = 5;

exports.postAddCaravanListing = (req, res) => {
  const userId = req.user._id;
  const accomodation = req.body.accomodation;
  const caravanType = req.body.caravanType;
  const images = req.file;
  const caravan = new Caravan({
    userId: userId,
    accomodation: accomodation,
    caravanType: caravanType,
    imagesPath: images,
  });

  caravan
    .save()
    .then((caravan) => res.status(200).json(caravan))
    .catch((err) => res.status(500).json({ message: err.message }));
};

exports.getGetCaravanListings = (req, res) => {
  const userId = req.user._id;
  const page = req.query.page == null ? 1 : req.query.page;

  Caravan.find({ userId: userId })
    .skip((page - 1) * CARAVANS_PER_PAGE)
    .limit(CARAVANS_PER_PAGE)
    .select("-_id -userId -__v")
    .then((result) => res.status(200).json(result));
};
