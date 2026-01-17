# Authentication Debugging Guide

## What Was Fixed

### 1. **Email Validation Improvements** (`lib/validation.ts`)
- Added length checks (max 254 chars total, max 64 chars for local part)
- Maintains RFC 5322 simplified validation
- Better handles edge cases

### 2. **Sign-Up Error Messages** (`app/auth/sign-up/page.tsx`)
- "Invalid email" → More specific guidance
- "Already registered" → Suggests sign-in
- "Password" errors → Clear requirements
- Email verification notice when account created

### 3. **Sign-In Error Messages** (`app/auth/sign-in/page.tsx`)
- "Invalid login credentials" → Now explains could be email or password
- "Email not verified" → Explains need to check inbox
- "Invalid email" → Suggests correct format

---

## Testing Your Authentication

### **Step 1: Create a Test Account**
1. Go to `/auth/sign-up`
2. Use a real email you can access (e.g., `testuser@gmail.com`)
3. Use password: `Test123456` (6+ characters)
4. **If you get an error**, note the exact message - it will be more specific now

**Common Issues:**
- **"Email address is invalid"** → Try a simpler email (no special chars except +, -, _)
- **Already registered** → Email exists; try sign-in instead
- **Check inbox** → After signup, verify email before signing in

### **Step 2: Verify Email** 
After sign-up:
1. Check your email inbox for verification from Supabase
2. Click the verification link
3. You'll be redirected back to the app

### **Step 3: Sign In**
1. Go to `/auth/sign-in`
2. Enter the email and password you just created
3. If you get "Invalid login credentials", check:
   - Email spelling matches exactly
   - Password is correct
   - Account was verified (check email)

---

## Supabase Project Checklist

### Email Provider Settings
- ✅ Email Auth Enabled? (Check Supabase dashboard > Auth > Providers)
- ✅ Email Confirmation Required? (Check Auth > Email Templates)
- ✅ Correct ANON_KEY and URL in `.env.local`

### To Verify in Supabase Dashboard:
1. Go to **Auth > Users** 
2. You should see created accounts listed
3. Check "Email Confirmed" status

### Email Format Supabase Accepts:
- ✅ `user@example.com`
- ✅ `test.user@example.co.uk`
- ✅ `user+tag@gmail.com`
- ❌ No spaces: `user @example.com`
- ❌ No invalid chars: `user$@example.com`

---

## Common Error Messages & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| "Email address is invalid" | Email format not accepted | Remove special chars, use `user@domain.com` format |
| "Invalid login credentials" | Wrong email/password OR unverified | Check spelling, verify email from inbox |
| "Already registered" | Email exists in Supabase | Use different email or sign-in |
| "Please verify your email" | Email not confirmed after signup | Check inbox for verification link |

---

## Testing with Different Emails

Try these formats to identify any patterns:

```
✅ Test these first (most likely to work):
- simple@gmail.com
- test123@gmail.com
- user@example.com

⚠️ If above fail, Supabase email auth might not be configured:
- Check Supabase dashboard Auth > Providers > Email enabled?
- Check Auth > Email Templates has confirmation template
```

---

## Debug Console Output

When you sign up or sign in, check your browser console (F12):
- Look for `Sign up error:` or `Sign in error:` logs
- These show the exact error from Supabase
- Copy full error message for support/debugging

---

## Next Steps

1. **Try sign-up** with a real email
2. **Verify email** from your inbox
3. **Try sign-in** with those credentials
4. **If issues persist**, check:
   - Error messages are specific and helpful?
   - Email verification working?
   - Supabase project configured correctly?
