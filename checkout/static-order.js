/* Original Nevisan request builder. A request never implies payment success. */
(function(root) {
  'use strict';
  function selection(raw, catalog) {
    if (!Array.isArray(raw) || raw.length > catalog.length) throw new Error('Please review your tea selection.');
    const seen = new Set();
    return raw.map(item => {
      const tea = catalog.find(tea => tea.handle === item?.handle);
      if (!tea || seen.has(item.handle) || !Number.isSafeInteger(item.quantity) || item.quantity < 1 || item.quantity > 1000) throw new Error('Choose whole packet quantities from 1 to 1000 for each tea.');
      seen.add(item.handle);
      return {handle:tea.handle, title:tea.title, quantity:item.quantity, price:tea.price};
    });
  }
  const money = value => new Intl.NumberFormat('en-IN', {style:'currency',currency:'INR'}).format(value);
  const total = items => items.reduce((sum,item) => sum + item.price * item.quantity, 0);
  function build(items, customer, reference, utr = '', availability = false) {
    if (!items.length || !/^NEV-[A-Z0-9-]+$/.test(reference)) throw new Error('Prepare your order request first.');
    if (utr && !/^[0-9]{12}$/.test(utr)) throw new Error('Enter a 12-digit UPI bank reference or leave it blank.');
    const message = [availability ? 'NEVISAN — DELIVERY & TEA AVAILABILITY REQUEST' : 'NEVISAN PAY — MANUAL PAYMENT REVIEW REQUEST',
      `Request reference: ${reference}`, '', ...items.map(i => `${i.title}: ${i.quantity} × 50g @ ${money(i.price)} = ${money(i.quantity*i.price)}`),
      'Shipping: FREE', `Total payable: ${money(total(items))}`, '', `Customer: ${customer.first_name} ${customer.last_name}`, `Mobile: ${customer.phone}`, `Email: ${customer.email}`,
      'Delivery address:', ...['address_1','address_2','city','province','postal_code'].map(k => customer[k]).filter(Boolean), customer.country || 'India', '',
      availability ? 'Please confirm delivery to my address and my tea selection before I pay.' : `Please check the actual ICICI bank credit and confirm my order. UTR: ${utr || 'I will add it here'}. I will attach my payment screenshot before pressing Send.`,
      'This is a customer-prepared request; payment and order acceptance require Nevisan’s verification.',
      availability ? 'Please reply with the delivery arrangements and total before payment.' : 'Please reply on WhatsApp with payment received and order accepted after verification, and confirm the teas, packet quantities, paid total and delivery address. Please share the carrier name, tracking number and tracking link after dispatch.'].join('\n');
    return 'https://wa.me/919864245687?text=' + encodeURIComponent(message);
  }
  function upi(items, reference) {
    return 'upi://pay?' + new URLSearchParams({pa:'mahavirpaltan@icici',pn:'BINODJAIN',am:total(items).toFixed(2),cu:'INR',tn:`Nevisan ${reference}`}).toString();
  }
  function mobileDevice(userAgent, touchPoints = 0) {
    return /Android|iPhone|iPad|iPod/i.test(userAgent) || (/Macintosh/i.test(userAgent) && touchPoints > 1);
  }
  function rememberCart(items, storage) {
    // Only product identities/counts: never delivery details, prices or payment data.
    try { storage.setItem('nevisan-cart-v1', JSON.stringify(items.map(item => ({name:item.title.replace(/^Nevisan /,''),qty:item.quantity})))); }
    catch { /* Cart storage is optional. */ }
  }
  root.NevisanStaticOrder = {selection,money,total,build,upi,mobileDevice,rememberCart};
  if (typeof module === 'object') module.exports = root.NevisanStaticOrder;
})(typeof window === 'object' ? window : globalThis);
