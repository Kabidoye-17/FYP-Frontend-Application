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
    vite_dir = os.path.join(script_dir, '..', '..', 'Vite-app', 'Vite-app')

    try:
        result = subprocess.run(
            'npm run cold:prod',
            cwd=vite_dir,
            capture_output=True,
            text=True,
            shell=True,
            timeout=120
        )

        output = result.stdout + result.stderr
        ansi_escape = re.compile(r'\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])')
        clean_output = ansi_escape.sub('', output)

        # Pattern: "✓ built in 1.23s"
        time_match = re.search(r'built in ([\d.]+)s', clean_output)

        # Pattern: "dist/assets/index-DMZfzCFe.js   193.92 kB"
        size_match = re.search(r'dist/assets/index-\w+\.js\s+([\d.]+)\s+(kB|KB|MB)', clean_output)

        if not time_match or not size_match:
            print(f"\nFailed to extract metrics. Output:\n{clean_output[-800:]}")
            return None, None

        build_time_s = float(time_match.group(1))
        build_time_ms = int(build_time_s * 1000)

        size_value = float(size_match.group(1))
        size_unit = size_match.group(2)

        # Convert to KiB
        if size_unit in ['kB', 'KB']:
            bundle_size_kb = size_value
        elif size_unit == 'MB':
            bundle_size_kb = size_value * 1024

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
        print(f"{build_time} ms, {bundle_size:.2f} kB")

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
        writer.writerow(['Build Number', 'Build Time (ms)', 'Bundle Size (kB)'])

        for i, (build_time, bundle_size) in enumerate(results, 1):
            writer.writerow([i, build_time, f"{bundle_size:.2f}"])

        writer.writerow([])
        writer.writerow(['Average', f'{avg_time:.2f}', f'{avg_size:.2f}'])

    print(f"\nSaved: {filename}")
    print(f"Average: {avg_time:.2f} ms, {avg_size:.2f} kB")

if __name__ == "__main__":
    main()
