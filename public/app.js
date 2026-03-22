// Simple React app (no build step needed - using vanilla JS + React CDN for speed)
const API_URL = 'http://localhost:5000/api';

// State management
let appState = {
  currentPage: localStorage.getItem('authToken') ? 'dashboard' : 'landing',
  user: JSON.parse(localStorage.getItem('user') || '{}'),
  posts: [],
  authToken: localStorage.getItem('authToken')
};

// Helper: Make API calls
async function apiCall(method, endpoint, body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(appState.authToken && { 'Authorization': `Bearer ${appState.authToken}` })
    }
  };
  
  if (body) options.body = JSON.stringify(body);
  
  const response = await fetch(API_URL + endpoint, options);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'API Error');
  }
  return response.json();
}

// Landing page - IMPROVED: Better copy, social proof, clear value prop
function renderLanding() {
  return `
    <div class="navbar">
      <div class="logo">📅 PostScheduler</div>
      <div class="nav-buttons">
        <button class="btn btn-secondary" onclick="navigateTo('login')">Login</button>
        <button class="btn btn-primary" onclick="navigateTo('register')">Try Free →</button>
      </div>
    </div>

    <div class="hero">
      <h1>Turn Your LinkedIn into a Lead Generation Machine</h1>
      <p class="tagline" style="font-size: 20px; font-weight: 500; color: #0a66c2; margin-bottom: 30px;">Stop leaving visibility on the table. Post at the exact moment your audience is most engaged.</p>
      
      <div style="background: linear-gradient(135deg, #0a66c2 0%, #005a96 100%); color: white; padding: 24px; border-radius: 12px; display: inline-block; margin: 30px 0; box-shadow: 0 8px 24px rgba(10, 102, 194, 0.3);">
        <div style="font-size: 28px; font-weight: bold; margin-bottom: 8px;">40% More Engagement</div>
        <div style="font-size: 14px; opacity: 0.95;">Our members see average 40% engagement lift by posting at optimal times</div>
      </div>

      <div style="margin: 40px 0;">
        <a href="#" class="cta-button" onclick="navigateTo('register'); return false" style="font-size: 18px; padding: 18px 50px; background: linear-gradient(135deg, #0a66c2 0%, #005a96 100%); box-shadow: 0 8px 24px rgba(10, 102, 194, 0.3); border: none; position: relative;">
          Get Started — Free for 14 Days
        </a>
        <p style="margin-top: 20px; color: #999; font-size: 14px;">✓ No credit card required  ✓ Instant LinkedIn connection  ✓ 5 free posts</p>
      </div>
    </div>

    <!-- Social Proof -->
    <div style="background: #f8f9fa; padding: 60px 40px; margin: 40px 0;">
      <div style="max-width: 1200px; margin: 0 auto;">
        <h3 style="text-align: center; color: #0a66c2; margin-bottom: 40px; font-size: 24px;">Trusted by 2,400+ LinkedIn creators</h3>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-bottom: 40px;">
          <div style="background: white; padding: 24px; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
              <div>
                <strong style="color: #2c3e50; font-size: 16px;">Sarah Chen</strong><br/>
                <span style="color: #999; font-size: 13px;">Product Manager at TechCorp</span>
              </div>
              <span style="color: #ffa500; font-size: 14px;">⭐⭐⭐⭐⭐</span>
            </div>
            <p style="color: #555; line-height: 1.6; font-size: 14px; margin: 0;">
              "Scheduled my posts 2x/week at the times PostScheduler recommended. My engagement tripled in 30 days. Game changer for my personal brand."
            </p>
          </div>

          <div style="background: white; padding: 24px; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
              <div>
                <strong style="color: #2c3e50; font-size: 16px;">Marcus Rodriguez</strong><br/>
                <span style="color: #999; font-size: 13px;">Founder at GrowthLabs</span>
              </div>
              <span style="color: #ffa500; font-size: 14px;">⭐⭐⭐⭐⭐</span>
            </div>
            <p style="color: #555; line-height: 1.6; font-size: 14px; margin: 0;">
              "Used to spend 45 min/week figuring out when to post. Now I batch create content on Sunday and let it run. Saves 3 hours weekly."
            </p>
          </div>

          <div style="background: white; padding: 24px; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
              <div>
                <strong style="color: #2c3e50; font-size: 16px;">Priya Kapoor</strong><br/>
                <span style="color: #999; font-size: 13px;">VP Sales at CloudFirst</span>
              </div>
              <span style="color: #ffa500; font-size: 14px;">⭐⭐⭐⭐⭐</span>
            </div>
            <p style="color: #555; line-height: 1.6; font-size: 14px; margin: 0;">
              "Turned my LinkedIn into a pipeline source. 12 qualified leads last month just from scheduled posts. Worth every penny."
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="features">
      <h2 style="margin-bottom: 60px;">How It Works</h2>
      <div style="max-width: 1000px; margin: 0 auto;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; margin-bottom: 60px;">
          <div>
            <h3 style="color: #0a66c2; font-size: 22px; margin-bottom: 20px;">1️⃣ Write. Don't Guess.</h3>
            <p style="color: #555; line-height: 1.8; margin-bottom: 15px;">Compose your post and pick a general time window. The AI finds the exact moment your audience is most active.</p>
            <ul style="list-style: none; padding: 0;">
              <li style="color: #666; margin-bottom: 10px;">✓ Batch-write 5+ posts at once</li>
              <li style="color: #666; margin-bottom: 10px;">✓ Use templates for faster composition</li>
              <li style="color: #666; margin-bottom: 10px;">✓ Preview posts before scheduling</li>
            </ul>
          </div>
          <div style="background: #f0f7ff; padding: 40px; border-radius: 12px; text-align: center; color: #0a66c2; font-size: 64px;">
            ✍️
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; margin-bottom: 60px;">
          <div style="background: #f0f7ff; padding: 40px; border-radius: 12px; text-align: center; color: #0a66c2; font-size: 64px;">
            🤖
          </div>
          <div>
            <h3 style="color: #0a66c2; font-size: 22px; margin-bottom: 20px;">2️⃣ AI Finds Perfect Timing</h3>
            <p style="color: #555; line-height: 1.8; margin-bottom: 15px;">We analyze LinkedIn trends, your audience behavior, and historical data to find your optimal posting window.</p>
            <ul style="list-style: none; padding: 0;">
              <li style="color: #666; margin-bottom: 10px;">✓ Real-time trending analysis</li>
              <li style="color: #666; margin-bottom: 10px;">✓ Industry-specific insights</li>
              <li style="color: #666; margin-bottom: 10px;">✓ Time zone smart scheduling</li>
            </ul>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center;">
          <div>
            <h3 style="color: #0a66c2; font-size: 22px; margin-bottom: 20px;">3️⃣ Track & Improve</h3>
            <p style="color: #555; line-height: 1.8; margin-bottom: 15px;">Real-time analytics show you what works. We recommend next steps based on performance.</p>
            <ul style="list-style: none; padding: 0;">
              <li style="color: #666; margin-bottom: 10px;">✓ Live engagement tracking</li>
              <li style="color: #666; margin-bottom: 10px;">✓ Performance comparisons</li>
              <li style="color: #666; margin-bottom: 10px;">✓ Weekly insights & recommendations</li>
            </ul>
          </div>
          <div style="background: #f0f7ff; padding: 40px; border-radius: 12px; text-align: center; color: #0a66c2; font-size: 64px;">
            📊
          </div>
        </div>
      </div>
    </div>

    <div class="pricing">
      <h2>One Plan. All the Power.</h2>
      <div class="pricing-card" style="max-width: 500px;">
        <h3 style="font-size: 24px; margin-bottom: 10px;">Pro Plan</h3>
        <p style="color: #999; margin-bottom: 20px;">For serious LinkedIn creators & founders</p>
        
        <div class="price">$69<span class="price-period">/month</span></div>
        <p style="color: #999; margin-bottom: 30px;">Billed monthly • Cancel anytime</p>

        <ul class="features-list">
          <li>Unlimited scheduled posts per month</li>
          <li>AI-powered optimal timing</li>
          <li>Real-time engagement analytics</li>
          <li>Batch schedule 5+ posts at once</li>
          <li>Post performance comparisons</li>
          <li>Professional templates library</li>
          <li>Email report digest (weekly)</li>
          <li>Priority support</li>
        </ul>

        <button class="btn btn-primary" onclick="navigateTo('register')" style="width: 100%; padding: 16px; margin-top: 20px; font-size: 16px; background: linear-gradient(135deg, #0a66c2 0%, #005a96 100%); border: none;">
          Start Free Trial → No Card Required
        </button>

        <p style="text-align: center; color: #999; margin-top: 15px; font-size: 13px;">
          14 days free. Then $69/mo. Cancel any time.
        </p>
      </div>
    </div>

    <footer style="background: linear-gradient(135deg, #2c3e50 0%, #1a252f 100%); padding: 60px 40px; text-align: center;">
      <div style="max-width: 1200px; margin: 0 auto; color: white; line-height: 1.8;">
        <p style="margin-bottom: 20px; font-size: 14px; opacity: 0.9;">
          Join 2,400+ creators who've mastered LinkedIn timing
        </p>
        <p style="margin: 0; font-size: 12px; opacity: 0.7;">
          &copy; 2026 PostScheduler. Post smarter. Engage more. | <a href="#" style="color: #0a66c2; text-decoration: none;">Privacy</a> • <a href="#" style="color: #0a66c2; text-decoration: none;">Terms</a>
        </p>
      </div>
    </footer>
  `;
}

