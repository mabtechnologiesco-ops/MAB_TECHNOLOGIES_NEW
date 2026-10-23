import subprocess
result = subprocess.run(['node', 'check_cards.js'], capture_output=True, text=True)
print(result.stdout)
print(result.stderr)
