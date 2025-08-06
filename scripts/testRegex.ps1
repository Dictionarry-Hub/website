param(
    [string]$Pattern,
    [string]$TestString
)

try {
    $regex = [regex]::new($Pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Multiline)
    $matches = $regex.IsMatch($TestString)
    Write-Output $matches
} catch {
    Write-Output "False"
}