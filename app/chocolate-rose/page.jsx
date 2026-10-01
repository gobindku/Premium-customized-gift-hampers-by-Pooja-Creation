import Link from "next/link";

const products = [
  { name: "Rose & Chocolate Combo", price: "₹", image: " rose (1).jpg" },
  { name: "Premium Rose Bouquet", price: "₹", image: " rose (2).jpg" },
  { name: "Sweet Valentine Pack", price: "₹", image: " rose (3).jpg" },
  { name: "Love Bloom Basket", price: "₹", image: " rose (4).jpg" },
  
];

export const metadata = {
  title: "Chocolate & Rose Hampers | Pooja Creation",
  description: "Beautiful chocolate and rose bouquet combinations for romantic gifting and memorable occasions.",
};

export default function ChocolateRosePage() {
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
            <div className="eyebrow">Pooja Creation · Bloom & sweet collection</div>
            <h1>Chocolate & Rose</h1>
            <p>Fresh florals and delicious sweetness blended into elegant surprise boxes for a heartfelt gift.</p>
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
            <Link className="btn btn-primary" href="/#order">Order this combo</Link>
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
