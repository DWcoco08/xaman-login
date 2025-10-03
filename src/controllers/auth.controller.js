const xummService = require('../services/xumm.service');

function showLogin(req, res) {
  res.render('login');
}

async function createLoginPayload(req, res) {
  try {
    const io = req.app.get('io');
    const payload = await xummService.createSignInRequest();

    xummService.subscribeToPayload(payload.uuid, payload.websocketUrl, (data) => {
      if (data.signed && data.userAccount) {
        io.emit(`payload-${payload.uuid}`, { signed: true, account: data.userAccount });
      } else if (data.expired) {
        io.emit(`payload-${payload.uuid}`, { expired: true });
      }
    });

    res.json({ success: true, data: payload });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create login request' });
  }
}

async function verifyPayload(req, res) {
  try {
    const { uuid } = req.params;
    const result = await xummService.getPayloadResult(uuid);

    if (result.signed && result.userAccount) {
      req.session.user = { account: result.userAccount, connectedAt: new Date() };
      req.session.save(() => res.json({ success: true, signed: true }));
    } else {
      res.json({ success: true, signed: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Verification failed' });
  }
}

function logout(req, res) {
  req.session.destroy(() => res.redirect('/'));
}

module.exports = { showLogin, createLoginPayload, verifyPayload, logout };
