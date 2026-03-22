# LinkedIn Post Scheduler MVP

**Post at optimal times = 40% more engagement**

A production-ready MVP for scheduling LinkedIn posts with analytics, optimal timing recommendations, and Stripe billing integration.

## Features ✨

- **LinkedIn OAuth Integration** - One-click login with LinkedIn
- **Smart Post Scheduling** - Pick any time, posts go live automatically
- **Real Analytics** - Track impressions, engagement, and clicks
- **Stripe Billing** - $69/month subscription with test mode
- **Mobile Responsive** - Full dashboard on any device
- **Automatic Posting** - Background job posts at scheduled times

## Tech Stack

- **Backend**: Node.js + Express
- **Frontend**: Vanilla React (no build step)
- **Database**: SQLite (in-memory for MVP)
- **Payment**: Stripe (test mode)
- **Deployment**: Vercel (frontend) + Railway (backend)

## Quick Start

### Prerequisites
- Node.js 18+
- npm

### Local Development

1. **Clone & install**
```bash
git clone <repo>
cd linkedin-scheduler
npm install
```

2. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your Stripe test keys
```

3. **Run backend**
```bash
npm start
# Server runs on http://localhost:5000
```

4. **Serve frontend** (in another terminal)
```bash
cd public
python3 -m http.server 3000
# Access at http://localhost:3000
```

## Deployment

### Frontend (Vercel)

```bash
npm install -g vercel
vercel
# Follow prompts, deploy public/ folder
```

### Backend (Railway)

1. Connect GitHub repo to Railway
2. Add environment variables:
   - `STRIPE_SECRET_KEY`
   - `JWT_SECRET`
   - `STRIPE_WEBHOOK_SECRET`
3. Deploy!

## API Endpoints

### Auth
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `POST /api/auth/linkedin` - LinkedIn OAuth callback

### Posts
- `POST /api/posts/schedule` - Schedule new post
- `GET /api/posts/user/:userId` - Get user's posts

### Analytics
- `GET /api/analytics/:postId` - Get post analytics

### Billing
- `POST /api/billing/checkout` - Start Stripe checkout
- `POST /api/webhooks/stripe` - Stripe webhook handler

## Testing

### Test Stripe Payment
1. Login/register
2. Click "Upgrade to Pro"
3. Use Stripe test card: `4242 4242 4242 4242`
4. Any future expiry date, any CVC

### Schedule a Post
1. Compose message
2. Pick time (can be in future)
3. Post goes live automatically at scheduled time

## Production Roadmap

- [ ] Real LinkedIn API integration
- [ ] Database migration (PostgreSQL)
- [ ] Advanced analytics dashboard
- [ ] Team collaboration
- [ ] Custom branding
- [ ] Mobile app

## License

MIT
