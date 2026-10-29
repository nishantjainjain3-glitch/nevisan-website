# Production assets

The readable JavaScript remains in app.js, premium-experience.js and product-atelier.js.
The homepage serves the minified copies in assets/. After editing these source files
or running catalogue/policy synchronization, run:

```
python scripts/build_production_js.py
```

This uses pinned Terser 5.44.1 through Node/npx. Commit the generated assets and
manifest with the sources. Tests reject stale or mismatched production files.

Regenerate mobile image derivatives with `python scripts/optimize_mobile_images.py`
(Pillow required). Full-resolution tea artwork stays available for image previews.
React 18.3.1 is self-hosted unchanged in vendor/, with its MIT licence alongside it.

The public site uses GitHub Pages. Its HTTP cache lifetime cannot be changed using
Netlify-only header configuration; no custom-cache improvement is claimed.
