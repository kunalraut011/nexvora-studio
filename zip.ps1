$tempDir = "$env:TEMP\nexvora_export"
Remove-Item -Recurse -Force $tempDir -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path $tempDir | Out-Null
Get-ChildItem -Path . -Exclude 'node_modules', '.next', '.git' | Copy-Item -Destination $tempDir -Recurse
Compress-Archive -Path "$tempDir\*" -DestinationPath 'C:\Users\raut8\.gemini\antigravity\brain\4fe23625-7128-4f6a-acad-6aff5a6c6f01\nexvora-studio.zip' -Force
Remove-Item -Recurse -Force $tempDir