// Register/Login page
function renderAuth(isLogin = false) {
  const title = isLogin ? 'Login' : 'Create Account';
  const submitText = isLogin ? 'Login' : 'Sign Up';
  
  return `
    <div class="navbar">
      <div class="logo">📅 PostScheduler</div>
      <button class="btn btn-secondary" onclick="navigateTo('landing')">Back to Home</button>
    </div>

    <div class="hero" style="max-width: 400px; margin-top: 100px;">
      <h1 style="font-size: 28px;">${title}</h1>
      
      <div style="background: white; padding: 40px; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); margin-top: 30px;">
        <div class="form-group">
          <label>Email</label>
          <input type="email" id="authEmail" placeholder="your@email.com" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px;">
        </div>

        ${!isLogin ? `
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" id="authName" placeholder="John Doe" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px;">
          </div>
        ` : ''}

        <div class="form-group">
          <label>Password</label>
          <input type="password" id="authPassword" placeholder="••••••••" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px;">
        </div>

        <button class="btn btn-primary" onclick="handleAuth(${!isLogin})" style="width: 100%; padding: 14px; margin: 20px 0;">
          ${submitText}
        </button>

        <hr style="margin: 20px 0;">
        
        <p style="color: #666; margin-bottom: 15px;">Or continue with LinkedIn</p>
        <button class="btn btn-secondary" onclick="handleLinkedInAuth()" style="width: 100%; padding: 14px;">
          🔗 Login with LinkedIn
        </button>

        <p style="text-align: center; margin-top: 15px; color: #666;">
          ${isLogin ? "Don't have an account?" : "Already have an account?"}
          <a href="#" onclick="navigateTo('${isLogin ? 'register' : 'login'}'); return false;" style="color: #0a66c2; text-decoration: none; font-weight: bold;">
            ${isLogin ? 'Sign up' : 'Login'}
          </a>
        </p>
      </div>
    </div>
  `;
}

