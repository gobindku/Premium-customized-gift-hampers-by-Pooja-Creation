import Link from "next/link";

const products = [
  { name: "Mini Hamper", price: "₹550", image: "birthday-rs550.png" },
  { name: "Farewell Hamper", price: "₹149", image: "birthday-farewell-rs149.png" },
  { name: "Girls Gift Combo Set", price: "₹199", image: "birthday-girls-combo-rs199.png" },
  { name: "Mini Hamper", price: "₹1,200", image: "birthday-rs1200.png" },
  { name: "Cute Birthday Gift Hamper", price: "₹99", image: "birthday-cute-rs99.png" },
  { name: "Mini Hamper", price: "₹450", image: "birthday-rs450.png" },
  { name: "Mini Hamper", price: "₹299", image: "birthday-rs299.png" },
    { name: "Birthday SPECIAL", price: "₹249", image: "bd.jpg" },
  { name: "Birthday SPECIAL", price: "₹249", image: "bd1.jpg" },
  { name: "Birthday SPECIA", price: "₹249", image: "bd2.jpg" },
  { name: "Birthday SPECIA", price: "₹249", image: "bd3.jpg" },
  
];

export const metadata = {
  title: "Birthday Hampers | Pooja Creation",
  description: "Explore birthday hampers and gift sets from Pooja Creation.",
};

export default function BirthdayHamperPage() {
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
            <div className="eyebrow">Pooja Creation · Celebration collection</div>
            <h1>Birthday Hampers</h1>
            <p>Find a little surprise for every celebration, from cute keepsakes to thoughtfully filled gift boxes.</p>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.image}>
                <img src={`/assets/${product.image}`} alt={`${product.name}, ${product.price}`} />
                <div className="product-card-info">
                  <h3>{product.name}</h3>
                  <span className="product-price">{product.price}</span>
                </div>
              </article>
            ))}
          </div>
          <div className="product-order">
            <Link className="btn btn-primary" href="/#order">Customize a birthday hamper</Link>
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