const stripe = require("stripe")(process.env.STRIPE_SECRET);
const booking = require("../models/booking");
const Booking = require("../models/booking");

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

// Should be used after a booking created.
exports.paymentSheet = async (req, res, next) => {
  const bookingId = req.body.bookingId;

  if (!bookingId) {
    const err = new Error("Couldn't find the booking.");
    err.statusCode = 404;
    next(err);
  }

  Booking.findById(bookingId)
    .then((booking) => {
      if (!booking) {
        const err = new Error("Couldn't find the booking.");
        err.statusCode = 404;
        throw err;
      } 

      if (booking.isPaid) {
        const err = new Error("Booking have already paid.");
        err.statusCode = 400;
        throw err;
      }

      return stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "try",
              product_data: {
                name: "karavan",
              },
              unit_amount: booking.totalPrice,
            },
            quantity: 1,
          },
        ],
        metadata: { bookingId: bookingId },
        mode: "payment",
        payment_method_types: ["card"],
        success_url: "http://localhost:3010/success",
        cancel_url: "http://localhost:3010/cancel",
      });
    })
    .then((session) => {
      res.redirect(303, session.url);
    })
    .catch((err) => {
      err.statusCode = !err.statusCode ? 500 : err.statusCode;
      next(err);
    });
};

// exports.success = (req, res, next) => {
//   console.log(req);
//   next();
// };

exports.managePostPayment = (req, res, next) => {
  let event = req.body;

  if (endpointSecret) {
    const signature = req.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
    }
  }

  const reqBody = JSON.parse(req.body.toString());

  switch (reqBody.type) {
    case "checkout.session.completed": {
      const sessionObject = reqBody.data.object;

      if (sessionObject.payment_status === "paid") {
        fulfillBooking(sessionObject, next, reqBody.type);
      }
      break;
    }
    
    case "checkout.session.async_payment_succeeded": {
      const sessionObject = reqBody.data.object;

      fulfillBooking(sessionObject, next, reqBody.type);

      break;
    }

    case "checkout.session.async_payment_failed": {
      const session = event.data.object;

      // Send an email to the customer asking them to retry their order
      console.log("başaramadık");

      break;
    }

    default:
    //console.log(`Unhandled event type ${reqBody.type}`);
  }

  res.status(200).end();
};

const fulfillBooking = async (data, next, type) => {
  try {
    const booking = await Booking.findById(data.metadata.bookingId);
    booking.isPaid = true;
    await booking.save();
    
  } catch (err) {
    err.statusCode = !err.statusCode ? 500 : err.statusCode;
    console.log(type);
    next(err);
  }
};
