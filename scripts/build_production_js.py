"""Build committed browser assets. Requires Node/npx; pins Terser for repeatability."""
from pathlib import Path
import hashlib
import json
import shutil
import subprocess

ROOT = Path(__file__).resolve().parents[1]
SOURCES = ['app.js', 'premium-experience.js', 'product-atelier.js']

def main():
    npx = shutil.which('npx.cmd') or shutil.which('npx')
    if not npx:
        raise SystemExit('Node/npx is required to rebuild production JavaScript.')
    out = ROOT / 'assets'
    out.mkdir(exist_ok=True)
    manifest = {}
    for source in SOURCES:
        target = 'assets/' + source.replace('.js', '.min.js')
        subprocess.run([npx, '--yes', '--package', 'terser@5.44.1', 'terser', source, '--compress', '--mangle', '--output', target], cwd=ROOT, check=True)
        digest = lambda file: hashlib.sha256(file.read_bytes().replace(b'\r\n', b'\n')).hexdigest()
        manifest[source] = {'output': target, 'source_sha256': digest(ROOT/source), 'output_sha256': digest(ROOT/target)}
        print(source, (ROOT/source).stat().st_size, '->', (ROOT/target).stat().st_size)
    (out/'js-manifest.json').write_text(json.dumps(manifest, indent=2)+'\n', encoding='utf-8')

if __name__ == '__main__':
    main()
