const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  // app.post('/api/stripe', (req, res) => {
  //   //    console.log(req.body);
  //   stripe.charges.create({
  //     amount: 500,
  //     currency: 'usd',
  //     description: '5 for 5',
  //     source: req.body.id
  //   });

  //here requireLogin is an reference to a fucntion
  // that is automatically called by the express server
  // innternallly when the below  handler is called
  app.post('/api/stripe', requireLogin, async (req, res) => {
    //    console.log(req.body);

    // if (!req.user) {
    //   return res.status(401).send({ error: 'you must logged in' });
    // }
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '5 for 5',
      source: req.body.id
    });
    //  console.log(charge);
    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};
