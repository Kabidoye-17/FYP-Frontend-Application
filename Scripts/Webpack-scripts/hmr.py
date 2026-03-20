import subprocess
import re
import csv
import os
import sys
import time
from datetime import datetime


# Target file: most-imported module (133+ dependents) to stress-test HMR propagation
TARGET_FILE = os.path.join('src', 'design_system', 'Icon.tsx')
HMR_COMMENT = '\n// hmr-benchmark-trigger'


def kill_process_on_port(port):
    """Find and kill any process using the specified port on macOS."""
    try:
        result = subprocess.run(
            f"lsof -ti :{port}",
            capture_output=True, text=True, shell=True, timeout=5
        )
        if result.stdout.strip():
            for pid in result.stdout.strip().split('\n'):
                subprocess.run(f"kill -9 {pid}", shell=True, capture_output=True, timeout=5)
            time.sleep(1)
    except Exception:
        pass


def measure_hmr(process, target_path, ansi_escape):
    """
    Modify a file and measure wall-clock time until Webpack reports compilation.

    Returns:
        float: HMR update time in milliseconds, or None if failed
    """
    # Read original content
    with open(target_path, 'r') as f:
        original = f.read()

    # Write modification and record timestamp
    with open(target_path, 'w') as f:
        f.write(original + HMR_COMMENT)
    t_start = time.perf_counter()

    # Wait for Webpack to log "compiled successfully"
    try:
        while True:
            line = process.stdout.readline()
            if not line:
                break
            clean_line = ansi_escape.sub('', line)
            if 'compiled successfully' in clean_line or 'compiled with' in clean_line:
                t_end = time.perf_counter()
                hmr_ms = (t_end - t_start) * 1000

                # Revert file
                with open(target_path, 'w') as f:
                    f.write(original)

                # Wait for revert compilation to complete before next measurement
                deadline = time.time() + 30
                while time.time() < deadline:
                    revert_line = process.stdout.readline()
                    if not revert_line:
                        break
                    clean_revert = ansi_escape.sub('', revert_line)
                    if 'compiled successfully' in clean_revert or 'compiled with' in clean_revert:
                        break

                return hmr_ms
    except Exception:
        pass

    # Revert on failure
    with open(target_path, 'w') as f:
        f.write(original)
    return None


def main():
    print("Webpack HMR measurements (10 runs)\n")

    script_dir = os.path.dirname(os.path.abspath(__file__))
    webpack_dir = os.path.join(script_dir, '..', '..', 'Webpack-app')
    target_path = os.path.join(webpack_dir, TARGET_FILE)

    if not os.path.exists(target_path):
        print(f"Target file not found: {target_path}")
        sys.exit(1)

    kill_process_on_port(3000)

    # Start the dev server
    process = subprocess.Popen(
        'npm start',
        cwd=webpack_dir,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        shell=True
    )

    ansi_escape = re.compile(r'\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])')

    # Wait for server to be ready
    print("Waiting for dev server...", end=' ', flush=True)
    server_ready = False
    for line in process.stdout:
        clean_line = ansi_escape.sub('', line)
        if 'compiled successfully' in clean_line:
            print("ready")
            server_ready = True
            break

    if not server_ready:
        print("FAILED - server did not start")
        process.kill()
        sys.exit(1)

    # Warm-up: discard first HMR to avoid cold-path bias
    print("Warm-up run...", end=' ', flush=True)
    warmup = measure_hmr(process, target_path, ansi_escape)
    if warmup is None:
        print("FAILED")
        process.kill()
        sys.exit(1)
    print(f"{warmup:.1f} ms (discarded)")
    time.sleep(1)

    # Measure 10 HMR updates
    results = []
    for i in range(1, 11):
        print(f"HMR {i}/10...", end=' ', flush=True)
        hmr_time = measure_hmr(process, target_path, ansi_escape)

        if hmr_time is None:
            print("FAILED - Exiting")
            process.kill()
            sys.exit(1)

        results.append(hmr_time)
        print(f"{hmr_time:.1f} ms")
        time.sleep(1)

    # Shut down server
    process.kill()
    process.wait(timeout=5)

    average = sum(results) / len(results)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"hmr_results_{timestamp}.csv"

    outputs_dir = os.path.join(script_dir, 'outputs')
    os.makedirs(outputs_dir, exist_ok=True)
    filepath = os.path.join(outputs_dir, filename)

    with open(filepath, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['HMR Update', 'Time (ms)'])
        for i, hmr_time in enumerate(results, 1):
            writer.writerow([i, f"{hmr_time:.1f}"])
        writer.writerow([])
        writer.writerow(['Average', f'{average:.1f}'])

    print(f"\nSaved: {filename}")
    print(f"Average HMR time: {average:.1f} ms")


if __name__ == "__main__":
    main()
