You need Node.js 20.19 or newer, a MongoDB deployment and a Discord application.

```bash
git clone https://github.com/gogeta1232/Bolt.git
cd Bolt
npm ci
cp .env.example .env
npm run dev
```

Fill in `.env` with Discord credentials and database URLs. Never commit this file. Enable the gateway intents used by your deployment in the Developer Portal.

For production:

```bash
npm run validate
npm run db:indexes
npm run build
npm start
```

Use `npm run start:cluster` for a built clustered deployment.
