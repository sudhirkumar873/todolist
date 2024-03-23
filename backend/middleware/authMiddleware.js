const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(req.cookies.jwt);

  if(token) {
    jwt.verify(token, 'signature', (err, decodeToken) => {
      if(err){
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodeToken);
        next();
      }
    })
  } else {
    res.json({status:false})
  }
}

module.exports = {requireAuth};