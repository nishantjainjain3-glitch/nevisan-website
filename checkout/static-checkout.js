(function() {
  'use strict';
  const catalog = window.NEVISAN_TEAS, api = window.NevisanStaticOrder;
  const $ = id => document.getElementById(id);
  const notice = message => { $('notice').textContent = message; };
  const form = $('checkout-form');
  const mobile = api.mobileDevice(navigator.userAgent,navigator.maxTouchPoints);
  let request = null;
  const international = country => !['india','in','bharat'].includes(country.trim().toLowerCase());
  function addressRules() {
    const abroad=international(form.elements.country.value);
    form.elements.phone.pattern=abroad ? '\\+?[0-9]{7,15}' : '(?:\\+91[ ]?)?[6-9][0-9]{9}';
    form.elements.postal_code.pattern=abroad ? '.{1,20}' : '[1-9][0-9]{5}';
    form.elements.postal_code.required=!abroad;
    form.elements.postal_code.inputMode=abroad ? 'text' : 'numeric';
  }
  form.elements.country.addEventListener('input',addressRules);
  addressRules();
  const states = ['Andaman and Nicobar Islands','Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chandigarh','Chhattisgarh','Dadra and Nagar Haveli and Daman and Diu','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jammu and Kashmir','Jharkhand','Karnataka','Kerala','Ladakh','Lakshadweep','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Puducherry','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal'];
  for (const state of states) { const option = document.createElement('option'); option.value = option.textContent = state; $('states').append(option); }
  let initial = [];
  try { const value = new URLSearchParams(location.search).get('items'); if (value) initial = api.selection(JSON.parse(value),catalog); }
  catch(error) { notice(error.message + ' Please choose your teas below.'); }
  const inputs = catalog.map(tea => {
    const row = document.createElement('div'); row.className = 'product';
    const description = document.createElement('div'); const heading = document.createElement('h3'); heading.textContent = tea.title.replace(/^Nevisan /,'');
    const price = document.createElement('p'); price.textContent = `MRP ${api.money(tea.price)} · 50g packet`;
    description.append(heading,price);
    const label = document.createElement('label'); label.className = 'packet-label'; label.textContent = 'Packets';
    const input = document.createElement('input'); input.type='number'; input.min='0'; input.max='1000'; input.step='1'; input.value=String(initial.find(i=>i.handle===tea.handle)?.quantity || 0); input.setAttribute('aria-label',tea.title + ' packet quantity');
    input.addEventListener('input',update); label.append(input); row.append(description,label); $('products').append(row);
    return {tea,input};
  });
  function read() {
    const raw = inputs.map(({tea,input}) => ({handle:tea.handle,quantity:Number(input.value)}));
    if (inputs.some(({input})=>input.value.trim()==='') || raw.some(i=>!Number.isSafeInteger(i.quantity)||i.quantity<0||i.quantity>1000)) throw new Error('Use whole packet quantities between 0 and 1000.');
    return api.selection(raw.filter(i=>i.quantity>0),catalog);
  }
  function update(remember=false) {
    if(request) edit();
    try {
      const items=read(); const packets=items.reduce((s,i)=>s+i.quantity,0);
      $('summary').textContent=`${packets} packet${packets===1?'':'s'} · Total ${api.money(api.total(items))} · Free shipping`; $('prepare').disabled=!items.length;
      if(remember) {
        try { api.rememberCart(items,window.sessionStorage); } catch {}
        const url=new URL(location.href);url.searchParams.set('items',JSON.stringify(items.map(({handle,quantity})=>({handle,quantity}))));history.replaceState(null,'',url);
      }
    }
    catch(error) { $('summary').textContent=error.message; $('prepare').disabled=true; }
  }
  function edit() { request=null; $('payment-panel').hidden=true; form.hidden=false; $('payment-details').hidden=true; $('bank-reference').value=''; $('international-confirmed').checked=false; notice('Review your details before preparing a new payment request.'); }
  form.addEventListener('submit',event=>{
    event.preventDefault(); if(!form.reportValidity())return;
    try {
      const items=read(); if(!items.length)throw new Error('Choose at least one packet.');
      const customer=Object.fromEntries(new FormData(form));
      for(const key of Object.keys(customer)) customer[key]=customer[key].trim();
      if(['first_name','last_name','address_1','city','country','province'].some(key=>!customer[key]))throw new Error('Please complete your delivery details.');
      const reference='NEV-'+new Date().toISOString().slice(0,10).replace(/-/g,'')+'-'+crypto.randomUUID().slice(0,8).toUpperCase();
      request={items,customer,reference};
      $('order-review').replaceChildren();
      for(const line of [`Reference: ${reference}`,...items.map(i=>`${i.title}: ${i.quantity} × 50g — ${api.money(i.quantity*i.price)}`),`Total: ${api.money(api.total(items))} · Free shipping`,`${customer.first_name} ${customer.last_name} · ${customer.phone}`,...['address_1','address_2','city','province','postal_code'].map(k=>customer[k]).filter(Boolean),customer.country]) { const p=document.createElement('p'); p.textContent=line; $('order-review').append(p); }
      $('availability').href=api.build(items,customer,reference,'',true);
      $('upi-intent').href=mobile ? api.upi(items,reference) : '#payment-help';
      $('upi-intent').textContent=mobile ? 'Open UPI app on this phone' : 'How to pay from this computer';
      $('payment-help').textContent=mobile
        ? 'Use an installed UPI app. If it does not open, open this checkout in your phone’s normal browser, or download the QR and select it from your UPI app’s photo gallery scanner. You can also copy the UPI ID and enter the exact total manually.'
        : 'UPI apps run on your phone. Open your phone’s UPI app and scan this QR on the computer screen. Enter the exact total shown above. This computer cannot open the UPI app installed on your phone.';
      $('payment-total').textContent=api.money(api.total(items));
      $('send-payment').href=api.build(items,customer,reference);
      $('international-confirmation').hidden=!international(customer.country); $('international-confirmed').checked=false; $('payment-details').hidden=international(customer.country);
      form.hidden=true; $('payment-panel').hidden=false; $('payment-panel').focus();
      notice('Request prepared on this device. Send it on WhatsApp so Nevisan can receive it. Keep this page open until you finish.');
    } catch(error) { notice(error.message); }
  });
  $('international-confirmed').addEventListener('change',()=>{if(request)$('payment-details').hidden=!$('international-confirmed').checked;});
  $('upi-intent').addEventListener('click',event=>{
    if(!mobile){event.preventDefault();$('payment-help').focus();$('payment-help').scrollIntoView({block:'center',behavior:'smooth'});}
    else notice('Opening your installed UPI app. If nothing opens, follow the QR or UPI ID instructions below. Returning here does not confirm payment.');
  });
  $('copy-upi').addEventListener('click',async()=>{
    try { await navigator.clipboard.writeText('mahavirpaltan@icici'); $('copy-status').textContent='UPI ID copied. Check BINODJAIN and the exact order total before paying.'; }
    catch { $('copy-status').textContent='Copy this UPI ID manually: mahavirpaltan@icici'; }
  });
  $('send-payment').addEventListener('click',event=>{
    if(!request || (international(request.customer.country) && !$('international-confirmed').checked) || !$('bank-reference').reportValidity()){event.preventDefault();return;}
    $('send-payment').href=api.build(request.items,request.customer,request.reference,$('bank-reference').value);
    notice('After WhatsApp opens, attach your screenshot and press Send. Payment remains subject to Nevisan’s bank-credit review.');
  });
  $('edit-order').addEventListener('click',()=>{edit();form.elements.first_name.focus();});
  $('new-order').addEventListener('click',()=>{edit();form.reset();addressRules();inputs.forEach(({input})=>input.value='0');update(true);notice('Choose teas for your new request.');});
  update();
  if(!$('notice').textContent.includes('Please choose'))notice('Complimentary shipping. International delivery is confirmed with Nevisan on WhatsApp. Payment is verified manually.');
})();
