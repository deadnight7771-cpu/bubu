$files = @("happy-birthday.mp3", "letter-song.mp3", "love-song.mp3")
foreach ($f in $files) {
    $path = "c:\Users\mande\OneDrive\Documents\yoooooooooo\love-app\public\$f"
    if (Test-Path $path) {
        $size = (Get-Item $path).Length
        $bytes = [System.IO.File]::ReadAllBytes($path)
        $header = [System.Text.Encoding]::ASCII.GetString($bytes, 0, [Math]::Min(20, $bytes.Length))
        $isMP3 = ($bytes[0] -eq 0x49 -and $bytes[1] -eq 0x44 -and $bytes[2] -eq 0x33) -or ($bytes[0] -eq 0xFF -and ($bytes[1] -band 0xE0) -eq 0xE0)
        Write-Host "$f | ${size} bytes | Valid MP3: $isMP3 | Start: $header"
    } else {
        Write-Host "$f | NOT FOUND"
    }
}
