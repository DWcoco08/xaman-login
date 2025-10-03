/**
 * Check if user is authenticated
 */
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect('/');
}

/**
 * Check if user is not authenticated (for login page)
 */
function isNotAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return res.redirect('/dashboard');
  }
  next();
}

module.exports = {
  isAuthenticated,
  isNotAuthenticated
};
