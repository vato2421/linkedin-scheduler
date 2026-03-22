# Quick Test Flows - Run These to Validate MVP

## 1️⃣ Basic Auth Flow (2 min)

```bash
# Start server
npm start

# In another terminal, test registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123",
    "name": "Test User"
  }'

# Response should have: token, userId, message
```

**Expected:** ✅ Returns JWT token + user ID

---

## 2️⃣ Post Scheduling Flow (3 min)

```bash
# Use token from above (replace TOKEN with actual token)
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Schedule a post
curl -X POST http://localhost:5000/api/posts/schedule \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "userId": 1,
    "content": "This is my first post using PostScheduler!",
    "scheduledTime": "2026-03-25T14:00:00Z"
  }'

# Response should have: postId, status: "scheduled", scheduledTime

# Get user posts
curl http://localhost:5000/api/posts/user/1
```

**Expected:** ✅ Post created with ID, status shows "scheduled"

---

## 3️⃣ Stripe Checkout Flow (3 min)

```bash
# Create checkout session
curl -X POST http://localhost:5000/api/billing/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1
  }'

# Response should have: sessionId, sessionUrl, message about test card
```

**Expected:** ✅ Stripe session created, URL returned

---

## 4️⃣ Analytics Flow (2 min)

```bash
# Get post analytics
curl http://localhost:5000/api/analytics/1

# Response: impressions, engagement, clicks, updated_at

# Get dashboard analytics (requires userId)
curl http://localhost:5000/api/analytics/dashboard/1
```

**Expected:** ✅ Analytics data with metrics + recommendation

---

## 5️⃣ Full UI Test (10 min)

1. Open http://localhost:5000 in browser
2. **Landing page should show:**
   - Hero copy about "40% More Engagement"
   - 3 testimonials from beta users
   - "How it Works" section (3 steps)
   - Pricing card with "Start Free Trial"
   - Mobile responsive

3. **Click "Get Started"**
   - Registration form appears
   - Enter email, name, password
   - Submit → Dashboard loads

4. **On Dashboard:**
   - Shows "Welcome back!" message
   - Compose section with post textarea
   - Live preview on the right (type to see update)
   - Template buttons (📖 Insight, 🎉 Win, etc)
   - "AI Suggests Best Time" button
   - Post scheduling input

5. **Schedule a Post:**
   - Type: "My first LinkedIn post via PostScheduler!"
   - Click "AI Suggests Best Time" → Tuesday 2pm fills in
   - Click "📅 Schedule This Post"
   - See post appear in "Your Posts" section with SCHEDULED badge

6. **Click Bulk Schedule:**
   - New page loads with "Post 1 of 2"
   - Add 2 posts with content + times
   - Click "Schedule All Posts"
   - Both posts appear in dashboard

7. **Test Mobile:**
   - Resize browser to 375px wide
   - Landing page should stack vertically
   - Dashboard forms should be full-width
   - Buttons should be touch-friendly (tall)

8. **Test Billing (Optional):**
   - Click "Upgrade to Pro"
   - Stripe checkout appears
   - Test card: 4242 4242 4242 4242
   - Any expiry date (future)
   - Any CVC
   - Should show success message

---

## 🔍 Validation Checklist

### Landing Page
- [ ] Hero headline reads well
- [ ] Testimonials display with stars
- [ ] CTA button is visible and clickable
- [ ] "How It Works" section has 3 steps
- [ ] Pricing shows $69/month + features list
- [ ] Mobile responsive (test at 375px width)

### Registration
- [ ] Form validates (no empty fields)
- [ ] Password strength check (6+ chars)
- [ ] Email format validation
- [ ] Error messages clear
- [ ] Success creates account + logs in

### Dashboard
- [ ] Shows post count (scheduled/posted)
- [ ] Live preview updates as you type
- [ ] Character counter works
- [ ] Template buttons insert text
- [ ] "AI Suggests Best Time" fills datetime
- [ ] Scheduled post appears in list with correct time
- [ ] Status badge shows "⏰ SCHEDULED"

### Post Scheduling
- [ ] Empty fields show error
- [ ] Datetime validation works
- [ ] Post saves to database
- [ ] Post appears in user's list

### Bulk Scheduling
- [ ] Can add up to 5 posts
- [ ] Can remove posts
- [ ] All posts schedule successfully
- [ ] All appear in dashboard

### Analytics
- [ ] Posted posts show engagement numbers
- [ ] Numbers update every 5 seconds
- [ ] Dashboard shows avg metrics
- [ ] Recommendations appear

### Stripe
- [ ] Checkout button works
- [ ] Stripe session created
- [ ] Test card accepted (4242...)
- [ ] Subscription marked active
- [ ] Pro user can post unlimited

### Mobile
- [ ] No horizontal scroll
- [ ] Touch targets 48px+
- [ ] Forms full-width
- [ ] Text readable at 375px

---

## 🐛 If Something Breaks

### Server won't start
```bash
# Check port 5000 is free
lsof -i :5000

# Kill any process on 5000
kill -9 [PID]

# Try again
npm start
```

### Database error
```bash
# Clear test database
rm /tmp/linkedin-scheduler.db

# Restart server (will reinit DB)
npm start
```

### API requests fail
```bash
# Check server is running
curl http://localhost:5000/api/health

# Check request format (JSON headers)
curl -H "Content-Type: application/json" ...
```

### Frontend doesn't load
```bash
# Make sure index.html is being served
curl http://localhost:5000/

# Check public/ folder exists and has index.html + app.js
ls -la public/
```

---

## ✅ Sign-Off

Once you've validated all flows above, reply with:

**✅ MVP Validated**
- Landing page sells the vision
- Onboarding is <30 seconds
- Post scheduling works smoothly
- Bulk scheduling functional
- Stripe test mode working
- Mobile responsive
- Analytics dashboard live

**Ready to deploy!**
