# Nevisan product verification — 28 October 2026

All amounts below are for one 50g packet, in INR. The owner confirmed MRP ₹499
for every tea, GABA Tea Pvt. Ltd. as GABA's manufacturer, and Tailor Made Tea for
the other nine teas. These owner confirmations take precedence over conflicting
Amazon manufacturer/MRP fields. FSSAI numbers, shelf life and batch declarations
were retained; this audit does not independently certify those declarations.

## Selling prices checked

Amazon India standard one-time selling prices were read from the ten linked
listings. The logged-in Ginger listing's flavour selector also displayed all ten
prices with NEVISAN as the seller. Cashback and bank-specific offers were excluded.
These are a manual snapshot, not an automatic Amazon price feed.

| Tea | Previous website price | Checked website price | Listing |
| --- | ---: | ---: | --- |
| Blue Flower | ₹379 | ₹349 | [Amazon](https://www.amazon.in/dp/B0FTZ7KQ5B) |
| Chamomile | ₹329 | ₹299 | [Amazon](https://www.amazon.in/dp/B0FV2QGRBM) |
| GABA Oolong | ₹449 | ₹449 | [Amazon](https://www.amazon.in/dp/B0GTRBXKP8) |
| Ginger | ₹389 | ₹299 | [Amazon](https://www.amazon.in/dp/B0H6PZYPMP) |
| Lemongrass | ₹299 | ₹279 | [Amazon](https://www.amazon.in/dp/B0FSZSZ1ZM) |
| Organic Green | ₹279 | ₹259 | [Amazon](https://www.amazon.in/dp/B0FV2N83XD) |
| Rum | ₹399 | ₹389 | [Amazon](https://www.amazon.in/dp/B0FV2QVGVL) |
| Spearmint | ₹399 | ₹349 | [Amazon](https://www.amazon.in/dp/B0GTR2GXW2) |
| Tulsi | ₹299 | ₹279 | [Amazon](https://www.amazon.in/dp/B0FSZVRPSG) |
| Whiskey | ₹399 | ₹349 | [Amazon](https://www.amazon.in/dp/B0FSZXVWXD) |

## Product information corrected

- Ingredient declarations now include natural ginger, rum and whiskey flavour;
  tasting notes are not presented as lists of physical botanical ingredients.
- Product page, collection and brewing-guide starting directions agree:
  2–2.5g per cup, 85–90°C, 1.5–2 minutes; Chamomile and GABA use 2 minutes.
  Current pouch instructions take precedence. Two existing illustrated brewing
  guides (GABA and Blue Flower) were inspected and match these directions.
- Green and oolong tea blends clearly contain caffeine. No exact caffeine dose,
  treatment outcome or sleep guarantee is asserted in product metadata/FAQs.
- Product search descriptions and Product structured data match the corrected
  information. Three factual FAQs are visible and match FAQ structured data.
- Copied product-page testimonials without supporting evidence were replaced
  with product FAQs; marketplace feedback links remain. The separate reviews
  archive was outside this product-catalog audit and has not been authenticated.
- Product, sticky purchase bar, homepage collection and checkout prices agree.
  Price ranges and the cost-per-cup journal example use current selling prices.

## Maintaining accuracy

Edit `content/product-catalog.json` only after checking the relevant listing and
current physical pack. Record the verification date and source. Then run:

```text
python scripts/sync_product_catalog.py
python scripts/check_site.py
node --test tests/*.test.cjs
python -m unittest discover -s tests -p 'test_*.py'
```

`scripts/update_product_seo.py` delegates to the same sync command so the former
hard-coded health claims cannot overwrite checked facts. Bump the collection and
checkout catalog cache versions when publishing a later price change. Do not use
generated packaging artwork to verify legal declarations or current batches.
