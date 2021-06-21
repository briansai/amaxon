const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const admin = require('firebase-admin');
const {
  type,
  project_id,
  private_key_id,
  private_key,
  client_id,
  client_email,
  auth_uri,
  token_uri,
  auth_provider_x509_cert_url,
  client_x509_cert_url,
} = functions.config().amazonian;

admin.initializeApp({
  credential: admin.credential.cert({
    type,
    project_id,
    private_key_id,
    private_key: private_key.replace(/\\n/g, '\n'),
    client_email,
    client_id,
    auth_uri,
    token_uri,
    auth_provider_x509_cert_url,
    client_x509_cert_url,
  }),
});

const stripe = require('stripe')(process.env.STRIPE_SECRET_API);
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('hello world');
});

app.post('/payment/create', async (req, res) => {
  const { total } = req.query;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'usd',
    });

    console.log('Payment Request Received >>>>> ', total);

    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    throw new Error(err);
  }
});

exports.api = functions.https.onRequest(app);
