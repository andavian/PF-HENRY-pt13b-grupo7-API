require("dotenv").config();
const axios = require("axios");
const { PAYPAL_API, PAYPAL_API_CLIENT, PAYPAL_API_SECRET } = process.env;

const accessToken = async () => {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  const {
    data: { access_token },
  } = await axios.post(
    "https://api-m.sandbox.paypal.com/v1/oauth2/token",
    params,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: PAYPAL_API_CLIENT,
        password: PAYPAL_API_SECRET,
      },
    }
  );
  console.log(access_token);
  return access_token;
};

const createOrder = async (req, res) => {
  const { value } = req.body;
  const order = {
    intent: "CAPTURE",
    //purchase_units,
    purchase_units: [
      {
        reference_id: "d9f80740-38f0-11e8-b467-0ed5f89f718b",
        amount: {
          currency_code: "USD",
          value,
        },
        //items,
      },
    ],
    application_context: {
      brand_name: "Henry Shop",
      locale: "en-US",
      landing_page: "LOGIN",
      user_action: "PAY_NOW",
      return_url: "http://localhost:3001/payment/capture-order",
      cancel_url: "http://localhost:3000/store",
    },
  };

  const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
    headers: {
      Authorization: `Bearer ${await accessToken()}`,
    },
  });

  res.json(response.data);
};

const captureOrder = async (req, res) => {
  const { token, PayerID } = req.query;

  const { data } = await axios.post(
    `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await accessToken()}`,
        Prefer: "return=representation",
      },
    }
  );

  // if (
  //   data.status === "COMPLETED"
  // ) {
  //   const newOrder = await Order.create({
  //     id: titleLowerCase,
  //     price,
  //     description: descriptionLowerCase,
  //     primaryimage,
  //     categoryId,
  //   });
  // }
  console.log(data.purchase_units);
  res.redirect("http://localhost:3000/confirmacion");
};

const cancelOrder = (req, res) => {
  const { token, PayerID } = req.query;
  res.redirect("http://localhost:3000/cart");
};

module.exports = { createOrder, captureOrder, cancelOrder };
