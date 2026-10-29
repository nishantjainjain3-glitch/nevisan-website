"""Regenerate mobile derivatives from original images, keeping full-resolution views."""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]

def main():
    jobs = [(ROOT/'nevisan-logo.jpeg', ROOT/'brand-mark-96.webp', (96,96), 85), (ROOT/'hero-mobile-fast.webp', ROOT/'hero-mobile.webp', (640,960), 50)]
    jobs += [(p, p.with_name(p.stem+'-640.webp'), (640,640), 72) for p in sorted((ROOT/'teas').glob('*-lifestyle.webp'))]
    for source, target, size, quality in jobs:
        before = target.stat().st_size if target.exists() else source.stat().st_size
        with Image.open(source) as im:
            im.convert('RGB').resize(size, Image.Resampling.LANCZOS).save(target, 'WEBP', quality=quality, method=6)
        print(target.relative_to(ROOT), before, '->', target.stat().st_size)

if __name__ == '__main__':
    main()
