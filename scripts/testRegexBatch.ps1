param(
    [string]$Pattern,
    [string]$TestsJson
)

try {
    $regex = [regex]::new($Pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Multiline)
    $tests = $TestsJson | ConvertFrom-Json
    
    $results = @()
    foreach ($test in $tests) {
        try {
            $matches = $regex.IsMatch($test.testString)
            $results += @{
                index = $test.index
                matches = $matches
                error = $false
            }
        } catch {
            $results += @{
                index = $test.index
                matches = $false
                error = $true
            }
        }
    }
    
    $results | ConvertTo-Json -Compress
} catch {
    # If pattern is invalid, all tests fail
    $tests = $TestsJson | ConvertFrom-Json
    $results = @()
    foreach ($test in $tests) {
        $results += @{
            index = $test.index
            matches = $false
            error = $true
        }
    }
    $results | ConvertTo-Json -Compress
}