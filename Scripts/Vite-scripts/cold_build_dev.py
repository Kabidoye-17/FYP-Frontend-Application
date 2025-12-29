import subprocess
import re
import csv
import os
import sys
import time
from datetime import datetime


def kill_process_on_port(port):
    """
    Find and kill any process using the specified port on Windows.

    Args:
        port: Port number to check and clean up
    """
    try:
        # Find process using the port
        result = subprocess.run(
            f'powershell -Command "Get-NetTCPConnection -LocalPort {port} -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess"',
            capture_output=True,
            text=True,
            shell=True,
            timeout=5
        )

        if result.stdout.strip():
            pid = result.stdout.strip()
            # Kill the process
            subprocess.run(f'taskkill /F /PID {pid}', shell=True, capture_output=True, timeout=5)
            time.sleep(1)  # Wait for port to be released
    except Exception:
        pass  # Port is not in use or cleanup failed


def run_cold_dev_server():
    """
    Run a cold dev server startup and extract ready time.

    Returns:
        int: Server startup time in milliseconds, or None if failed
    """
    script_dir = os.path.dirname(os.path.abspath(__file__))
    vite_dir = os.path.join(script_dir, '..', '..', 'Vite-app', 'Vite-app')

    try:
        # Start the dev server
        process = subprocess.Popen(
            'npm start',
            cwd=vite_dir,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            shell=True
        )

        output = ""
        ansi_escape = re.compile(r'\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])')

        # Read output until we see server ready
        for line in process.stdout:
            output += line
            clean_line = ansi_escape.sub('', line)

            # Look for "ready in X ms"
            if 'ready in' in clean_line:
                match = re.search(r'ready in (\d+) ms', clean_line)
                if match:
                    # Kill the server forcefully
                    process.kill()
                    process.wait(timeout=5)
                    return int(match.group(1))

        process.kill()
        process.wait(timeout=5)
        print(f"\nFailed to extract startup time. Output:\n{output[-500:]}")
        return None

    except Exception as e:
        print(f"\nServer error: {e}")
        try:
            process.kill()
            process.wait(timeout=5)
        except Exception:
            pass
        return None

def main():
    print("Cold dev server startup measurements (10 runs)\n")

    results = []

    for i in range(1, 11):
        print(f"Server {i}/10...", end=' ', flush=True)
        kill_process_on_port(5173)  # Clean up port before starting server
        build_time = run_cold_dev_server()

        if build_time is None:
            print("FAILED - Exiting")
            sys.exit(1)

        results.append(build_time)
        print(f"{build_time} ms")

        # Wait a bit between runs to ensure port is released
        if i < 10:
            time.sleep(2)

    average = sum(results) / len(results)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"cold_build_dev_results_{timestamp}.csv"

    script_dir = os.path.dirname(os.path.abspath(__file__))
    outputs_dir = os.path.join(script_dir, 'outputs')
    os.makedirs(outputs_dir, exist_ok=True)
    filepath = os.path.join(outputs_dir, filename)

    with open(filepath, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['Server Run', 'Startup Time (ms)'])

        for i, startup_time in enumerate(results, 1):
            writer.writerow([i, startup_time])

        writer.writerow([])
        writer.writerow(['Average', f'{average:.2f}'])

    print(f"\nSaved: {filename}")
    print(f"Average startup time: {average:.2f} ms")

if __name__ == "__main__":
    main()