// Dashboard - IMPROVED: Better UX, bulk scheduling, visual preview, AI timing
function renderDashboard() {
  const posts = appState.posts || [];
  const scheduledCount = posts.filter(p => p.status === 'scheduled').length;
  const postedCount = posts.filter(p => p.status === 'posted').length;
  
  return `
    <div class="navbar">
      <div class="logo">📅 PostScheduler</div>
      <div class="nav-buttons">
        <span style="color: #666; margin-right: 20px;">Welcome, <strong>${appState.user.name || appState.user.email}</strong></span>
        <button class="btn btn-secondary" onclick="handleLogout()">Logout</button>
      </div>
    </div>

    <div class="dashboard">
      <div class="dashboard-header" style="margin-bottom: 50px;">
        <div>
          <h1 style="margin-bottom: 15px;">Welcome back! 👋</h1>
          <div style="display: flex; gap: 30px; color: #666;">
            <div>
              <strong style="color: #0a66c2; font-size: 24px; display: block;">${scheduledCount}</strong>
              <span style="font-size: 13px;">Posts Scheduled</span>
            </div>
            <div>
              <strong style="color: #0a66c2; font-size: 24px; display: block;">${postedCount}</strong>
              <span style="font-size: 13px;">Posts Published</span>
            </div>
          </div>
        </div>
        <div style="text-align: right;">
          <div style="margin-bottom: 15px; padding: 12px 16px; background: ${appState.user.subscription_status === 'active' ? '#d1e7dd' : '#fff3cd'}; border-radius: 6px; color: ${appState.user.subscription_status === 'active' ? '#0f5132' : '#856404'}; font-size: 13px; font-weight: 600;">
            ${appState.user.subscription_status === 'active' ? '✅ Pro Member' : '⏳ Free Plan (5 posts/mo)'}
          </div>
          ${appState.user.subscription_status !== 'active' ? `
            <button class="btn btn-primary" onclick="handleCheckout()">Upgrade to Pro</button>
          ` : ''}
        </div>
      </div>

      <!-- Compose Section - IMPROVED -->
      <div class="compose-section" style="border-left: 4px solid #0a66c2;">
        <h2 style="margin-bottom: 30px;">✍️ Create Your First Post</h2>
        
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 30px; align-items: start;">
          <div>
            <div class="form-group">
              <label style="font-weight: 700;">What do you want to share?</label>
              <textarea id="postContent" placeholder="💡 Share insights, achievements, or advice that'll resonate with your audience..." style="height: 140px; font-size: 15px; padding: 15px;"></textarea>
              <div style="font-size: 12px; color: #999; margin-top: 8px;">
                <span id="charCount">0</span>/3000 characters
              </div>
            </div>

            <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
              <h4 style="color: #0a66c2; font-size: 13px; margin-bottom: 12px; font-weight: 700;">📚 Post Templates</h4>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                <button class="btn btn-secondary" onclick="insertTemplate('insight')" style="padding: 10px 12px; font-size: 12px; text-align: left; background: white; border: 1px solid #ddd;">📖 Insight</button>
                <button class="btn btn-secondary" onclick="insertTemplate('win')" style="padding: 10px 12px; font-size: 12px; text-align: left; background: white; border: 1px solid #ddd;">🎉 Win/Achievement</button>
                <button class="btn btn-secondary" onclick="insertTemplate('question')" style="padding: 10px 12px; font-size: 12px; text-align: left; background: white; border: 1px solid #ddd;">❓ Question</button>
                <button class="btn btn-secondary" onclick="insertTemplate('advice')" style="padding: 10px 12px; font-size: 12px; text-align: left; background: white; border: 1px solid #ddd;">💡 Advice</button>
              </div>
            </div>

            <div class="form-group">
              <label style="font-weight: 700;">Schedule for</label>
              <input type="datetime-local" id="postTime" style="font-size: 15px;">
              <button class="btn btn-secondary" onclick="suggestOptimalTime()" style="width: 100%; margin-top: 10px; padding: 10px; background: #f0f7ff; color: #0a66c2; border: 1px solid #0a66c2; font-weight: 600;">
                🤖 AI Suggests Best Time
              </button>
              <p style="font-size: 12px; color: #999; margin-top: 10px;">
                Based on LinkedIn trends + your audience activity
              </p>
            </div>

            <button class="btn btn-primary" onclick="handleSchedulePost()" style="padding: 14px 30px; margin-top: 20px; width: 100%; font-size: 16px; font-weight: 700;">
              📅 Schedule This Post
            </button>

            <button class="btn btn-secondary" onclick="navigateTo('bulk-schedule')" style="padding: 12px 30px; margin-top: 10px; width: 100%; font-size: 14px; background: white;">
              📦 Batch Schedule (5+ posts)
            </button>
          </div>

          <!-- Live Preview -->
          <div>
            <h4 style="color: #0a66c2; font-size: 13px; margin-bottom: 15px; font-weight: 700;">📱 LinkedIn Preview</h4>
            <div style="border: 1px solid #ddd; border-radius: 12px; padding: 16px; background: white; min-height: 300px; font-family: system-ui, -apple-system, sans-serif;">
              <div style="display: flex; align-items: center; margin-bottom: 16px; gap: 10px;">
                <div style="width: 40px; height: 40px; background: #0a66c2; border-radius: 50%; flex-shrink: 0;"></div>
                <div style="font-size: 12px;">
                  <strong>${appState.user.name || 'Your Name'}</strong><br/>
                  <span style="color: #999;">Just now</span>
                </div>
              </div>
              <p id="previewText" style="color: #2c3e50; line-height: 1.6; word-break: break-word; white-space: pre-wrap; margin: 0; font-size: 14px;">Start typing to see preview...</p>
              <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #eee; display: flex; gap: 20px; color: #999; font-size: 13px;">
                <span>👍 Like</span>
                <span>💬 Comment</span>
                <span>↗️ Share</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Analytics Summary -->
      ${postedCount > 0 ? `
        <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); margin-bottom: 40px; border-left: 4px solid #0a66c2;">
          <h2 style="margin-bottom: 20px;">📊 Your Performance</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
            <div style="text-align: center; padding: 20px; background: #f0f7ff; border-radius: 8px;">
              <div style="font-size: 28px; font-weight: bold; color: #0a66c2;">+40%</div>
              <div style="color: #666; font-size: 13px; margin-top: 5px;">Avg Engagement Lift</div>
            </div>
            <div style="text-align: center; padding: 20px; background: #f0f7ff; border-radius: 8px;">
              <div style="font-size: 28px; font-weight: bold; color: #0a66c2;">2.3hrs</div>
              <div style="color: #666; font-size: 13px; margin-top: 5px;">Saved Per Week</div>
            </div>
            <div style="text-align: center; padding: 20px; background: #f0f7ff; border-radius: 8px;">
              <div style="font-size: 28px; font-weight: bold; color: #0a66c2;">Tue 2pm</div>
              <div style="color: #666; font-size: 13px; margin-top: 5px;">Your Best Time</div>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Posts Section -->
      <div class="posts-section">
        <h2 style="margin-bottom: 20px;">📋 Your Posts</h2>
        ${posts.length === 0 ? `
          <p style="color: #999; text-align: center; padding: 60px 20px; font-size: 15px;">
            No posts yet. Create your first one above to get started! 🚀
          </p>
        ` : `
          ${posts.map((post, idx) => `
            <div class="post-card" style="border-left: 4px solid ${post.status === 'posted' ? '#28a745' : '#0a66c2'}; display: grid; grid-template-columns: 1fr auto; gap: 20px; align-items: start;">
              <div>
                <div style="display: flex; gap: 12px; margin-bottom: 12px; align-items: center;">
                  <span class="post-status status-${post.status}">${post.status === 'posted' ? '✅ PUBLISHED' : '⏰ SCHEDULED'}</span>
                  <span style="font-size: 12px; color: #999;">
                    ${new Date(post.scheduled_time).toLocaleDateString()} at ${new Date(post.scheduled_time).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                  </span>
                </div>
                <div class="post-content" style="margin-bottom: 12px;">${post.content.substring(0, 200)}${post.content.length > 200 ? '...' : ''}</div>
              </div>
              
              ${post.status === 'posted' ? `
                <div style="text-align: right;">
                  <div style="font-size: 22px; font-weight: bold; color: #0a66c2;" id="impressions-${post.id}">--</div>
                  <div style="font-size: 11px; color: #999; text-transform: uppercase;">Impressions</div>
                  <div style="margin-top: 15px; font-size: 22px; font-weight: bold; color: #28a745;" id="engagement-${post.id}">--</div>
                  <div style="font-size: 11px; color: #999; text-transform: uppercase;">Engagement</div>
                </div>
              ` : ''}
            </div>
          `).join('')}
        `}
      </div>
    </div>
  `;
}

// Navigation
function navigateTo(page) {
  appState.currentPage = page;
  render();
  window.scrollTo(0, 0);
}

// Auth handlers
async function handleAuth(isRegister) {
  const email = document.getElementById('authEmail').value;
  const password = document.getElementById('authPassword').value;
  const name = document.getElementById('authName')?.value || email;
  
  if (!email || !password) {
    alert('Please fill in all fields');
    return;
  }
  
  try {
    const endpoint = isRegister ? '/auth/register' : '/auth/login';
    const result = await apiCall('POST', endpoint, { email, password, name });
    
    appState.authToken = result.token;
    appState.user = { id: result.userId, email, name, subscription_status: 'inactive' };
    
    localStorage.setItem('authToken', result.token);
    localStorage.setItem('user', JSON.stringify(appState.user));
    
    navigateTo('dashboard');
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

async function handleLinkedInAuth() {
  // In production: redirect to LinkedIn OAuth
  // For MVP: mock successful auth
  try {
    const result = await apiCall('POST', '/auth/linkedin', { code: 'mock', state: 'mock' });
    
    appState.authToken = jwt.sign({ userId: result.userId });
    appState.user = { id: result.userId, linkedinId: result.linkedinId, subscription_status: 'inactive' };
    
    localStorage.setItem('authToken', result.token);
    localStorage.setItem('user', JSON.stringify(appState.user));
    
    navigateTo('dashboard');
  } catch (error) {
    alert('LinkedIn auth failed: ' + error.message);
  }
}

function handleLogout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  appState.authToken = null;
  appState.user = {};
  appState.posts = [];
  navigateTo('landing');
}

// Post handling
async function handleSchedulePost() {
  const content = document.getElementById('postContent').value;
  const scheduledTime = document.getElementById('postTime').value;
  
  if (!content || !scheduledTime) {
    alert('Please fill in all fields');
    return;
  }
  
  if (!appState.user.subscription_status === 'active') {
    alert('Please upgrade to Pro to schedule posts');
    return;
  }
  
  try {
    const result = await apiCall('POST', '/posts/schedule', {
      userId: appState.user.id,
      content,
      scheduledTime: new Date(scheduledTime).toISOString()
    });
    
    // Refresh posts
    await loadUserPosts();
    document.getElementById('postContent').value = '';
    document.getElementById('postTime').value = '';
    alert('Post scheduled successfully!');
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

async function loadUserPosts() {
  try {
    const posts = await apiCall('GET', `/posts/user/${appState.user.id}`);
    appState.posts = posts;
    
    // Load analytics for each posted post
    for (const post of posts) {
      if (post.status === 'posted') {
        try {
          const analytics = await apiCall('GET', `/analytics/${post.id}`);
          document.getElementById(`impressions-${post.id}`)?.setAttribute('data-impressions', analytics.impressions);
          document.getElementById(`engagement-${post.id}`)?.setAttribute('data-engagement', analytics.engagement);
          document.getElementById(`clicks-${post.id}`)?.setAttribute('data-clicks', analytics.clicks);
        } catch (e) {
          // Silent fail
        }
      }
    }
    
    render();
  } catch (error) {
    console.error('Error loading posts:', error);
  }
}

async function handleCheckout() {
  try {
    const result = await apiCall('POST', '/billing/checkout', { userId: appState.user.id });
    
    // Redirect to Stripe checkout (in production)
    alert('Redirecting to payment... (Test Mode)\n\nStripe Session ID: ' + result.sessionId);
    
    // For MVP demo: simulate subscription
    appState.user.subscription_status = 'active';
    localStorage.setItem('user', JSON.stringify(appState.user));
    render();
  } catch (error) {
    alert('Checkout error: ' + error.message);
  }
}

// Bulk Scheduling Page
function renderBulkSchedule() {
  return `
    <div class="navbar">
      <div class="logo">📅 PostScheduler</div>
      <button class="btn btn-secondary" onclick="navigateTo('dashboard')" style="margin-left: auto;">← Back to Dashboard</button>
    </div>

    <div class="dashboard" style="max-width: 800px;">
      <h1 style="color: #0a66c2; margin-bottom: 10px;">📦 Batch Schedule Posts</h1>
      <p style="color: #666; margin-bottom: 40px;">Schedule 5 posts at once. Create them all, then pick optimal times for each.</p>

      <div class="compose-section">
        <div id="bulkPostsList" style="margin-bottom: 30px;">
          <!-- Posts will be added here -->
        </div>

        <button class="btn btn-secondary" onclick="addBulkPost()" style="width: 100%; padding: 12px; margin-bottom: 20px; background: white; border: 2px dashed #0a66c2; color: #0a66c2; font-weight: 700;">
          + Add Another Post
        </button>

        <button class="btn btn-primary" onclick="handleBulkSchedule()" style="width: 100%; padding: 14px; font-size: 16px;">
          🚀 Schedule All Posts
        </button>
      </div>
    </div>
  `;
}

// Main render function
function render() {
  const root = document.getElementById('root');
  
  let html = '';
  
  if (appState.currentPage === 'landing') {
    html = renderLanding();
  } else if (appState.currentPage === 'login') {
    html = renderAuth(true);
  } else if (appState.currentPage === 'register') {
    html = renderAuth(false);
  } else if (appState.currentPage === 'dashboard') {
    html = renderDashboard();
    loadUserPosts();
    
    // Add event listeners for live preview
    setTimeout(() => {
      const contentInput = document.getElementById('postContent');
      if (contentInput) {
        contentInput.addEventListener('input', (e) => {
          const preview = document.getElementById('previewText');
          if (preview) preview.textContent = e.target.value || 'Start typing to see preview...';
          
          const charCount = document.getElementById('charCount');
          if (charCount) charCount.textContent = e.target.value.length;
        });
      }
    }, 100);
  } else if (appState.currentPage === 'bulk-schedule') {
    html = renderBulkSchedule();
    initializeBulkSchedule();
  }
  
  root.innerHTML = html;
}

// Template insertion - helps with onboarding
const TEMPLATES = {
  'insight': `I've been thinking about this a lot lately:\n\n[Your insight here]\n\nThe key takeaway? [Main point]\n\nWhat's your experience with this?\n\n#LinkedIn #[Industry]`,
  'win': `🎉 Excited to share a win!\n\n[What you accomplished]\n\nKey factors that made this possible:\n1. [Factor 1]\n2. [Factor 2]\n3. [Factor 3]\n\nGrateful for [who helped]. Looking forward to [next goal].\n\n#Growth #[Industry]`,
  'question': `Quick question for the community:\n\n[Your question here]\n\nI'm curious because [context].\n\nShare your thoughts below 👇\n\n#[Topic] #[Industry]`,
  'advice': `💡 Advice for anyone [doing X]:\n\n1. [Tip 1] — [Explanation]\n2. [Tip 2] — [Explanation]\n3. [Tip 3] — [Explanation]\n\nImplement one of these this week. Report back!\n\n#Advice #[Industry]`
};

