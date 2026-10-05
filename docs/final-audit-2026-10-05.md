# Nevisan website audit — 5 October 2026

Status: fixes published; final browser interaction recheck pending because the browser/workspace environment disconnected. Do not mark the project fully signed off from this record alone.

## Published changes

PR #21 rewrote all 34 journal articles, aligned journal navigation and metadata, removed the simulated newsletter subscription, improved FAQ/filter accessibility, clarified WhatsApp draft feedback and added direct quiz product links. PR #22 fixed rapid image-viewer closing/reopening scroll restoration, clarified company/certification/privacy/contact/wholesale wording, updated the stale AI-readable guide, added the message field’s accessible name and corrected a narrow-screen location grid rule.

Latest code deployment: `109d6b1869c0082d84bb5fd89c5fd3b136c47f49`. GitHub Site checks and Pages build/deployment completed successfully.

## Completed verification

| Check | Result |
| --- | --- |
| Static pages, references, JavaScript and JSON-LD | 59 HTML pages passed |
| FAQ text and schema | 40 questions matched |
| Automated tests | 28 JavaScript and 9 Python tests passed |
| Quiz combinations | All 216 paths reached valid product pages; all ten teas reachable |
| Live journal navigation | All 34 articles opened and returned to `/journal/`; no observed broken images or horizontal desktop overflow |
| Live product galleries | All 52 views selected and enlarged across ten products; no observed broken full-size images |
| Packaging disclosures | All ten opened; no observed broken images or desktop overflow |
| Homepage product gallery | Ten teas × three views exercised |
| Collection | Ten centred image viewers, correct product destinations, ten store dialogs; botanical filter returned six teas |
| FAQ controls | All 12 categories and 40 disclosures exercised; positive/no-result searches and clear tested |
| Contact form | Empty fields rejected; valid test input prepared a draft; return-to-form retained fields |
| Wholesale form | Empty fields rejected; valid test input prepared the expected draft and fallback link |
| Cookie preferences | Accept, decline and reopen exercised; consent behaviour covered by automated tests |
| Supporting pages | Locations, reviews, contact, terms, privacy and 404 rendered without observed broken images or desktop overflow |
| Legacy routes | `/faq.html` and `/#journal` reached their canonical pages |

No messages, orders or payments were sent during testing. Flipkart API tests used mocks, not a live seller account.

## Copy review

Used Wikipedia’s Signs of AI writing as an editorial reference, not an authorship detector. Replaced repeated generic paragraphs, vague hype, invented research/manufacturing anecdotes, unsupported health and caffeine claims, inaccurate per-cup arithmetic and false form-success messages. Updated `llms-full.txt` to match the public product information and correct article/FAQ counts. These edits improve specificity and readability; they do not prove human authorship or guarantee detector results.

After the final deployment, independent page retrieval confirmed the corrected privacy title, updated AI-readable guide and revised GABA journal article. This confirms published text, not interactive viewer behaviour.

## Remaining sign-off checks

1. Restore a working browser session and repeat the deployed product viewer’s rapid close/reopen and Escape sequences, confirming scrolling and focus return correctly. Two regression tests already pass.
2. Verify the deployed message-field accessible name, company/certification copy and journal return-link styling in the browser; capture a fresh screenshot.
3. Test real iPhone/Android and Safari devices. Source review and automated fallbacks are not physical-device testing.
4. Check current Amazon/Flipkart listing availability, stock and delivery in the owner’s marketplace accounts. No checkout was completed.
5. Owner confirmation of pack declarations, current certification coverage, company facts and business policy details remains necessary; this audit does not certify legal compliance.
6. Import genuine offline customer feedback when its original records are provided. Do not publish generated or unverified reviews as customer testimony.
7. Analytics dashboards and a PageSpeed score were not independently verified. The PageSpeed API quota blocked the earlier attempt.
