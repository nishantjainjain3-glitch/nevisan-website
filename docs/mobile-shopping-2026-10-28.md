# Mobile shopping verification — 28 October 2026

## Fixes

- Expose the existing Add to Cart action on all ten visible collection cards.
- Keep product packet quantities limited to explicit purchase links; WhatsApp
  support and policy links retain their intended destinations.
- Keep cart and store-choice dialogs above the cookie banner, with scroll
  containment, keyboard dismissal and larger cart quantity controls.
- Preserve tea identities and packet counts in the current browser tab. Reloads
  and returning from checkout restore current catalog prices. No address,
  contact details, bank reference or screenshot is stored with the cart.
- Enforce the same 1–1000 packet limit in cart and checkout. Empty carts display
  a message and disable checkout until a tea is added.
- Synchronize checkout quantity edits with the tab's cart and selection URL.
- Allow a text keyboard for international postal codes.

## Verification

- Browser layouts: 390×844 and 320×640.
- All ten product pages: all four purchase links carry the selected handle and
  three-packet quantity; support links remain WhatsApp links (40 routes checked).
- Invalid zero-packet selection blocks navigation; the sticky purchase action
  opens the correct selected tea and quantity.
- Cart: add different teas, increase/decrease, remove final item, empty state,
  reload recovery and returning from checkout with edited packet counts.
- Two Ginger packets plus one GABA packet total ₹1,047, with free shipping.
- Required fields and invalid contact/UTR values block the relevant next step.
- Synthetic Indian checkout prepares a request with matching product totals;
  international addresses accept alphabetic postal codes and payment stays
  hidden until delivery confirmation.
- Automated tests cover all ten store-choice destinations, current prices,
  quantity bounds, rejected saved data, storage failure and no customer data
  in cart memory, alongside the existing checkout and site-wide suites.

No payment was made and no test order or WhatsApp message was sent. Responsive
browser testing runs on a desktop browser; launching an installed UPI app must
still be checked on a physical phone. The mobile-device detection and generated
UPI amount are covered by automated tests.
