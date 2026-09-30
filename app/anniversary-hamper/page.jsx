import Link from "next/link";

const products = [
  { name: "Golden Memory Box", price: "₹2,399", image: "anniversary.jpg" },
  { name: "Romantic Couple Set", price: "₹2,999", image: "love.jpg" },
  { name: "Forever Love Hamper", price: "₹2,699", image: "customize.jpg" },
  { name: "Celebration Keepsake", price: "₹3,299", image: "chocolate-rose.jpg" },
  { name: "Anniversary Sweet Surprise", price: "₹1,899", image: "birthday.jpg" },
  { name: "Love Story Gift Box", price: "₹2,799", image: "engagement.jpg" },
];

export const metadata = {
  title: "Anniversary Hampers | Pooja Creation",
  description: "Explore romantic anniversary hamper ideas and premium custom gift boxes by Pooja Creation.",
};

export default function AnniversaryHamperPage() {
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
            <div className="eyebrow">Pooja Creation · Romantic collection</div>
            <h1>Anniversary Hampers</h1>
            <p>Sentimental gifts designed to celebrate love, togetherness and unforgettable memories with elegant presentation.</p>
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
            <Link className="btn btn-primary" href="/#order">Customize an anniversary hamper</Link>
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
