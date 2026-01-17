# Supabase Connection Verification Script (PowerShell)

Write-Host "Verifying Supabase Configuration..." -ForegroundColor Cyan
Write-Host ""

# Read .env.local file
$envContent = Get-Content .env.local -Raw

# Extract SUPABASE_URL
$urlMatch = $envContent | Select-String "NEXT_PUBLIC_SUPABASE_URL=(.+)"
$url = $urlMatch.Matches.Groups[1].Value

Write-Host "Supabase URL: $url" -ForegroundColor Yellow
Write-Host ""

# Test connection
Write-Host "Testing connection..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$url/rest/v1/health" -Method Get -ErrorAction Stop
    Write-Host "Response: " -ForegroundColor Green
    Write-Host ($response | ConvertTo-Json) -ForegroundColor Green
    Write-Host ""
    Write-Host "Connection is working!" -ForegroundColor Green
} catch {
    Write-Host "Supabase connection failed!" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Possible issues:" -ForegroundColor Yellow
    Write-Host "1. NEXT_PUBLIC_SUPABASE_URL is not correct" -ForegroundColor Yellow
    Write-Host "2. Your Supabase project is paused" -ForegroundColor Yellow
    Write-Host "3. Network connectivity issue" -ForegroundColor Yellow
}
