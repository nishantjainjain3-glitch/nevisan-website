# Nevisan Pay — free QR and WhatsApp ordering

This static checkout runs on the existing GitHub Pages website. No backend host, bank API, YouPI service or Medusa connection is used for these orders.

Customers select 50g packets, add delivery details and review the total. The QR receives payments into the existing ICICI merchant UPI address. The UPI-app link includes the exact total; the printed QR requires the customer to enter that amount. Customers open WhatsApp, attach their screenshot and press Send. No message or screenshot is sent automatically.

## Processing an order

1. Receive the WhatsApp request at +91 98642 45687. Save the NEV reference.
2. Recalculate product prices and packet counts against the current catalogue. Website-generated totals and references are customer-prepared, not authenticated server orders.
3. Check the actual credit in ICICI, including amount and transaction reference. Compare against previously processed references to avoid reusing the same payment. Never accept a screenshot as proof by itself.
4. Confirm the delivery address, tea selection and payment to the customer. Pack the stated number of 50g packets and send tracking after dispatch.
5. Keep a private order/payment/dispatch register. Update shared Amazon stock when a website order is accepted. Stock counts are not displayed on the website.

Prices are maintained in checkout/catalog.js and must match homepage/product prices when changed. The owner confirmed worldwide delivery. Indian orders use the existing free India Post policy for serviceable PIN codes. International customers can enter their country, address and phone; they must confirm delivery and the order total with Nevisan on WhatsApp before the QR appears. All payment amounts are INR, and customers need a supported UPI app/account. A WhatsApp enquiry is available before payment.

There is no automatic bank verification, receipt, status polling, inventory reservation, screenshot upload, refund or order synchronisation into Medusa. A reference is created locally and is lost if the page reloads before the customer saves/sends it. Nevisan receives nothing until the customer sends the WhatsApp message. No contact/address is stored by the checkout in browser storage or sent to analytics.

Disable website checkout by setting enabled:false in cart-bridge.js; product/cart actions then return to their existing WhatsApp enquiry flow.
