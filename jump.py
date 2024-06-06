combination_matrix = [
    {"Quality": 5, "Efficiency": 1, "Compatibility": 1, "Profile": "2160p Remux"},
    {"Quality": 4, "Efficiency": 2, "Compatibility": 2, "Profile": "2160p Encode"},
    {"Quality": 4, "Efficiency": 2, "Compatibility": 3, "Profile": "2160p WEB"},
    {"Quality": 4, "Efficiency": 4, "Compatibility": 3, "Profile": "1080p HDR Encode"},
    {"Quality": 3, "Efficiency": 2, "Compatibility": 4, "Profile": "1080p Encode"},
    {"Quality": 3, "Efficiency": 1, "Compatibility": 2, "Profile": "1080p Remux"},
    {"Quality": 2, "Efficiency": 3, "Compatibility": 5, "Profile": "1080p WEB"},
    {"Quality": 2, "Efficiency": 5, "Compatibility": 3, "Profile": "1080p HEVC"},
    {"Quality": 2, "Efficiency": 3, "Compatibility": 4, "Profile": "720p Encode"},
    {"Quality": 1, "Efficiency": 3, "Compatibility": 5, "Profile": "SD Encode"},
    {"Quality": 1, "Efficiency": 4, "Compatibility": 3, "Profile": "Minimal"},
    {"Quality": 1, "Efficiency": 1, "Compatibility": 5, "Profile": "Compatible"},
]

def generate_changes(profile, metric, value):
    changes = []
    for change in [-1, -2, -3, -4, 1, 2, 3, 4]:
        new_value = value + change
        if 1 <= new_value <= 5:
            for combo in combination_matrix:
                if combo[metric] == new_value:
                    changes.append({
                        "axis": metric,
                        "change": change,
                        "newProfile": combo["Profile"]
                    })
                    break
    return changes

def generate_all_changes(matrix):
    result = []
    for profile in matrix:
        changes = []
        for metric in ["Quality", "Efficiency", "Compatibility"]:
            changes.extend(generate_changes(profile, metric, profile[metric]))
        result.append({
            "currentProfile": profile["Profile"],
            "Quality": profile["Quality"],
            "Efficiency": profile["Efficiency"],
            "Compatibility": profile["Compatibility"],
            "changes": changes
        })
    return result

all_changes = generate_all_changes(combination_matrix)

for item in all_changes:
    print(item)

# Output the result in the required format
import json
print(json.dumps(all_changes, indent=2))
