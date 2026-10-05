# Nevisan website

Static HTML pages with a React 18 homepage in `app.js`. Serve the repository root at `/`; the site uses root-relative asset and page links.

For a local preview:

```sh
python -m http.server 8000
```

Open `http://localhost:8000/`. React, GSAP and fonts load from external CDNs.

## Checks

Requires Python 3 and Node.js 22. No package installation is needed for the checks.

```sh
python scripts/check_site.py
node --test tests/*.test.cjs
python -m unittest discover -s tests -p 'test_*.py'
```

The static check validates HTML IDs, local references, inline JavaScript, JSON-LD, FAQ counts and the correspondence between visible FAQ answers and structured data. Behavior tests cover consent, cart handoff and token lifecycle. GitHub Actions runs these checks on pushes and pull requests.

## Consent and analytics

`consent.js` owns Google Consent Mode defaults, Meta startup and persisted cookie choices. Meta initializes only after acceptance. Application events check the current in-memory consent state. Visitors can change their choice through **Manage cookie preferences** on the privacy page.

Google Consent Mode starts with denied storage permissions for new visitors. Google scripts can still load under that mode; this is not a claim that all Google requests are blocked before acceptance. The homepage loads both GTM and direct GA4. Check the GTM container for a duplicate Google tag using measurement ID `G-W3Q7DNWTKP` before relying on pageview totals. GTM configuration is outside this repository.

## Flipkart utilities

Copy `flipkart.env.example` to a local `.env` and supply your own credentials. Environment variables override `.env`; CLI arguments override both. Keep token files and credentials out of git and the public site. The tools validate token responses, save tokens privately and atomically, and use a 30-second request timeout.

```sh
python flipkart_auth.py --code 'AUTHORIZATION_CODE'
python flipkart_ads_client.py --status
python flipkart_ads_client.py --refresh
```

`--status` reports local token availability, not a verified API connection. Tests mock the API. Verify endpoint access and permissions with your authorized seller account before using campaign or bid operations.

## Deployment verification

Before merging or deploying, visually check desktop and mobile layouts, product links, quiz results and WhatsApp cart handoff. Confirm live analytics events and consent changes in Google/Meta tools. Inspect live headers: `_headers` only takes effect on hosts that support it; GitHub Pages does not apply that file.

Research journal articles and customer quotations are retained. This code cleanup is not a certification of scientific claims, product certifications or live marketplace availability.

## Premium presentation

`site-polish.css` supplies the shared editorial design. `product-atelier.js` presents the complete supplied lifestyle images for all ten teas, with a second ritual view for GABA, Spearmint, Blue Flower and Ginger. It preserves artwork proportions, supports keyboard-accessible selectors and a missing-image fallback. The previous illustrative CSS pouch extrusion has been replaced following visual feedback.

Product sales copy and the FAQ focus on ingredients, taste, brewing and ordering. Aggregate ratings, unattributed verified testimonials and unsupported product-specific lab figures were removed. Existing packaging artwork and statutory declarations are retained as supplied; certificates, packaging claims, seller inventory and marketplace terms require their own source records.

The cloud browser supports desktop review; physical iPhone and Android testing is still outstanding.
