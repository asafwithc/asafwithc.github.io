const stripe = require('stripe')(process.env.STRIPE_SECRET);
const Booking = require('../models/booking');

const endpointSecret = 'whsec_a3ed6bb8e982c413c9713227d86bdfff85a7c5d7100b6bf55cc56da359aae5a9';


exports.paymentSheet = async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1000,
        currency: 'try',
        payment_method_types: ['card']
    });

    res.json({
        paymentIntent: paymentIntent.client_secret,
        publishableKey: process.env.STRIPE_SECRET
    });
}

exports.managePostPayment = (req, res) => {
    let event = request.body;

    if (endpointSecret) {
        const signature = request.headers['stripe-signature'];
        try {
          event = stripe.webhooks.constructEvent(
            request.body,
            signature,
            endpointSecret
          );
        } catch (err) {
          console.log(`⚠️  Webhook signature verification failed.`, err.message);
          return response.sendStatus(400);
        }
    }

    switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntentSucceeded = event.data.object;
          // Then define and call a function to handle the event payment_intent.succeeded
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
    }
    
    
    console.log(req.body.type);


    res.status(200).json({message: req.body.type});
}