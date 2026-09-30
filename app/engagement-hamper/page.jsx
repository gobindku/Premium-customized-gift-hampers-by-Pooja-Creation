import Link from "next/link";

const products = [
  { name: "EGAGEMENT", price: "₹2,499", image: "anisery (1).jpg" },
  { name: "EGAGEMENT", price: "₹3,199", image: "anisery (2).jpg" },
  { name: "EGAGEMENT PACK", price: "₹2,899", image: "anisery (3).jpg" }
];

export const metadata = {
  title: "Engagement Hampers | Pooja Creation",
  description: "Explore elegant engagement hampers and bridal surprise boxes from Pooja Creation.",
};

export default function EngagementHamperPage() {
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
            <div className="eyebrow">Pooja Creation · Bridal collection</div>
            <h1>Engagement Hampers</h1>
            <p>Beautifully designed surprise boxes for the bride-to-be, filled with elegant essentials, makeup, keepsakes and heartfelt details.</p>
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
            <Link className="btn btn-primary" href="/#order">Customize an engagement hamper</Link>
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
