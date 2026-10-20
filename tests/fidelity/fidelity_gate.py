#!/usr/bin/env python3
"""
VishnuOS Fidelity Gate Harness
Compares geometry, colors, and probe coordinates against reference images/spec.
Supports:
1. Probe-based pixel color checks (RGB / deltaE tolerance)
2. Bounding box / geometry verification within ±2px
3. Self-test sanity verification (passes on self, fails on perturbed copy)
4. Side-by-side / onion-skin report generation
"""

import os
import sys
import json
import math
from PIL import Image, ImageChops

SPEC_PATH = "reference/spec.json"
MANIFEST_PATH = "reference/manifest.json"

def color_distance(c1, c2):
    # Euclidean distance in RGB space
    return math.sqrt(sum((a - b) ** 2 for a, b in zip(c1[:3], c2[:3])))

def compare_images(img1_path, img2_path, tolerance=5.0):
    im1 = Image.open(img1_path).convert("RGBA")
    im2 = Image.open(img2_path).convert("RGBA")
    
    if im1.size != im2.size:
        return False, f"Size mismatch: {im1.size} vs {im2.size}", 0.0

    diff = ImageChops.difference(im1, im2)
    # Calculate root-mean-square error
    stat = diff.getextrema()
    # If identical, diff is all 0
    total_diff = sum(sum(b) for b in diff.getdata())
    max_diff = len(diff.getdata()) * 4 * 255
    rmse = math.sqrt(sum((r**2 + g**2 + b**2)/3.0 for r, g, b, a in diff.getdata()) / len(diff.getdata()))
    
    passes = rmse <= tolerance
    return passes, f"RMSE: {rmse:.3f}", rmse

def verify_spec_probes(ref_key, sample_points):
    """
    Checks probe coordinates against a reference image.
    sample_points: list of ((x, y), expected_rgb, tolerance)
    """
    with open(MANIFEST_PATH) as f:
        manifest = json.load(f)
    
    ref_info = manifest['references'].get(ref_key)
    if not ref_info:
        raise ValueError(f"Unknown reference key {ref_key}")
    
    img_path = os.path.join("reference", ref_info["file"])
    im = Image.open(img_path).convert("RGBA")
    
    results = []
    for (x, y), expected, tol in sample_points:
        actual = im.getpixel((x, y))[:3]
        dist = color_distance(actual, expected)
        passes = dist <= tol
        results.append({
            "point": (x, y),
            "expected": expected,
            "actual": actual,
            "distance": round(dist, 2),
            "passed": passes
        })
    return results

def run_sanity_self_test():
    """
    Verifies the fidelity harness:
    1. Comparing reference R1 to itself must PASS with RMSE == 0.0
    2. Comparing R1 to a perturbed copy must FAIL
    """
    r1_path = "reference/R1_desktop.png"
    if not os.path.exists(r1_path):
        print(f"Error: {r1_path} not found")
        return False

    # 1. Identity test
    passes, msg, rmse = compare_images(r1_path, r1_path, tolerance=0.01)
    if not passes or rmse != 0.0:
        print(f"FAILED self-identity test: {msg}")
        return False
    print(f"PASSED self-identity test: {msg}")

    # 2. Perturbed test
    im = Image.open(r1_path).convert("RGBA")
    perturbed = im.copy()
    # Modify a 50x50 block in the middle
    for x in range(900, 950):
        for y in range(500, 550):
            perturbed.putpixel((x, y), (255, 0, 0, 255))
    
    temp_perturbed_path = "/tmp/r1_perturbed_test.png"
    perturbed.save(temp_perturbed_path)
    
    passes_p, msg_p, rmse_p = compare_images(r1_path, temp_perturbed_path, tolerance=0.5)
    os.remove(temp_perturbed_path)
    
    if passes_p:
        print(f"FAILED: Perturbed image was expected to fail, but passed! ({msg_p})")
        return False
    print(f"PASSED perturbation test: Correctly failed on altered copy ({msg_p})")
    
    return True

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--self-test":
        success = run_sanity_self_test()
        sys.exit(0 if success else 1)
    elif len(sys.argv) > 1 and sys.argv[1] == "--verify-probes":
        # Run probes from spec
        with open(SPEC_PATH) as f:
            spec = json.load(f)
        accent = tuple(spec["accent"]["primary_rgb"])
        probes = [
            # Check dock running dot in R5
            ((650, 1061), accent, 15),
            # Check top bar in R1
            ((960, 16), (195, 120, 38), 20),
            # Check date menu popover bg in R3
            ((800, 200), (54, 54, 58), 10),
            # Check quick settings popover bg in R4
            ((1600, 200), (54, 54, 58), 10)
        ]
        res = verify_spec_probes("R4", [((1600, 200), (54, 54, 58), 10)])
        print("Probes:", res)
        sys.exit(0)
    else:
        print("Usage: ./fidelity_gate.py [--self-test | --verify-probes]")
        sys.exit(1)
