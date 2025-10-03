function showDashboard(req, res) {
  res.render('dashboard', { user: req.session.user });
}

module.exports = { showDashboard };
