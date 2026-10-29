# Product imagery and certification audit — 29 October 2026

The ten current front/back pack mockups are artwork, not independently verified
photographs of current stock. They contain claims and certification-like marks
that cannot be established from the files alone. They must not be used as evidence
of label declarations, clinical effects, pesticide testing or organic coverage.

The public shopping galleries now use selected existing, clearly labelled tea
illustrations without those pack claims. Original artwork is preserved in the
repository; it is not linked by the current product galleries. Reviews are outside
this audit and remain unchanged at the owner's request. Product names and ingredient
declarations retain the previously checked supplier/marketplace wording; that is
not independent validation of organic certification.

`content/product-evidence.json` records the review status, declared licence numbers
and selected display sources. Full-size display copies are byte-identical to those
sources; web derivatives only resize/compress and preserve aspect ratio. None is
presented as a real packet photograph.

The blanket PGS-certified, FSSAI-licensed and chemical-free promotional badges were
removed. Licence numbers remain clearly separated by marketer/manufacturer and
described as declared details, with current validity/scope still needing official
verification. A food-business licence is not an organic certificate or lab test.
GABA's manufacturer is GABA TEA PVT. LTD.; the other nine use Tailor Made Tea.
The unverified copied manufacturer address on GABA was removed. The marketer's
contact address follows the owner's confirmed Paltan Bazar business address.

## Evidence still needed

- Clear, unedited front and back photographs of each actual current 50g packet.
  Include one close-up of batch, dates, MRP, manufacturer and licence details.
- A photo of the actual dry leaves and prepared cup, if available. Keep any
  personal information out of the frame.
- Current PGS-India or NPOP certificate, including operator/group number, issuer,
  validity period, covered products and relevant processing/packing scope.
- Current FSSAI licences showing the correct business, premises, validity and
  activity/product scope for marketer and both manufacturers.
- Confirm GABA TEA PVT. LTD.'s current manufacturing address from the actual
  packet/licence. Do not copy Tailor Made Tea's address onto it.

Missing files do not establish that a certificate or licence does not exist.
Do not label any of these documents verified until the evidence is checked.

## Maintaining the changes

After updating reviewed source evidence, run `scripts/publish_product_evidence.py`
(Pillow needed for the web derivatives), then rebuild production JavaScript with
`scripts/build_production_js.py`. Update cache versions for changed browser assets.
If the journal builder is rerun, run the image publishing step afterward so cover
dimensions/captions remain aligned. The regression tests prevent old pack mockups
and unsupported badges returning to product galleries.

Official references:

- https://jaivikbharat.fssai.gov.in/consumer_guidance.php
- https://jaivikbharat.fssai.gov.in/standard-pgs.php

These explain the schemes; they are not certification evidence for Nevisan.
