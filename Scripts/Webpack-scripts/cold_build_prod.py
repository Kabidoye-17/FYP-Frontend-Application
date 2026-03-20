import subprocess
import csv
import os
import sys
import re
from datetime import datetime


def get_bundle_size(output_dir):
    """
    Calculate total size of all .js files in the build output directory,
    excluding source maps (.map).

    Returns:
        float: Total JS bundle size in KiB, or None if directory not found
    """
    total_bytes = 0
    for root, dirs, files in os.walk(output_dir):
        for f in files:
            if f.endswith('.js'):
                total_bytes += os.path.getsize(os.path.join(root, f))

    if total_bytes == 0:
        return None
    return total_bytes / 1024


def run_cold_build_prod():
    """
    Run a cold production build, parse build time from Webpack output and measure bundle size.

    Returns:
        tuple: (build_time_ms, bundle_size_kib) or (None, None) if failed
    """
    script_dir = os.path.dirname(os.path.abspath(__file__))
    webpack_dir = os.path.join(script_dir, '..', '..', 'Webpack-app')
    output_dir = os.path.join(webpack_dir, 'build')

    try:
        result = subprocess.run(
            'npm run clean:build',
            cwd=webpack_dir,
            capture_output=True,
            text=True,
            shell=True,
            timeout=120
        )

        if result.returncode != 0:
            output = result.stdout + result.stderr
            print(f"\nBuild failed (exit code {result.returncode}). Output:\n{output[-800:]}")
            return None, None

        match = re.search(r'in (\d+) ms', result.stdout)
        if not match:
            print(f"\nCould not parse build time from Webpack output:\n{result.stdout[-800:]}")
            return None, None
        build_time_ms = int(match.group(1))
        bundle_size_kib = get_bundle_size(output_dir)

        if bundle_size_kib is None:
            print(f"\nNo output files found in {output_dir}")
            return None, None

        return build_time_ms, bundle_size_kib

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
