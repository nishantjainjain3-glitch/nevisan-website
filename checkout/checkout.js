/* Nevisan Store API checkout. Prices, stock, shipping and payment status come from Medusa. */
(async function () {
  "use strict";
  await window.nevisanLocalReady;
  const config = window.NEVISAN_CHECKOUT || {};
  const $ = id => document.getElementById(id);
  const money = amount => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);
  const quantities = new Map();
  let products = [], region, busy = false, pending;
  const manual = config.paymentMode === "manual";
  function showManualOrder(order) {
    const handoff = window.NevisanManualPayment.details(order);
    const paid = order.payment_collections?.length && order.payment_collections.every(collection => collection.status === "completed" && Number(collection.captured_amount) >= Number(collection.amount));
    $("manual-panel").hidden = false; $("checkout-form").hidden = true; $("resume").hidden = true;
    $("manual-title").textContent = paid ? "Payment verified by Nevisan" : "Awaiting manual payment verification";
    $("manual-order").textContent = `Order #${order.display_id} · ${money(Number(order.total))} · Free shipping. Reference ${order.id}`;
    $("whatsapp-payment").href = handoff.whatsappUrl;
    const intent = new URL("upi://pay"); intent.search = new URLSearchParams({pa:"mahavirpaltan@icici",pn:"BINODJAIN",am:Number(order.total).toFixed(2),cu:"INR",tn:`Nevisan order ${order.display_id}`});
    $("upi-intent").href = intent.href;
    for (const id of ["merchant-qr","upi-intent","whatsapp-payment"]) $(id).hidden = !!paid;
    notice(paid ? `Order #${order.display_id}: Nevisan has recorded your bank credit. Thank you.` : `Order #${order.display_id} received — payment is NOT confirmed. Pay only once, send your screenshot on WhatsApp, and await Nevisan's review.`);
  }
  const states = {AN:"Andaman and Nicobar Islands",AP:"Andhra Pradesh",AR:"Arunachal Pradesh",AS:"Assam",BR:"Bihar",CH:"Chandigarh",CT:"Chhattisgarh",DH:"Dadra and Nagar Haveli and Daman and Diu",DL:"Delhi",GA:"Goa",GJ:"Gujarat",HR:"Haryana",HP:"Himachal Pradesh",JK:"Jammu and Kashmir",JH:"Jharkhand",KA:"Karnataka",KL:"Kerala",LA:"Ladakh",LD:"Lakshadweep",MP:"Madhya Pradesh",MH:"Maharashtra",MN:"Manipur",ML:"Meghalaya",MZ:"Mizoram",NL:"Nagaland",OR:"Odisha",PY:"Puducherry",PB:"Punjab",RJ:"Rajasthan",SK:"Sikkim",TN:"Tamil Nadu",TG:"Telangana",TR:"Tripura",UP:"Uttar Pradesh",UT:"Uttarakhand",WB:"West Bengal"};
  for (const [code, name] of Object.entries(states)) {
    const option = document.createElement("option"); option.value = `in-${code.toLowerCase()}`; option.textContent = name;
    document.querySelector('[name="province"]').append(option);
  }
  function notice(message, error = false) { $("notice").textContent = (config.testMode ? "LOCAL SIMULATION — no real payment. " : "") + message; $("notice").classList.toggle("error", error); }
  function storage(value) { try { if (value) localStorage.setItem("nevisan_pending_payment", JSON.stringify(value)); else localStorage.removeItem("nevisan_pending_payment"); } catch {} }
  function lock(value) {
    busy = value;
    for (const element of document.querySelectorAll("input,select,button")) element.disabled = value || !!pending;
    $("verify").disabled = value; $("resume").disabled = value || !pending?.url;
    $("payment-actions").hidden = !pending;
    if (!value && !pending) summary();
  }
  async function api(path, body) {
    const response = await fetch(new URL(path, config.apiUrl), { method: body ? "POST" : "GET", headers: { "Content-Type": "application/json", "x-publishable-api-key": config.publishableKey }, body: body ? JSON.stringify(body) : undefined, signal: AbortSignal.timeout(20000), redirect: "error" });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Checkout request failed. Please try again.");
    return result;
  }
  function selected() { return products.flatMap(product => { const quantity = quantities.get(product.id) || 0; return quantity ? [{ variant_id: product.variants[0].id, quantity }] : []; }); }
  function summary() {
    let count = 0, total = 0;
    for (const product of products) { const qty = quantities.get(product.id) || 0; count += qty; total += qty * product.variants[0].calculated_price.calculated_amount; }
    $("summary").replaceChildren();
    for (const [label, value] of [[`${count} × 50g packets`, money(total)], ["Shipping", "Free"], ["Estimated total", money(total)]]) {
      const row = document.createElement("div"); const left = document.createElement("span"); const right = document.createElement("span"); left.textContent = label; right.textContent = value; row.append(left, right); $("summary").append(row);
    }
    $("pay").disabled = busy || !!pending || !count || !config.enabled || [...document.querySelectorAll("#products input")].some(input => !input.checkValidity());
  }
  function renderProducts() {
    $("products").replaceChildren();
    for (const product of products) {
      const row = document.createElement("div"); row.className = "product";
      const description = document.createElement("div"); const title = document.createElement("h3"); title.textContent = product.title.replace(/^Nevisan /, "");
      const price = document.createElement("p"); price.textContent = `${money(product.variants[0].calculated_price.calculated_amount)} / 50g packet`;
      description.append(title, price);
      const quantity = document.createElement("input"); quantity.type = "number"; quantity.min = "0"; quantity.max = "1000"; quantity.step = "1"; quantity.value = "0"; quantity.setAttribute("aria-label", `${product.title} packet quantity`);
      quantity.value = String(quantities.get(product.id) || 0);
      quantity.addEventListener("input", () => { const value = Number(quantity.value); const valid = Number.isSafeInteger(value) && value >= 0 && value <= 1000; quantity.setCustomValidity(valid ? "" : "Choose a whole packet count from 0 to 1000."); quantities.set(product.id, valid ? value : 0); summary(); });
      row.append(description, quantity); $("products").append(row);
    }
    summary();
  }
  async function verify() {
    if (!pending || busy) return;
    lock(true); notice("Checking payment securely. Please wait…");
    try {
      const result = await api(`/store/carts/${encodeURIComponent(pending.cartId)}/complete?fields=+payment_collections.*`, {});
      if (result.type !== "order") { notice("Your payment is still awaiting verification. If debited, wait and check again; do not pay a second time."); return; }
      const order = result.order;
      if (order.currency_code !== "inr") throw new Error("Unexpected order currency; contact Nevisan.");
      if (manual) { showManualOrder(order); return; }
      notice(`Order #${order.display_id} confirmed. Thank you for choosing Nevisan. Total ${money(order.total)}.`);
      storage(null); pending = undefined;
      $("checkout-form").hidden = true; $("payment-actions").hidden = true;
      $("products").replaceChildren(document.createTextNode("Your order is confirmed. Contact care@nevisan.in for delivery or refund assistance."));
      products = []; quantities.clear();
    } catch (error) { notice(`${error.message} If money was debited, contact Nevisan before retrying payment.`, true); }
    finally { lock(false); }
  }
  $("verify").addEventListener("click", verify);
  $("resume").addEventListener("click", () => { if (pending?.url) window.location.assign(pending.url); });
  $("checkout-form").addEventListener("submit", async event => {
    event.preventDefault();
    if (busy || pending || !config.enabled || !event.target.reportValidity()) return;
    const items = selected(); if (!items.length) return;
    for (const input of document.querySelectorAll("#products input")) if (!input.reportValidity()) return;
    const form = Object.fromEntries(new FormData(event.target));
    lock(true); notice("Checking stock, delivery and your final total…");
    let cartId;
    try {
      const address = Object.fromEntries(["first_name", "last_name", "address_1", "address_2", "city", "province", "postal_code", "phone"].map(key => [key, String(form[key] || "").trim()]));
      address.country_code = "in"; address.phone = address.phone.replace(/[ +\-]/g, "");
      const created = await api("/store/carts", { region_id: region.id, items, email: form.email.trim(), shipping_address: address, billing_address: address });
      cartId = created.cart.id;
      const { shipping_options } = await api(`/store/shipping-options?cart_id=${encodeURIComponent(cartId)}`);
      const free = shipping_options.find(option => option.type?.code === "nevisan-free" && Number(option.amount) === 0 && !option.insufficient_inventory);
      if (!free) throw new Error("Free shipping is unavailable for this address. Contact Nevisan.");
      const { cart } = await api(`/store/carts/${cartId}/shipping-methods`, { option_id: free.id });
      if (Number(cart.shipping_total) !== 0 || cart.currency_code !== "inr" || cart.total <= 0) throw new Error("Unexpected checkout total. Contact Nevisan.");
      notice(`Verified total: ${money(cart.total)}. Preparing your order…`);
      const { payment_collection } = await api("/store/payment-collections", { cart_id: cartId });
      // Persist before initiation: a network timeout can hide a payment that the
      // gateway already created. Do not automatically start a second payment.
      pending = { cartId, url: null }; storage(pending);
      const initialized = await api(`/store/payment-collections/${payment_collection.id}/payment-sessions`, { provider_id: manual ? "pp_nevisan_manual_nevisan" : "pp_youpi_nevisan" });
      if (manual) {
        const completed = await api(`/store/carts/${cartId}/complete?fields=+payment_collections.*`, {});
        if (completed.type !== "order") throw new Error("Order creation is pending. Check status before retrying.");
        showManualOrder(completed.order); lock(false); return;
      }
      const session = initialized.payment_collection.payment_sessions.find(item => item.provider_id === "pp_youpi_nevisan");
      const checkout = new URL(session?.data?.checkout_url);
      if (checkout.protocol !== "https:" || checkout.origin !== new URL(config.checkoutOrigin).origin) throw new Error("Unexpected payment destination. Contact Nevisan.");
      pending = { cartId, url: checkout.href }; storage(pending); lock(false);
      notice(`Your total is ${money(cart.total)}, including free shipping. Continue to UPI, then return here to check confirmation.`);
      // Explicit second click lets the customer review the authoritative total.
      $("resume").focus();
    } catch (error) { notice(pending ? `${error.message} Payment setup is uncertain. Contact Nevisan before starting another payment; reference ${pending.cartId}.` : error.message, true); lock(false); }
  });
  try {
    if (config.previewOnly && ["localhost", "127.0.0.1"].includes(location.hostname)) {
      const response = await fetch("catalog-preview.json", { signal: AbortSignal.timeout(10000) });
      if (!response.ok) throw new Error("Demo catalog is unavailable.");
      const catalog = await response.json();
      products = catalog.map(product => ({ id: product.handle, title: product.title, handle: product.handle, variants: [{ id: product.handle, calculated_price: { calculated_amount: product.price, currency_code: "inr" } }] }));
      renderProducts();
      notice("DESIGN PREVIEW — Amazon-matched prices. Choose packet quantities to explore totals. Stock is unconfirmed; orders and payments are disabled.");
      return;
    }
    const origin = new URL(config.apiUrl);
    if (origin.protocol !== "https:" && !["localhost", "127.0.0.1"].includes(origin.hostname)) throw new Error("Checkout requires a secure backend.");
    if (!config.publishableKey) throw new Error("Checkout is being prepared. Online payments are not open yet. Contact care@nevisan.in for assistance.");
    const { regions } = await api("/store/regions");
    region = regions.find(item => item.currency_code === "inr" && item.countries?.some(country => country.iso_2 === "in"));
    if (!region) throw new Error("India checkout is not configured yet.");
    const result = await api(`/store/products?region_id=${region.id}&limit=100&fields=+variants.calculated_price,+metadata`);
    products = result.products.filter(product => product.metadata?.grams_per_packet === 50 && product.variants?.length === 1 && product.variants[0].calculated_price?.currency_code === "inr" && product.variants[0].calculated_price.calculated_amount > 0);
    const imported = new URLSearchParams(location.search).get("items");
    if (imported) {
      const items = JSON.parse(imported);
      if (!Array.isArray(items) || !items.length || items.length > 10) throw new Error("Invalid cart. Please return to Nevisan and select your teas again.");
      const seen = new Set();
      for (const item of items) {
        const product = products.find(product => product.handle === item.handle);
        if (!product || seen.has(item.handle) || !Number.isSafeInteger(item.quantity) || item.quantity < 1 || item.quantity > 1000) throw new Error("A selected tea is unavailable. Please return to Nevisan and review your cart.");
        seen.add(item.handle); quantities.set(product.id, item.quantity);
      }
    }
    renderProducts();
    try {
      const saved = JSON.parse(localStorage.getItem("nevisan_pending_payment") || "null");
      if (saved && /^cart_[a-zA-Z0-9]+$/.test(saved.cartId)) {
        if (saved.url === null) pending = saved;
        else { const url = new URL(saved.url); if (url.protocol === "https:" && url.origin === new URL(config.checkoutOrigin).origin) pending = saved; }
      }
    } catch {}
    lock(false);
    if (manual) $("resume").hidden = true;
    notice(pending ? "A UPI payment is pending. Check its status before starting another payment." : !config.enabled ? "Checkout preview — payments are not open yet." : products.length ? "Choose your teas to begin." : "Our tea collection is being prepared. Please check back soon.");
    if (manual && pending) await verify();
  } catch (error) { notice(error.message, true); }
})();
