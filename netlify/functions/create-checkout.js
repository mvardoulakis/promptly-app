/* ============================================================
   Promptly — Stripe Checkout Session Creator
   Environment variables required:
     STRIPE_SECRET_KEY  — Stripe secret key (sk_...)
     URL                — Site base URL (set automatically by Netlify)
   ============================================================ */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  let scoreData;
  try {
    const body = JSON.parse(event.body);
    scoreData = body.scoreData;
    if (!scoreData) throw new Error('scoreData missing');
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid request body' })
    };
  }

  const siteUrl = process.env.URL || 'http://localhost:8888';

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1T9wEqJLp0LnBKRTxJWcuKVd',
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: `${siteUrl}/strategy.html?session_id={CHECKOUT_SESSION_ID}&data=${encodeURIComponent(JSON.stringify(scoreData))}`,
      cancel_url: `${siteUrl}/results.html`,
      metadata: {
        stage:      scoreData.stage      || '',
        totalScore: String(scoreData.totalScore || 0),
        industry:   scoreData.industry   || ''
      }
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ url: session.url })
    };
  } catch (err) {
    console.error('Stripe error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create checkout session', detail: err.message })
    };
  }
};
