const stripe = require('stripe')(require('../environement').STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
    try {
        const { amount, currency } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types: ['card'],
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createPaymentIntent };