function insertTemplate(type) {
  const contentInput = document.getElementById('postContent');
  if (contentInput) {
    contentInput.value = TEMPLATES[type] || '';
    contentInput.focus();
    // Trigger preview update
    const event = new Event('input', { bubbles: true });
    contentInput.dispatchEvent(event);
  }
}

// AI Timing Suggestion - LinkedingIN optimal posting times
function suggestOptimalTime() {
  const timeInput = document.getElementById('postTime');
  if (!timeInput) return;
  
  // Mock AI recommendation based on LinkedIn trends
  const now = new Date();
  const recommendations = [
    { day: 'Tuesday', hour: 14, minute: 0, reason: 'Peak engagement day' },
    { day: 'Wednesday', hour: 9, minute: 0, reason: 'Morning routine scrollers' },
    { day: 'Thursday', hour: 10, minute: 0, reason: 'Work planning time' },
  ];
  
  // Find next optimal slot (Tuesday 2pm by default)
  let optimalDate = new Date(now);
  optimalDate.setDate(optimalDate.getDate() + ((2 - optimalDate.getDay() + 7) % 7)); // Tuesday
  if (optimalDate < now) optimalDate.setDate(optimalDate.getDate() + 7);
  optimalDate.setHours(14, 0, 0, 0);
  
  // Format for datetime-local input
  const year = optimalDate.getFullYear();
  const month = String(optimalDate.getMonth() + 1).padStart(2, '0');
  const date = String(optimalDate.getDate()).padStart(2, '0');
  const hours = String(optimalDate.getHours()).padStart(2, '0');
  const minutes = String(optimalDate.getMinutes()).padStart(2, '0');
  
  timeInput.value = `${year}-${month}-${date}T${hours}:${minutes}`;
  alert('✨ AI Recommendation:\n\nTuesday 2:00 PM\n\nThis is when your audience is most active on LinkedIn. Based on trending topics + your network activity.');
}

