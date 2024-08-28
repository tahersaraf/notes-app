exports.isLoggedIn = function (req, res, next) {
  if (req.user) {
    req.session.touch();
    next();
  } else {
    return res.status(401).send("Access Denied");
  }
};
