# Journal editing and SEO

The ten guides improved after the October 2026 Search Console audit are authored
in `content/journal-guides.json`. Edit this source, then run:

```text
python scripts/build_journal_guides.py
python scripts/build_production_js.py
python scripts/audit_seo.py
python -m unittest discover -s tests -p "test*seo.py"
python -m unittest discover -s tests -p "test_content.py"
```

The journal builder updates those ten visible articles, their cards on the journal
hub and homepage, catalog-based packet references, and modification dates for the
changed guides and hub. All 34 article pages also receive sharing metadata and
BlogPosting markup aligned to the visible title, description, image and canonical.
Existing publication dates are retained; absent publication dates are not invented.

The homepage's `POSTS` array is source JavaScript, so its minified asset and
manifest must be rebuilt and committed after copy changes. Bump the homepage's
app asset query version when deploying a changed bundle.

Update the source date only for a substantive guide revision. Product declarations
come from `content/product-catalog.json`; the physical pouch takes precedence.
Never add invented first-hand tastings, medical review credentials, certification
coverage, clinical benefits or caffeine measurements. Link research beside claims
and distinguish general tea research from this brand's products. Cold infusion
needs confirmation for the exact product; current recipes use published hot-brew
instructions. Preserve canonical paths and legacy migration redirects.

Google's index inclusion remains a separate, asynchronous decision. Sitemap
success, valid markup and indexing requests are not evidence of index inclusion.
