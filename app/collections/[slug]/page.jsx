import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getProductsByCategory } from "../../../sanity/lib/client";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  return {
    title: category ? `${category.title} | Pooja Creation` : "Collection | Pooja Creation",
    description: category?.description || "Explore gift hampers from Pooja Creation.",
  };
}

export default async function CollectionPage({ params }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) notFound();

  const products = await getProductsByCategory(slug);

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
            <div className="eyebrow">{category.eyebrow || "Pooja Creation · Gift collection"}</div>
            <h1>{category.title}</h1>
            {category.description && <p>{category.description}</p>}
          </div>
          {products.length ? (
            <div className="product-grid">
              {products.map((product) => (
                <article className="product-card" key={product._id}>
                  <img src={product.image} alt={product.imageAlt || product.name} />
                  <div className="product-card-info">
                    <h3>{product.name}</h3>
                    <span className="product-price">₹{Number(product.price).toLocaleString("en-IN")}</span>
                  </div>
                  {product.description && <p className="product-description">{product.description}</p>}
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