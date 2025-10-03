const xummService = require('../services/xumm.service');

// Store pending payloads waiting for user signature
const pendingPayloads = new Map();

function showLogin(req, res) {
  res.render('login');
}

async function createLoginPayload(req, res) {
  try {
    const payload = await xummService.createSignInRequest();

    // Subscribe to WebSocket and store callback
    xummService.subscribeToPayload(payload.uuid, payload.websocketUrl, (data) => {
      const pendingRequest = pendingPayloads.get(payload.uuid);
      if (pendingRequest) {
        pendingRequest.resolve(data);
        pendingPayloads.delete(payload.uuid);
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

    // Wait for WebSocket callback or timeout
    const result = await new Promise((resolve, reject) => {
      pendingPayloads.set(uuid, { resolve, reject });

      // Timeout after 5 minutes
      setTimeout(() => {
        if (pendingPayloads.has(uuid)) {
          pendingPayloads.delete(uuid);
          reject(new Error('Timeout'));
        }
      }, 5 * 60 * 1000);
    });

    if (result.signed && result.userAccount) {
      req.session.user = { account: result.userAccount };
      req.session.save(() => res.json({ success: true, signed: true, account: result.userAccount }));
    } else {
      res.json({ success: false, signed: false, expired: result.expired });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Verification failed' });
  }
}

function logout(req, res) {
  req.session.destroy(() => res.redirect('/'));
}

module.exports = { showLogin, createLoginPayload, verifyPayload, logout };
