$envPath = Join-Path $env:USERPROFILE ".env"
$token = $null
if (Test-Path $envPath) {
    $envContent = Get-Content $envPath
    foreach ($line in $envContent) {
        if ($line -match "^GITHUB_TOKEN=(.*)") {
            $token = $Matches[1].Trim()
        }
    }
}
if (-not $token) {
    Write-Error "No GITHUB_TOKEN found in ~/.env! Deployment aborted."
    exit 1
}

$owner = "nishantjainjain3-glitch"
$repo = "nevisan-website"
$headers = @{
    Authorization = "token $token"
    Accept = "application/vnd.github.v3+json"
}

function Upload-File($localPath, $githubPath, $commitMessage) {
    if (-not (Test-Path $localPath)) {
        Write-Output "Local file not found: $localPath"
        return
    }
    $bytes = [System.IO.File]::ReadAllBytes($localPath)
    $base64 = [System.Convert]::ToBase64String($bytes)
    
    $sha = $null
    try {
        $res = Invoke-RestMethod -Uri "https://api.github.com/repos/$owner/$repo/contents/$githubPath" -Headers $headers -Method Get
        $sha = $res.sha
        Write-Output "Found existing file $githubPath (SHA: $sha)"
    } catch {
        Write-Output "File $githubPath not found, creating new one."
    }
    
    $body = @{
        message = $commitMessage
        content = $base64
    }
    if ($sha) {
        $body.sha = $sha
    }
    $bodyJson = $body | ConvertTo-Json
    
    Write-Output "Uploading $githubPath..."
    try {
        $uploadRes = Invoke-RestMethod -Uri "https://api.github.com/repos/$owner/$repo/contents/$githubPath" -Method Put -Headers $headers -Body $bodyJson -ContentType "application/json"
        Write-Output "Successfully uploaded $githubPath. Commit SHA: $($uploadRes.commit.sha)"
    } catch {
        Write-Error "Failed to upload $githubPath : $_"
    }
}

Write-Output "Starting full deployment..."
Upload-File (Join-Path $PSScriptRoot "index.html") "index.html" "Deploy production index.html - luxury color theme, leaf canvas background"
Upload-File (Join-Path $PSScriptRoot "app.js") "app.js" "Deploy production app.js - forest green theme, interactive brewing, Guestbook headers, staggered cards"
Write-Output "Full deployment complete!"
