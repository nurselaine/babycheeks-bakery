require('dotenv').config();

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_BASE_URL } = process.env;

const handleResponse = async (response) => {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (error) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
};

// make into middleware?
const generateAccessToken = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET){
      throw new Error('MISSING_API_CREDENTIALS');
    }

    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ':' + PAYPAL_CLIENT_SECRET,
    ).toString('base64');
    const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
      method: 'POST',
      body: 'grant_type=client_credentials',
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Failed to generate Access Token: ', error);
  }
};

const createOrder = async (cart) => {
  // use the cart information passed from the front-end to calculate the purchase unit details
  console.log(
    'shopping cart information passed from the frontend createOrder() callback:',
    JSON.stringify(cart),
  );

  let total = cart.total.toFixed(2);
  console.log('TOTAL: ', total);
  const accessToken = await generateAccessToken();
  console.log('Access token: ', accessToken);
  const url = `${PAYPAL_BASE_URL}/v2/checkout/orders`;
  const payload = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: cart.total.toFixed(2),
        },
      },
    ],
  };

  console.log('PAYLOAD', payload);

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
};

// capture order - move money from payer to merchant
const captureOrder = async (orderID) => {
  console.log('CAPTURE ORDER, orderID: ', orderID);

  const accessToken = await generateAccessToken();
  console.log('Generated access token', accessToken);
  const url = `${PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  // response will contain status: complete, order ID and info, payment status complete and seller info
  return handleResponse(response);
};

module.exports = {
  handleResponse,
  createOrder,
  captureOrder,
};
