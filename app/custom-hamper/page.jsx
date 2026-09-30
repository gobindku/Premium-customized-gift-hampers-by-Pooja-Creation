import Link from "next/link";

const products = [
  { name: "Personalized Surprise Box", price: "₹1,999", image: "customize.jpg" },
  { name: "Theme Gift Custom Set", price: "₹2,499", image: "birthday.jpg" },
  { name: "Dream Hamper Custom", price: "₹2,899", image: "love.jpg" },
  { name: "Your Favorite Things", price: "₹1,599", image: "anniversary.jpg" },
  { name: "Custom Memory Gift", price: "₹2,199", image: "chocolate-rose.jpg" },
  { name: "Premium Tailored Box", price: "₹3,199", image: "engagement.jpg" },
];

export const metadata = {
  title: "Custom Hampers | Pooja Creation",
  description: "Create your own personalized hamper with themes, favorites, and budget-ready gifting options from Pooja Creation.",
};

export default function CustomHamperPage() {
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
            <div className="eyebrow">Pooja Creation · Personalized gifting</div>
            <h1>Custom Hampers</h1>
            <p>Tell us your theme, budget, colors and favorite add-ons, and we’ll design a hamper that feels truly yours.</p>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.image + product.name}>
                <img src={`/assets/${product.image}`} alt={product.name} />
                <div className="product-card-info">
                  <h3>{product.name}</h3>
                  <span className="product-price">{product.price}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="product-order">
            <Link className="btn btn-primary" href="/#order">Build my custom hamper</Link>
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
