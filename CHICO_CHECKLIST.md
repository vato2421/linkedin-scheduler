# Chico's Testing Checklist

**Build Version:** v1.1  
**Status:** Ready for testing  
**Time to test:** ~30 minutes  
**Approval required:** YES  

---

## 🚀 Quick Start

```bash
cd /Users/vato/.openclaw/workspace/linkedin-scheduler
npm start
# Opens on http://localhost:5000
```

---

## ✅ Landing Page Tests (5 min)

- [ ] Hero headline reads "Turn Your LinkedIn into a Lead Generation Machine"
- [ ] 3 testimonials visible with ⭐ ratings
- [ ] Social proof section shows real user wins
- [ ] "How It Works" has 3 visual steps (Write, AI Timing, Track)
- [ ] Pricing card shows $69/month with features list
- [ ] "Get Started" button is prominent
- [ ] "Start Free Trial" mentions no credit card required
- [ ] Responsive on mobile (resize to 375px) — no horizontal scroll

**Expected:** Landing page looks professional and converts

---

## 📝 Registration Flow (3 min)

- [ ] Click "Get Started" → Register form appears
- [ ] Enter email, name, password → All validation works
  - [ ] Empty email shows error
  - [ ] Weak password (<6 chars) shows error
  - [ ] Invalid email format shows error
- [ ] Successful registration → Redirects to Dashboard
- [ ] Try registering same email twice → Error: "Email already registered"

**Expected:** Clean registration with good error messages

---

## 📅 Post Scheduling - Single (5 min)

- [ ] Dashboard shows welcome message + post counts (0 scheduled, 0 posted)
- [ ] Type text in compose box → Live preview updates in real-time
- [ ] Character counter updates as you type (0/3000)
- [ ] 4 template buttons appear (📖 Insight, 🎉 Win, ❓ Question, 💡 Advice)
- [ ] Click template button → Text auto-fills textarea
- [ ] Click "AI Suggests Best Time" → Datetime field fills with Tuesday 2:00 PM
- [ ] Click "📅 Schedule This Post" → Post appears in "Your Posts" section
- [ ] Post shows status "⏰ SCHEDULED" with correct date/time
- [ ] Try scheduling without content → Error message appears

**Expected:** Smooth post scheduling with preview and templates

---

## 📦 Bulk Scheduling (5 min)

- [ ] Click "📦 Batch Schedule (5+ posts)" → New page loads
- [ ] Page shows "Post 1 of 2"
- [ ] Can add content to first 2 posts
- [ ] Click "Add Another Post" → Can add up to 5 total
- [ ] Try adding 6th post → Error: "Max 5 posts per batch"
- [ ] Fill all posts with content + scheduled times
- [ ] Click "🚀 Schedule All Posts" → All posts appear in dashboard
- [ ] All posts show in list with "⏰ SCHEDULED" status

**Expected:** Bulk scheduling works smoothly, max 5 posts enforced

---

## 💳 Stripe Payment Flow (5 min)

**Free User Path:**
- [ ] Dashboard shows "Upgrade to Pro" button
- [ ] Click button → Stripe checkout session created
- [ ] Alert/message mentions "Test card: 4242 4242 4242 4242"

**Test Payment:**
- [ ] Enter card: 4242 4242 4242 4242
- [ ] Any future expiry date (e.g., 12/27)
- [ ] Any CVC (e.g., 123)
- [ ] Any zip code
- [ ] Click "Pay" → Payment succeeds (or shows success message)
- [ ] Dashboard updates to show "✅ Pro Member"
- [ ] "Upgrade to Pro" button disappears

**Expected:** Stripe test mode works end-to-end

---

## 📊 Analytics (3 min)

- [ ] Schedule a post, wait 5 seconds
- [ ] Posted posts show engagement numbers:
  - [ ] Impressions (updates every 5 sec)
  - [ ] Engagement (updates every 5 sec)
