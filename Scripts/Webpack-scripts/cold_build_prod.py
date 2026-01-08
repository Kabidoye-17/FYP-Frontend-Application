import subprocess
import re
import csv
import os
import sys
from datetime import datetime

def run_cold_build_prod():
    """
    Run a cold production build and extract compilation time and bundle size.

    Returns:
        tuple: (build_time_ms, bundle_size_kb) or (None, None) if failed
    """
    script_dir = os.path.dirname(os.path.abspath(__file__))
    webpack_dir = os.path.join(script_dir, '..', '..', 'Webpack-app')

    try:
        result = subprocess.run(
            'npm run cold:prod',
            cwd=webpack_dir,
            capture_output=True,
            text=True,
            shell=True,
            timeout=120
        )

        output = result.stdout + result.stderr
        ansi_escape = re.compile(r'\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])')
        clean_output = ansi_escape.sub('', output)

        # Match "compiled successfully in X ms" or "compiled with N warnings in X ms"
        time_match = re.search(r'webpack.*compiled.*in (\d+) ms', clean_output)
        # Match both old format "asset X.js Y KiB [minimized]" and new format "X.js (Y MiB)" from warnings
        size_match = re.search(r'(?:asset\s+)?[\d.]+/js/\S+\.js\s+(?:\()?(\d+(?:\.\d+)?)\s+(KiB|MiB|bytes)(?:\))?', clean_output)

        if not time_match or not size_match:
            print(f"\nFailed to extract metrics. Output:\n{clean_output[-800:]}")
            return None, None

        build_time_ms = int(time_match.group(1))
        size_value = float(size_match.group(1))
        size_unit = size_match.group(2)

        # Convert to KiB
        if size_unit == 'KiB':
            bundle_size_kb = size_value
        elif size_unit == 'MiB':
            bundle_size_kb = size_value * 1024
        elif size_unit == 'bytes':
            bundle_size_kb = size_value / 1024

        return build_time_ms, bundle_size_kb

    except Exception as e:
        print(f"\nBuild error: {e}")
        return None, None

def main():
    print("Cold prod build measurements (10 runs)\n")

    results = []

    for i in range(1, 11):
        print(f"Build {i}/10...", end=' ', flush=True)
        build_time, bundle_size = run_cold_build_prod()

        if build_time is None or bundle_size is None:
            print("FAILED - Exiting")
            sys.exit(1)

        results.append((build_time, bundle_size))
        print(f"{build_time} ms, {bundle_size:.2f} KiB")

    avg_time = sum(r[0] for r in results) / len(results)
    avg_size = sum(r[1] for r in results) / len(results)

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"cold_build_prod_results_{timestamp}.csv"

    script_dir = os.path.dirname(os.path.abspath(__file__))
    outputs_dir = os.path.join(script_dir, 'outputs')
    os.makedirs(outputs_dir, exist_ok=True)
    filepath = os.path.join(outputs_dir, filename)

    with open(filepath, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['Build Number', 'Build Time (ms)', 'Bundle Size (KiB)'])

        for i, (build_time, bundle_size) in enumerate(results, 1):
            writer.writerow([i, build_time, f"{bundle_size:.2f}"])

        writer.writerow([])
        writer.writerow(['Average', f'{avg_time:.2f}', f'{avg_size:.2f}'])

    print(f"\nSaved: {filename}")
    print(f"Average: {avg_time:.2f} ms, {avg_size:.2f} KiB")

if __name__ == "__main__":
    main()
