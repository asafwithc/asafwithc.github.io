const stripe = require("stripe")(process.env.STRIPE_SECRET);
const Booking = require("../models/booking");

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

exports.paymentSheet = async (req, res) => {
  // const paymentIntent = await stripe.paymentIntents.create({
  //     amount: 1000,
  //     currency: 'try',
  //     payment_method_types: ['card']
  // });

  // res.json({
  //     paymentIntent: paymentIntent.client_secret,
  //     publishableKey: process.env.STRIPE_SECRET
  // });
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "karavan",
            description: "deneme deneme deneme"
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    metadata: { user_id: "123123", caravan_id: "41241", amunt: "aw" },
    mode: "payment",
    payment_method_types: ["card"],
    success_url: "http://localhost:3010/success",
    cancel_url: "http://localhost:3010/cancel",
  });

  res.redirect(303, session.url);
};

// exports.success = (req, res, next) => {
//   console.log(req);
//   next();
// };

exports.managePostPayment = (req, res) => {
    let event = req.body;
    
    if (endpointSecret) {
        const signature = req.headers['stripe-signature'];
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
    console.log(reqBody.data.object.metadata.user_id);

    switch (reqBody.type) {
        case 'payment_intent.succeeded':
          const paymentIntentSucceeded = reqBody.data.object;
          // Then define and call a function to handle the event payment_intent.succeeded
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${reqBody.type}`);
    } 


    res.status(200).json({message: reqBody.type});
}
