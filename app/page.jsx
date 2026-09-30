"use client";

import { useState } from "react";
import Link from "next/link";

const WHATSAPP_NUMBER = "9341567437";

const collections = [
  {
    title: "Birthday Hamper",
    description: "Sweet, cheerful surprises made for their special day.",
    image: "birthday.jpg",
    alt: "Birthday hamper",
    action: "View 7 products",
  },
  {
    title: "Engagement Hamper",
    description: "Elegant gifting for a beautiful new beginning.",
    image: "engagement.jpg",
    alt: "Engagement hamper",
    action: "Order this hamper",
  },
  {
    title: "Anniversary Hamper",
    description: "A romantic keepsake for celebrating together.",
    image: "anniversary.jpg",
    alt: "Anniversary hamper",
    action: "Order this hamper",
  },
  {
    title: "Love Hamper",
    description: "Thoughtful details for a heartfelt surprise.",
    image: "love.jpg",
    alt: "Love hamper",
    action: "Order this hamper",
  },
  {
    title: "Custom Hamper",
    description: "Tell us your theme, budget and favorite things.",
    image: "customize.jpg",
    alt: "Custom hamper",
    action: "Build your hamper",
  },
  {
    title: "Chocolate & Rose",
    category: "Chocolate & Rose Bouquet",
    description: "A premium bouquet pairing blooms with sweet treats.",
    image: "chocolate-rose.jpg",
    alt: "Chocolate and rose bouquet",
    action: "Order this hamper",
  },
  {
    title: "Dry Fruit Box",
    description: "Classic premium gifting with a refined presentation.",
    image: "dry-fruit.jpg",
    alt: "Dry fruit hamper",
    action: "Order this hamper",
  },
  {
    title: "Kanjak Hamper",
    description: "Festive gifting thoughtfully arranged for the occasion.",
    image: "kanjak.jpg",
    alt: "Kanjak hamper",
    action: "View 4 products",
  },
];

const categories = [
  "Birthday Hamper",
  "Engagement Hamper",
  "Anniversary Hamper",
  "Love Hamper",
  "Custom Hamper",
  "Chocolate & Rose Bouquet",
  "Dry Fruit Box",
  "Kanjak Hamper",
];

const budgets = [
  "Under ₹1,000",
  "₹1,000 – ₹2,000",
  "₹2,000 – ₹3,500",
  "₹3,500+",
  "I'll discuss",
];

export default function Home() {
  const [category, setCategory] = useState("Birthday Hamper");
  const [toastVisible, setToastVisible] = useState(false);

  function selectCollection(item) {
    setCategory(item.category || item.title);
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  }

  function handleCollectionKeyDown(event, item) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectCollection(item);
    }
  }

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

    if (WHATSAPP_NUMBER.includes("X")) {
      window.alert("Please replace WHATSAPP_NUMBER with your business WhatsApp number.");
      return;
    }

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
      <header>
        <div className="container nav">
          <Link className="brand" href="/">Pooja <span>Creation</span></Link>
          <nav aria-label="Main navigation">
            <Link href="/#collections">Collections</Link>
            <Link href="/#story">Why us</Link>
            <Link href="/#order">Order</Link>
          </nav>
          <Link className="btn btn-primary" href="/#order">Order on WhatsApp</Link>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <span className="kicker">Curated with love · Gift Shop</span>
              <h1>Gifts that hold <em>memories.</em></h1>
              <p>Make every moment special with thoughtfully curated, customizable hampers for birthdays, engagements, anniversaries, love, festivals and every beautiful surprise.</p>
              <div className="actions">
                <a className="btn btn-primary" href="#collections">Explore hampers</a>
                <a className="btn btn-light" href="#order">Customize my gift</a>
              </div>
            </div>
            <div className="hero-card">
              <img src="/assets/poster-reference.jpg" alt="Pooja Creation gift hamper collection" />
              <div className="badge">Premium presentation · Personal touch</div>
            </div>
          </div>
        </section>

        <section id="collections">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="eyebrow">Shop by occasion</div>
                <h2>Every feeling has a hamper.</h2>
              </div>
              <p>Each category is kept separate so customers can browse the exact kind of gift they need and send an order request directly to WhatsApp.</p>
            </div>
            <div className="grid">
              {collections.map((item) => {
                const detailPage = {
                  "Birthday Hamper": { href: "/birthday-hamper", label: "View Birthday Hamper products" },
                  "Engagement Hamper": { href: "/engagement-hamper", label: "View Engagement Hamper products" },
                  "Anniversary Hamper": { href: "/anniversary-hamper", label: "View Anniversary Hamper products" },
                  "Love Hamper": { href: "/love-hamper", label: "View Love Hamper products" },
                  "Custom Hamper": { href: "/custom-hamper", label: "View Custom Hamper products" },
                  "Chocolate & Rose": { href: "/chocolate-rose", label: "View Chocolate & Rose products" },
                  "Dry Fruit Box": { href: "/dry-fruit-box", label: "View Dry Fruit Box products" },
                  "Kanjak Hamper": { href: "/kanjak-hamper", label: "View Kanjak Hamper products" },
                }[item.title];
                const Card = detailPage ? Link : "article";
                const cardProps = detailPage
                  ? { href: detailPage.href, "aria-label": detailPage.label }
                  : {
                      onClick: () => selectCollection(item),
                      onKeyDown: (event) => handleCollectionKeyDown(event, item),
                      role: "button",
                      tabIndex: 0,
                      "aria-label": `Select ${item.title}`,
                    };

                return (
                  <Card className="card" key={item.title} {...cardProps}>
                    <img src={`/assets/${item.image}`} alt={item.alt} />
                    <div className="card-body">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <div className="mini">{item.action} →</div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section id="story" className="story">
          <div className="container story-grid">
            <div className="story-box">
              <div className="eyebrow">The Pooja Creation touch</div>
              <h2>Small details. Big memories.</h2>
              <p>From the flowers and chocolates to the message card and final presentation, every hamper is prepared to feel personal—not generic.</p>
              <div className="checks">
                <div className="check"><b>Made to order</b><span>Choose the occasion and personalize it.</span></div>
                <div className="check"><b>Premium presentation</b><span>Designed to look gift-ready from the moment it arrives.</span></div>
                <div className="check"><b>Personal message</b><span>Add your own note for the recipient.</span></div>
                <div className="check"><b>Easy WhatsApp ordering</b><span>Send your requirements in one message.</span></div>
              </div>
            </div>
            <div className="story-box story-image">
              <img src="/assets/poster-reference.jpg" alt="Pooja Creation gift collection" />
            </div>
          </div>
        </section>

        <section id="order" className="order">
          <div className="container order-grid">
            <div className="order-copy">
              <div className="eyebrow order-eyebrow">Order request</div>
              <h2>Let's create their surprise.</h2>
              <p>Fill in a few details and we'll open WhatsApp with your order message ready to send.</p>
              <p className="small">Replace the WhatsApp number in the page source with your business number before publishing.</p>
              <a className="btn btn-light" href="https://instagram.com/pooja._creation37" target="_blank" rel="noopener noreferrer">Instagram · @pooja._creation37</a>
            </div>
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
          </div>
        </section>
      </main>

      <footer>
        <div className="container foot">
          <span>© Pooja Creation · Gifts that hold memories</span>
          <a className="ig" href="https://instagram.com/pooja._creation37" target="_blank" rel="noopener noreferrer">@pooja._creation37</a>
        </div>
      </footer>
      <div className={`toast${toastVisible ? " toast-visible" : ""}`} role="status" aria-live="polite">WhatsApp message prepared.</div>
    </>
  );
}