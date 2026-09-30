import Link from "next/link";

const products = [
  { name: "LOVE", price: "₹349", image: "love1 (1).jpg" },
  { name: "LOVE", price: "₹1,299", image: "love1 (2).jpg" },
  { name: "Love", price: "₹699", image: "love1 (3).jpg" },
  { name: "LOVE", price: "₹799", image: "love1 (4).jpg"}
];

export const metadata = {
  title: "Love Hampers | Pooja Creation",
  description: "Explore romantic love hampers and personalized surprise boxes from Pooja Creation.",
};

export default function LoveHamperPage() {
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
            <h1>Love Hampers</h1>
            <p>Thoughtfully curated gift boxes for heartfelt surprises, romantic moments, and memories that deserve to be cherished.</p>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.image}>
                <img src={`/assets/${product.image}`} alt={product.name} />
                <div className="product-card-info">
                  <h3>{product.name}</h3>
                  <span className="product-price">{product.price}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="product-order">
            <Link className="btn btn-primary" href="/#order">Customize a love hamper</Link>
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
