// import axios from 'axios';
// import { Stripe } from '@stripe/stripe-js';
// // import { loadStripe } from '@stripe/stripe-js';
// import { showAlert } from './alerts';
// // import Stripe from 'stripe';

// const stripe = Stripe(
//   'pk_test_51Mp8VrSIGN8qdH2eGdthI4GrMDVUMFLiXtNvzVMLej9PcHBemU6YvOyNnxtbjHTCRxirOj7oe0po3RSzF5rMsPPJ00KcaEZ3WG'
// );

// export const bookTour = async (res, tourId) => {
//   try {
//     // 1) Get checkout session from API

//     const session = await axios(
//       `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
//     );
//     console.log(session);

//     // 2) Create checkout form + chance credit card
//     // res.redirect(303, session.url);
//   } catch (err) {
//     console.log(err);
//     showAlert('error', err);
//   }
// };

// ===================================================================================

import axios from 'axios';
import { showAlert } from './alerts';
import { loadStripe } from '@stripe/stripe-js';

const Stripe = require('stripe');

// const stripe = Stripe('pk_test_5*********************************');

export const bookTour = async (tourId) => {
  const stripe = await loadStripe(
    'pk_test_51MqU2XSHFwgd3OhuThWl03vnevjNmiqsneizykj3REUUBSNGyu7PeNaQm22JwxE1Ttj6SFVoljcuX1DgUPZQUtrr00qa9C7LMN'
  );

  try {
    //1) Get Checkout session
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    //2) Stripe object to create checkout form + charge credit card for us

    // console.log(session);

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error');
  }
};
