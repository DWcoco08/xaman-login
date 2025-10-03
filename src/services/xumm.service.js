const { XummSdk } = require('xumm-sdk');
const WebSocket = require('ws');
const config = require('../config/app.config');

const xumm = new XummSdk(config.xumm.apiKey, config.xumm.apiSecret);

async function createSignInRequest() {
  const payload = await xumm.payload.create({
    txjson: { TransactionType: 'SignIn' }
  });

  return {
    uuid: payload.uuid,
    qrUrl: payload.refs.qr_png,
    websocketUrl: payload.refs.websocket_status
  };
}

async function getPayloadResult(payloadUuid) {
  const payload = await xumm.payload.get(payloadUuid);

  return {
    signed: payload.meta.signed,
    expired: payload.meta.expired,
    userAccount: payload.response?.account || null
  };
}

function subscribeToPayload(payloadUuid, websocketUrl, callback) {
  const ws = new WebSocket(websocketUrl);

  ws.on('message', async (data) => {
    const message = JSON.parse(data.toString());
    if (message.signed !== undefined) {
      const result = await getPayloadResult(payloadUuid);
      callback(result);
      ws.close();
    }
  });
}

module.exports = {
  createSignInRequest,
  getPayloadResult,
  subscribeToPayload
};
