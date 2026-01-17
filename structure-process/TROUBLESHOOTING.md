# 🔧 Troubleshooting Guide - "Failed to fetch" Error

## ❌ Problem
You're seeing a "Failed to fetch" error when trying to sign up or sign in with the message:
```
TypeError: Failed to fetch
at async handleSignUp (app/auth/sign-up/page.tsx:60)
```

## ✅ Solutions

### Solution 1: Verify Supabase Credentials (MOST COMMON)

The credentials in `.env.local` are usually the issue. Follow these steps:

#### Step 1: Go to Your Supabase Project
1. Open https://app.supabase.com
2. Log in to your account
3. Select your project

#### Step 2: Get the Correct Credentials
1. Click **Settings** (bottom left)
2. Click **API** in the left menu
3. You'll see:
   - **Project URL** (starts with `https://`)
   - **anon / public** key (under "Project API keys")

#### Step 3: Update `.env.local`
Replace with your ACTUAL credentials (not templates):
```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ACTUAL_ANON_KEY
```

**Example:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://rzdxlfpygnflouzasokw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_Oory5KHrbBMi_IzjrsctXg_bNtxYqaQ
```

#### Step 4: Restart Dev Server
```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

---

### Solution 2: Enable Email Authentication

#### In Your Supabase Project:
1. Go to **Authentication** (left menu)
2. Click **Providers**
3. Make sure **Email** is **ENABLED** (toggle should be ON)
4. Verify settings:
   - Confirm email required: Can be OFF for testing
   - Double confirm email: Can be OFF for testing

---

### Solution 3: Check CORS Configuration

#### For Local Development (localhost:3000):
Usually no action needed - Supabase allows localhost by default.

#### For Production/Deployed Sites:
1. Go to **Authentication** → **Providers**
2. Click **Email**
3. Scroll to **Redirect URLs**
4. Add your domain:
   ```
   https://yourdomain.com/**
   For Vercel: https://your-app-name.vercel.app/**
   For local: http://localhost:3000/**
   ```

---

### Solution 4: Verify Project is Active

1. Go to https://app.supabase.com
2. Check project status (should show **Active**, not "Paused")
3. If paused, click to resume

---

### Solution 5: Check Network Connectivity

```bash
# Test Supabase connectivity
curl https://YOUR_PROJECT_ID.supabase.co/rest/v1/health

# Should return something like:
# {"db":{"health":"ok"},"status":"ok"}
```

If it fails, your Supabase URL might be wrong.

---

## 🔍 How to Debug

### Check Browser Console
1. Open Developer Tools (F12)
2. Go to **Console** tab
3. Look for error messages with more details

### Check for Specific Error Messages

The improved error handling now shows:
- `"Supabase client not initialized"` → Check `.env.local`
- `"Invalid email format"` → Check email input
- `"Password is too short"` → Use password 6+ chars
- `"User already exists"` → Email already registered
- `"Invalid login credentials"` → Wrong email or password

---

## 📋 Checklist

Before testing, verify:

- [ ] `.env.local` file exists in root directory
- [ ] `NEXT_PUBLIC_SUPABASE_URL` is your real URL (not placeholder)
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` is your real key (not placeholder)
- [ ] Supabase project is **Active** (not paused)
- [ ] **Email** provider is **ENABLED** in Authentication
- [ ] Dev server restarted after updating `.env.local`
- [ ] Using valid email format (email@example.com)
- [ ] Password is 6+ characters
- [ ] No typos in credentials

---

## 🆘 Still Not Working?

### Step 1: Clear Cache
```bash
# Stop dev server (Ctrl+C)
rm -rf .next node_modules/.cache
npm run dev
```

### Step 2: Verify Credentials Are Correct
Copy your credentials from Supabase and paste them exactly (no extra spaces):

```bash
# Test by visiting this in your browser:
# Replace YOUR_PROJECT_ID with actual ID
https://YOUR_PROJECT_ID.supabase.co/rest/v1/health
```

Should show: `{"db":{"health":"ok"},"status":"ok"}`

### Step 3: Check Browser Network Tab
1. Open DevTools (F12)
2. Go to **Network** tab
3. Try to sign up
4. Look for requests to `supabase.co`
5. Check status codes:
   - `200` = Success
   - `400` = Bad request (check email/password format)
   - `401` = Unauthorized (check credentials)
   - `CORS error` = Domain not allowed

---

## 💡 Common Mistakes

❌ **Wrong:** Using placeholder URL
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
```

✅ **Right:** Using actual project URL
```env
NEXT_PUBLIC_SUPABASE_URL=https://rzdxlfpygnflouzasokw.supabase.co
```

---

❌ **Wrong:** Copying from wrong section
```env
# This is SECRET key (server-only)
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-secret-key
```

✅ **Right:** Using anon/public key
```env
# This is PUBLIC key (safe to expose)
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_xxx
```

---

## 🔗 Helpful Links

- [Supabase Dashboard](https://app.supabase.com)
- [Supabase Documentation](https://supabase.com/docs)
- [Auth Helpers NextJS](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)

---

## 📞 Getting Help

If you're still stuck:

1. **Check Supabase Status**: https://status.supabase.com
2. **Read Error Message Carefully** - it usually tells you what's wrong
3. **Copy full error message** and search online
4. **Check browser console** for more details (F12 → Console)

---

## ✨ Quick Fix Checklist

Most "Failed to fetch" errors are fixed by:

1. ✅ Copying correct credentials from Supabase
2. ✅ Ensuring Email provider is enabled
3. ✅ Restarting dev server
4. ✅ Clearing browser cache

Try these first! 🎯
