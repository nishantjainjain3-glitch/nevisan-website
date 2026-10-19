/* Build customer-initiated WhatsApp handoff from the server-created order only. */
(function(root) {
  "use strict";
  function details(order) {
    if (!order?.id || !order.display_id || order.currency_code !== "inr" || !Array.isArray(order.items) || !order.items.length || !Number.isFinite(Number(order.total)) || Number(order.total) <= 0) throw new Error("Order details are unavailable. Contact Nevisan before paying.");
    const address = order.shipping_address;
    if (!address?.address_1 || !address?.city || !address?.postal_code || !address?.phone) throw new Error("Delivery details are unavailable. Contact Nevisan before paying.");
    const money = amount => new Intl.NumberFormat("en-IN", {style:"currency",currency:"INR"}).format(amount);
    const lines = order.items.map(item => {
      const quantity = Number(item.quantity);
      if (!Number.isSafeInteger(quantity) || quantity < 1 || quantity > 1000) throw new Error("Invalid packet count");
      return `${item.product_title || item.title}: ${quantity} × 50g packets`;
    });
    const message = ["NEVISAN PAY — PAYMENT REVIEW REQUEST", `Order #${order.display_id}`, `Reference: ${order.id}`, "", ...lines, "Shipping: FREE", `Order total: ${money(Number(order.total))}`, "", `Customer: ${[address.first_name,address.last_name].filter(Boolean).join(" ")}`, `Mobile: ${address.phone}`, `Email: ${order.email || ""}`, "Delivery address:", ...[address.address_1,address.address_2,address.city,address.province,address.postal_code,"India"].filter(Boolean), "", "I am submitting my payment for manual bank-credit verification. I will attach my payment screenshot and bank reference here. Please confirm the actual credit before dispatch."].join("\n");
    return {message, whatsappUrl: `https://wa.me/919864245687?text=${encodeURIComponent(message)}`};
  }
  root.NevisanManualPayment = { details };
  if (typeof module === "object") module.exports = {details};
})(typeof window === "object" ? window : globalThis);