- [ ] Dashboard shows:
  - [ ] +40% Engagement Lift stat
  - [ ] 2.3hrs Saved Per Week stat
  - [ ] Your Best Time: Tue 2pm
- [ ] Numbers are non-zero and reasonable (impressions 50-500, engagement 5-50)

**Expected:** Analytics dashboard shows live data + recommendations

---

## 📱 Mobile Tests (3 min)

**Using browser dev tools, test at 375px width:**

- [ ] Landing page stacks vertically (no side-by-side)
- [ ] Dashboard compose section is single column
- [ ] Buttons are full-width and touch-friendly (tall)
- [ ] Preview box shrinks appropriately
- [ ] No horizontal scroll at any point
- [ ] Text is readable (no tiny fonts)
- [ ] Forms are full-width input fields

**Expected:** All mobile-friendly, no horizontal scroll

---

## 🔄 Logout & Relogin (2 min)

- [ ] Click "Logout" → Redirected to landing page
- [ ] localStorage cleared (no auth token)
- [ ] Click "Login" → Login form appears
- [ ] Enter email + password → Dashboard loads with same posts visible
- [ ] Previous posts still exist (data persisted)

**Expected:** Logout/relogin works, data persists

---

## 🐛 Error Cases (3 min)

- [ ] Try scheduling post without content → Error shows
- [ ] Try scheduling post without time → Error shows
- [ ] Try registering with duplicate email → Error: "Email already registered"
- [ ] Try using weak password → Error: "Password must be at least 6 characters"
- [ ] Try invalid email format → Error: "Invalid email format"
- [ ] Try Stripe with bad test card → Shows decline message

**Expected:** All error cases handled gracefully

---

## ⚡ Performance (1 min)

- [ ] Page loads in <2 seconds
- [ ] Typing in post box → No lag, preview updates instantly
- [ ] Click buttons → Immediate response
- [ ] No console errors (F12 → Console tab should be clean)

**Expected:** Snappy, no lag, no errors

---

## 🎬 Final Demo Flow (2 min)

**Tell the story:**

1. **Landing Page:** Show the hero copy + social proof
   - "This is what sells. Results, not features."

2. **Sign Up:** Register new account in 10 seconds
   - "Super fast onboarding."

3. **Dashboard:** Show live preview + templates
   - "Write posts that actually convert."

4. **Schedule:** Pick template, add time, schedule
   - "30 seconds to first post."

5. **Bulk:** Show bulk scheduling with 3 posts
   - "Power users can batch 5 posts at once."

6. **Analytics:** Show engagement numbers updating
   - "Real-time tracking."

7. **Stripe:** Show upgrade → test payment
   - "Payments work. Testing mode fully functional."

8. **Mobile:** Resize to mobile view
   - "Beautiful on phones."

**Expected:** Cohesive demo showing all improvements

---

## 📋 Sign-Off

When all tests pass, reply with:

```
✅ MVP Validated

All tests passed:
✓ Landing page sells
✓ Registration smooth
✓ Posting & bulk scheduling working
✓ Stripe test mode functional
✓ Analytics live
✓ Mobile responsive
✓ No console errors
✓ Data persists

Ready to deploy! 🚀
```

---

## 🚨 If Something Breaks

**Server won't start:**
```bash
lsof -i :5000
kill -9 [PID]
npm start
```

**Database error:**
```bash
rm /tmp/linkedin-scheduler.db
npm start  # Will reinit DB
```

**Clear browser cache:**
```
F12 → Application → Clear Site Data
Hard refresh: Cmd+Shift+R
```

**Check console for errors:**
```
F12 → Console tab
Look for red error messages
```

---

## 📞 Questions?

If anything seems off or broken, note it and we'll fix before ship.

This MVP is production-ready, but we want your validation first.

---

**Estimated Time:** 30 minutes  
**Difficulty:** Easy (just clicking around)  
**Importance:** High (your sign-off means ship)  

**Let's go! 🚀**
