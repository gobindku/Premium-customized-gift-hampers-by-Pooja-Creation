import Link from "next/link";

const products = [
  { name: "Kanjak Snack & Stationery Hamper", image: "kanjak-gift-hamper.jpg" },
  { name: "Kanjak Gift Box", image: "kanjak-hamper-box.jpg" },
  { name: "Kanjak Gift Bag", image: "kanjak-gift-bag.jpg" },
  { name: "Kanjak Special Hamper", image: "kanjak-special-hamper.jpg" },
];

export const metadata = {
  title: "Kanjak Hampers | Pooja Creation",
  description: "Explore four specially curated Kanjak hampers from Pooja Creation.",
};

export default function KanjakHamperPage() {
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
            <div className="eyebrow">Pooja Creation · Festive collection</div>
            <h1>Kanjak Hampers</h1>
            <p>Thoughtfully arranged gifts for Kanjak, filled with festive treats and little keepsakes to make the occasion special.</p>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.image}>
                <img src={`/assets/${product.image}`} alt={product.name} />
                <h3>{product.name}</h3>
              </article>
            ))}
          </div>
          <div className="product-order">
            <Link className="btn btn-primary" href="/#order">Customize a Kanjak hamper</Link>
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