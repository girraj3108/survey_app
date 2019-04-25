//middleware  is a function  that take a incoming request and
//  has the ability to modify it inside a middleware body inside of
// function

module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'you must logged in!' });
  }
  next();
};
