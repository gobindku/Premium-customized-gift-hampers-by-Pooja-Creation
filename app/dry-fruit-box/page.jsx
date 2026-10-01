import Link from "next/link";

const products = [
  { name: "Premium Dry Fruit Box", price: "₹", image: "fruit1.jpg" },
  { name: "Festive Nut Gift Box", price: "₹", image: "fruit2.jpg" },
 
];

export const metadata = {
  title: "Dry Fruit Boxes | Pooja Creation",
  description: "Premium dry fruit and gourmet gift boxes curated for elegant celebrations from Pooja Creation.",
};

export default function DryFruitBoxPage() {
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
            <div className="eyebrow">Pooja Creation · Gourmet collection</div>
            <h1>Dry Fruit Boxes</h1>
            <p>Classic, premium and thoughtful gift boxes packed with rich flavors and elegant presentation for celebratory moments.</p>
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
            <Link className="btn btn-primary" href="/#order">Customize a dry fruit box</Link>
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