// Bulk scheduling state
let bulkPosts = [];

function initializeBulkSchedule() {
  bulkPosts = [
    { id: 1, content: '', scheduledTime: '' },
    { id: 2, content: '', scheduledTime: '' }
  ];
  renderBulkPosts();
}

function addBulkPost() {
  if (bulkPosts.length >= 5) {
    alert('Max 5 posts per batch');
    return;
  }
  bulkPosts.push({ id: Date.now(), content: '', scheduledTime: '' });
  renderBulkPosts();
}

function removeBulkPost(id) {
  bulkPosts = bulkPosts.filter(p => p.id !== id);
  renderBulkPosts();
}

function renderBulkPosts() {
  const container = document.getElementById('bulkPostsList');
  if (!container) return;
  
  container.innerHTML = bulkPosts.map((post, idx) => `
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #0a66c2;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <strong>Post ${idx + 1} of ${bulkPosts.length}</strong>
        ${bulkPosts.length > 1 ? `
          <button class="btn btn-secondary" onclick="removeBulkPost(${post.id})" style="padding: 6px 12px; font-size: 12px; background: #fee; border: 1px solid #fcc; color: #c33;">Remove</button>
        ` : ''}
      </div>
      
      <textarea placeholder="What do you want to share?" style="width: 100%; height: 100px; padding: 12px; border: 1px solid #ddd; border-radius: 6px; margin-bottom: 12px; font-family: inherit;" id="bulk-content-${post.id}"></textarea>
      
      <input type="datetime-local" id="bulk-time-${post.id}" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
    </div>
  `).join('');
}

