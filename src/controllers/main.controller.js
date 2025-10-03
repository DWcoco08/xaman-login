function showDashboard(req, res) {
  res.render('dashboard', { user: req.session.user });
}

function showMyNFTs(req, res) {
  res.render('mynfts', { user: req.session.user });
}

function showCreate(req, res) {
  res.render('create', { user: req.session.user });
}

module.exports = { showDashboard, showMyNFTs, showCreate };
