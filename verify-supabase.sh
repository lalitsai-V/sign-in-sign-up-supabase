#!/bin/bash
# Supabase Connection Verification

echo "🔍 Verifying Supabase Configuration..."
echo ""

# Get the URL from .env.local
SUPABASE_URL=$(grep "NEXT_PUBLIC_SUPABASE_URL" .env.local | cut -d '=' -f2)

echo "Supabase URL: $SUPABASE_URL"
echo ""

# Try to connect to Supabase health endpoint
echo "Testing connection..."
RESPONSE=$(curl -s "$SUPABASE_URL/rest/v1/health")

echo "Response: $RESPONSE"
echo ""

if echo "$RESPONSE" | grep -q "ok"; then
  echo "✅ Supabase connection is working!"
else
  echo "❌ Supabase connection failed!"
  echo ""
  echo "Possible issues:"
  echo "1. NEXT_PUBLIC_SUPABASE_URL is not correct"
  echo "2. Your Supabase project is paused"
  echo "3. Network connectivity issue"
fi
