# NFT Marketplace - Xaman Login

NFT Marketplace with Xaman wallet authentication using WebSocket real-time notifications.

## Features

- 🎨 Modern dark UI with gradient design
- 🔐 Xaman wallet authentication
- ⚡ Real-time WebSocket updates
- 🔔 Toast notifications
- 📱 Responsive design
- 🚀 GitHub Actions CI/CD

## Tech Stack

- **Backend**: Node.js, Express, Socket.IO
- **Frontend**: Vanilla JS, EJS
- **Authentication**: XUMM SDK
- **Real-time**: WebSocket (ws), Socket.IO

## Installation

```bash
npm install
cp .env.example .env
# Update .env with your XUMM API credentials
npm start
```

## Environment Variables

```env
XUMM_API_KEY=your-api-key
XUMM_API_SECRET=your-api-secret
PORT=3000
SESSION_SECRET=your-secret
```

## Project Structure

```
nft-marketplace/
├── src/
│   ├── config/         # App configuration
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Auth middleware
│   ├── routes/         # API routes
│   ├── services/       # XUMM service
│   ├── views/          # EJS templates
│   └── server.js       # Main server
├── public/
│   ├── css/            # Styles
│   └── js/             # Client scripts
├── .env.example
├── .gitignore
└── package.json
```

## Deployment

Auto-deploy via GitHub Actions on push to main branch.

## License

MIT
