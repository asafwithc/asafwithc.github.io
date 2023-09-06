const Booking = require("../models/booking");

exports.postBooking = (req, res, next) => {
  const userId = req.userId;
  const caravanId = req.body.caravanId;
  const bookingDates = req.body.bookingDates;
  const pricePerNight = req.body.pricePerNight * 100;
  
  
  const booking = new Booking({
    userId: userId,
    caravanId: caravanId,
    bookingDates: bookingDates,
    totalPrice: bookingDates.length * pricePerNight,
  });

  booking
    .save()
    .then((booking) => res.status(200).json(booking))
    .catch((err) => {
      err.statusCode = !err.statusCode ? 500 : err.statusCode;
      next(err);
    });
};
