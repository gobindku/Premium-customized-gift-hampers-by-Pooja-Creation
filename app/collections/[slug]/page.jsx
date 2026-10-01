import Link from "next/link";
import { notFound } from "next/navigation";

const collectionCatalog = {
  "birthday-hamper": {
    title: "Birthday Hamper",
    description: "Find a little surprise for every celebration, from cute keepsakes to thoughtfully filled gift boxes.",
    eyebrow: "Pooja Creation · Celebration collection",
    products: [
      { name: "Mini Hamper", price: "₹550", image: "birthday-rs550.png" },
      { name: "Farewell Hamper", price: "₹149", image: "birthday-farewell-rs149.png" },
      { name: "Girls Gift Combo Set", price: "₹199", image: "birthday-girls-combo-rs199.png" },
      { name: "Mini Hamper", price: "₹1,200", image: "birthday-rs1200.png" },
      { name: "Cute Birthday Gift Hamper", price: "₹99", image: "birthday-cute-rs99.png" },
      { name: "Mini Hamper", price: "₹450", image: "birthday-rs450.png" },
      { name: "Mini Hamper", price: "₹299", image: "birthday-rs299.png" },
    ],
  },
  "engagement-hamper": {
    title: "Engagement Hamper",
    description: "Elegant gifting for a beautiful new beginning.",
    eyebrow: "Pooja Creation · Engagement collection",
    products: [
      { name: "Classic Engagement Box", price: "₹1,499", image: "engagement.jpg" },
      { name: "Premium Celebration Gift", price: "₹2,199", image: "engagement.jpg" },
      { name: "Elegant Couple Set", price: "₹1,899", image: "engagement.jpg" },
    ],
  },
  "anniversary-hamper": {
    title: "Anniversary Hamper",
    description: "A romantic keepsake for celebrating together.",
    eyebrow: "Pooja Creation · Anniversary collection",
    products: [
      { name: "Love Story Box", price: "₹1,799", image: "anniversary.jpg" },
      { name: "Forever Together Hamper", price: "₹2,499", image: "anniversary.jpg" },
      { name: "Golden Memory Set", price: "₹2,199", image: "anniversary.jpg" },
    ],
  },
  "love-hamper": {
    title: "Love Hamper",
    description: "Thoughtful details for a heartfelt surprise.",
    eyebrow: "Pooja Creation · Love collection",
    products: [
      { name: "Heartfelt Love Box", price: "₹1,299", image: "love.jpg" },
      { name: "Soulful Surprise Hamper", price: "₹1,799", image: "love1 (1).jpg" },
      { name: "Sweet Together Gift", price: "₹1,499", image: "love1 (2).jpg" },
    ],
  },
  "custom-hamper": {
    title: "Custom Hamper",
    description: "Tell us your theme, budget and favorite things.",
    eyebrow: "Pooja Creation · Bespoke gifting",
    products: [
      { name: "Custom Theme Box", price: "₹1,999", image: "customize.jpg" },
      { name: "Personalized Surprise", price: "₹2,499", image: "customize.jpg" },
      { name: "Signature Gift Hamper", price: "₹2,899", image: "customize.jpg" },
    ],
  },
  "chocolate-rose": {
    title: "Chocolate & Rose",
    description: "A premium bouquet pairing blooms with sweet treats.",
    eyebrow: "Pooja Creation · Floral gourmet collection",
    products: [
      { name: "Rose & Chocolate Box", price: "₹1,299", image: "chocolate-rose.jpg" },
      { name: "Luxury Bloom Basket", price: "₹1,899", image: "rose (1).jpg" },
      { name: "Sweet Rose Surprise", price: "₹1,599", image: "rose (2).jpg" },
    ],
  },
  "dry-fruit-box": {
    title: "Dry Fruit Box",
    description: "Classic premium gifting with a refined presentation.",
    eyebrow: "Pooja Creation · Premium dry fruit collection",
    products: [
      { name: "Royal Dry Fruit Box", price: "₹2,199", image: "dry-fruit.jpg" },
      { name: "Deluxe Celebration Pack", price: "₹2,799", image: "fruit1.jpg" },
      { name: "Festive Gourmet Box", price: "₹2,499", image: "fruit2.jpg" },
    ],
  },
  "kanjak-hamper": {
    title: "Kanjak Hamper",
    description: "Festive gifting thoughtfully arranged for the occasion.",
    eyebrow: "Pooja Creation · Festive collection",
    products: [
      { name: "Kanjak Blessing Box", price: "₹1,499", image: "kanjak.jpg" },
      { name: "Festive Gift Set", price: "₹1,799", image: "kanjak-gift-bag.jpg" },
      { name: "Traditional Celebration Hamper", price: "₹2,199", image: "kanjak-hamper-box.jpg" },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(collectionCatalog).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = collectionCatalog[slug];

  return {
    title: category ? `${category.title} | Pooja Creation` : "Collection | Pooja Creation",
    description: category?.description || "Explore gift hampers from Pooja Creation.",
  };
}

export default async function CollectionPage({ params }) {
  const { slug } = await params;
  const category = collectionCatalog[slug];

  if (!category) notFound();

  const products = category.products;

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
      <main className="product-page">
        <div className="container">
          <Link className="product-back" href="/#collections">← Back to collections</Link>
          <div className="product-heading">
            <div className="eyebrow">{category.eyebrow}</div>
            <h1>{category.title}</h1>
            <p>{category.description}</p>
          </div>
          {products.length ? (
            <div className="product-grid">
              {products.map((product, index) => (
                <article className="product-card" key={`${category.title}-${index}`}>
                  <img src={product.image.startsWith("http") ? product.image : `/assets/${product.image}`} alt={`${product.name}, ${product.price}`} />
                  <div className="product-card-info">
                    <h3>{product.name}</h3>
                    <span className="product-price">{product.price}</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="catalog-empty">Products in this collection will be added soon.</p>
          )}
          <div className="product-order">
            <Link className="btn btn-primary" href="/#order">Ask about this collection</Link>
          </div>
        </div>
      </main>
      <footer>
        <div className="container foot">
          <span>© Pooja Creation · Gifts that hold memories</span>
          <a className="ig" href="https://instagram.com/pooja._creation37" target="_blank" rel="noopener noreferrer">@pooja._creation37</a>
        </div>
      </footer>
    </>
  );
}