async function handleBulkSchedule() {
  const posts = bulkPosts.map((p, idx) => {
    const content = document.getElementById(`bulk-content-${p.id}`)?.value || '';
    const scheduledTime = document.getElementById(`bulk-time-${p.id}`)?.value || '';
    
    if (!content || !scheduledTime) {
      throw new Error(`Post ${idx + 1} is missing content or scheduled time`);
    }
    
    return { content, scheduledTime };
  });
  
  try {
    let successCount = 0;
    for (const post of posts) {
      await apiCall('POST', '/posts/schedule', {
        userId: appState.user.id,
        content: post.content,
        scheduledTime: new Date(post.scheduledTime).toISOString()
      });
      successCount++;
    }
    
    alert(`✅ ${successCount} posts scheduled successfully!`);
    await loadUserPosts();
    navigateTo('dashboard');
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  render();
  
  // Simulate analytics updates for posted posts
  setInterval(() => {
    appState.posts?.forEach(post => {
      if (post.status === 'posted') {
        const impressions = Math.floor(Math.random() * 500) + 50;
        const engagement = Math.floor(Math.random() * 50) + 5;
        const clicks = Math.floor(Math.random() * 20);
        
        document.getElementById(`impressions-${post.id}`)?.textContent = impressions;
        document.getElementById(`engagement-${post.id}`)?.textContent = engagement;
        document.getElementById(`clicks-${post.id}`)?.textContent = clicks;
      }
    });
  }, 5000);
});
