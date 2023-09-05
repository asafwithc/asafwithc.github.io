const stripe = require('stripe')(process.env.STRIPE_SECRET);
const Booking = require('../models/booking');

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
              currency: 'usd',
              product_data: {
                name: 'T-shirt',
              },
              unit_amount: 2000,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        payment_method_types: ['card'],
        success_url: 'http://localhost:3010/success',
        cancel_url: 'http://localhost:3010/cancel',
      });
    
      res.redirect(303, session.url);
    
}

exports.success = (req, res, next) => {
  console.log(req);
  next();
}

// exports.managePostPayment = (req, res) => {
//     let event = request.body;

//     if (endpointSecret) {
//         const signature = request.headers['stripe-signature'];
//         try {
//           event = stripe.webhooks.constructEvent(
//             request.body,
//             signature,
//             endpointSecret
//           );
//         } catch (err) {
//           console.log(`⚠️  Webhook signature verification failed.`, err.message);
//           return response.sendStatus(400);
//         }
//     }

//     switch (event.type) {
//         case 'payment_intent.succeeded':
//           const paymentIntentSucceeded = event.data.object;
//           // Then define and call a function to handle the event payment_intent.succeeded
//           break;
//         // ... handle other event types
//         default:
//           console.log(`Unhandled event type ${event.type}`);
//     }
    
    
//     console.log(req.body.type);


//     res.status(200).json({message: req.body.type});
// }