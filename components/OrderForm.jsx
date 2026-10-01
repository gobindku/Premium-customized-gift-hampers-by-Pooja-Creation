"use client";

import { useState } from "react";

const WHATSAPP_NUMBER = "9341567437";
const budgets = ["Under ₹1,000", "₹1,000 – ₹2,000", "₹2,000 – ₹3,500", "₹3,500+", "I'll discuss"];

export default function OrderForm({ categories }) {
  const [category, setCategory] = useState(categories[0] || "");
  const [toastVisible, setToastVisible] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const value = (key) => String(values.get(key) || "").trim();
    const message = `Hello Pooja Creation! 💝

I'd like to place an order.

Name: ${value("name")}
Phone: ${value("phone")}
Hamper: ${value("category")}
Budget: ${value("budget")}
Required date: ${value("date") || "To discuss"}
Theme / color: ${value("theme") || "Open to suggestions"}

Requirements:
${value("message") || "Please share available options."}

Please share the final price and available customization options. Thank you!`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setToastVisible(true);
    window.setTimeout(() => setToastVisible(false), 3000);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div><label htmlFor="name">Your name</label><input id="name" name="name" required placeholder="e.g. Priya" /></div>
          <div><label htmlFor="phone">Your phone</label><input id="phone" name="phone" required placeholder="e.g. 98765 43210" /></div>
        </div>
        <div className="row">
          <div>
            <label htmlFor="category">Hamper category</label>
            <select id="category" name="category" value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="budget">Approx. budget</label>
            <select id="budget" name="budget">{budgets.map((item) => <option key={item}>{item}</option>)}</select>
          </div>
        </div>
        <div className="row">
          <div><label htmlFor="date">Required date</label><input id="date" name="date" type="date" /></div>
          <div><label htmlFor="theme">Theme / color</label><input id="theme" name="theme" placeholder="e.g. pink & white" /></div>
        </div>
        <div><label htmlFor="message">Message / special requirements</label><textarea id="message" name="message" placeholder="Recipient name, items you want, delivery area, card message, etc." /></div>
        <button className="btn btn-primary" type="submit">Continue on WhatsApp →</button>
      </form>
      <div className={`toast${toastVisible ? " toast-visible" : ""}`} role="status" aria-live="polite">WhatsApp message prepared.</div>
    </>
  );
}