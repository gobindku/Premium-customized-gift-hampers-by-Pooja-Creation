"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "pooja-creation-admin-products";

const categories = [
  { name: "Birthday Hamper", slug: "birthday-hamper" },
  { name: "Engagement Hamper", slug: "engagement-hamper" },
  { name: "Anniversary Hamper", slug: "anniversary-hamper" },
  { name: "Love Hamper", slug: "love-hamper" },
  { name: "Custom Hamper", slug: "custom-hamper" },
  { name: "Chocolate & Rose Bouquet", slug: "chocolate-rose" },
  { name: "Dry Fruit Box", slug: "dry-fruit-box" },
  { name: "Kanjak Hamper", slug: "kanjak-hamper" },
];

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(price);
}

async function compressImage(file) {
  if (!file.type.startsWith("image/")) throw new Error("Choose an image file.");
  if (file.size > 10 * 1024 * 1024) throw new Error("Choose an image smaller than 10 MB.");

  const bitmap = await window.createImageBitmap(file);
  const scale = Math.min(1, 1200 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", 0.8));
  if (!blob) throw new Error("This image could not be processed. Try another file.");

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("This image could not be read. Try another file."));
    reader.readAsDataURL(blob);
  });
}

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", description: "", category: categories[0].slug, price: "", image: "", imageName: "" });
  const [isImageProcessing, setIsImageProcessing] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setProducts(parsed);
      }
    } catch {
      setNotice("Saved catalog could not be read. New changes can still be added.");
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch {
      setNotice("Browser storage is unavailable. Changes may not persist after leaving this page.");
    }
  }, [isReady, products]);

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return products;
    return products.filter((product) =>
      [product.name, product.description, product.categoryName].some((value) => value.toLowerCase().includes(query)),
    );
  }, [products, search]);

  async function handleImageChange(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setIsImageProcessing(true);
    try {
      const image = await compressImage(file);
      setForm((current) => ({ ...current, image, imageName: file.name }));
      setNotice(`${file.name} is ready to add.`);
    } catch (error) {
      setNotice(error.message);
    } finally {
      setIsImageProcessing(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (isImageProcessing) return;
    const category = categories.find((item) => item.slug === form.category);
    const product = {
      id: window.crypto.randomUUID(),
      name: form.name.trim(),
      description: form.description.trim(),
      category: category.slug,
      categoryName: category.name,
      price: Number(form.price),
      image: form.image.trim(),
    };

    setProducts((current) => [product, ...current]);
    setForm({ name: "", description: "", category: categories[0].slug, price: "", image: "", imageName: "" });
    setNotice(`${product.name} added to ${category.name}.`);
  }

  function deleteProduct(product) {
    setProducts((current) => current.filter((item) => item.id !== product.id));
    setNotice(`${product.name} removed from this catalog.`);
  }

  const categoryCount = new Set(products.map((product) => product.category)).size;

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <Link className="admin-brand" href="/" aria-label="Pooja Creation home">
          <span className="admin-brand-mark">PC</span>
          <span>Pooja <b>Creation</b></span>
        </Link>
        <div className="admin-side-label">Workspace</div>
        <div className="admin-side-link admin-side-link-active"><span aria-hidden="true">▦</span> Catalog</div>
        <Link className="admin-side-link" href="/"><span aria-hidden="true">↗</span> View storefront</Link>
        <div className="admin-side-note">
          <span className="admin-status-dot" />
          <div><b>Browser catalog</b><small>Saved on this device</small></div>
        </div>
      </aside>

      <section className="admin-main">
        <header className="admin-topbar">
          <div className="admin-breadcrumb">Workspace <span>/</span> Catalog</div>
          <Link href="/" className="admin-store-link">Open storefront <span aria-hidden="true">↗</span></Link>
        </header>

        <div className="admin-content">
          <div className="admin-title-row">
            <div>
              <div className="admin-eyebrow">PRODUCT MANAGEMENT</div>
              <h1>Catalog</h1>
              <p>Keep your gift collection organized and up to date.</p>
            </div>
            <span className="admin-local-badge"><span className="admin-status-dot" /> Local draft</span>
          </div>

          <div className="admin-stats" aria-label="Catalog summary">
            <div className="admin-stat"><span>Products</span><strong>{isReady ? products.length : "—"}</strong><small>In this browser catalog</small></div>
            <div className="admin-stat"><span>Categories</span><strong>{isReady ? categoryCount : "—"}</strong><small>With products added</small></div>
            <div className="admin-stat admin-stat-accent"><span>Available categories</span><strong>{categories.length}</strong><small>Storefront collections</small></div>
          </div>

          <div className="admin-workspace">
            <section className="admin-panel admin-form-panel">
              <div className="admin-panel-heading">
                <div><span className="admin-step">01</span><h2>Add a product</h2></div>
                <p>Product details</p>
              </div>
              <form className="admin-product-form" onSubmit={handleSubmit}>
                <label htmlFor="product-name">Product name</label>
                <input id="product-name" name="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="e.g. Rose & Chocolate Box" maxLength={80} required />

                <label htmlFor="product-description">Description</label>
                <textarea id="product-description" name="description" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="A short description of this gift" maxLength={240} required />

                <label htmlFor="product-category">Product category</label>
                <select id="product-category" name="category" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} required>
                  {categories.map((category) => <option key={category.slug} value={category.slug}>{category.name}</option>)}
                </select>

                <label htmlFor="product-image">Product image <span className="admin-label-hint">OPTIONAL</span></label>
                <input className="admin-file-input" id="product-image" name="image" type="file" accept="image/*" onChange={handleImageChange} />
                <p className="admin-image-hint">{form.imageName ? `Selected: ${form.imageName}` : "Choose an image from your device. Images are compressed before saving."}</p>
                {form.image && <button className="admin-remove-image" type="button" onClick={() => setForm((current) => ({ ...current, image: "", imageName: "" }))}>Remove selected image</button>}

                <label htmlFor="product-price">Price <span className="admin-label-hint">INR</span></label>
                <div className="admin-price-input"><span>₹</span><input id="product-price" name="price" type="number" min="0.01" step="0.01" inputMode="decimal" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} placeholder="0.00" required /></div>

                <button className="admin-add-button" type="submit" disabled={!isReady || isImageProcessing}><span aria-hidden="true">＋</span> {isImageProcessing ? "Processing image…" : "Add to catalog"}</button>
                <p className="admin-form-footnote">Changes are saved in this browser only.</p>
              </form>
            </section>

            <section className="admin-panel admin-list-panel">
              <div className="admin-panel-heading admin-list-heading">
                <div><span className="admin-step">02</span><h2>Products</h2><span className="admin-count">{products.length}</span></div>
                <label className="admin-search"><span aria-hidden="true">⌕</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products" aria-label="Search products" /></label>
              </div>
              {notice && <p className="admin-notice" role="status">{notice}<button type="button" onClick={() => setNotice("")} aria-label="Dismiss message">×</button></p>}
              {!isReady ? <div className="admin-empty">Loading catalog…</div> : visibleProducts.length ? (
                <div className="admin-product-list">
                  {visibleProducts.map((product) => (
                    <article className="admin-product-row" key={product.id}>
                      {product.image ? <img className="admin-product-thumb" src={product.image} alt="" /> : <div className="admin-product-monogram" aria-hidden="true">{product.name.slice(0, 1).toUpperCase()}</div>}
                      <div className="admin-product-copy">
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <Link className="admin-category-tag" href={`/${product.category}`}>{product.categoryName}<span aria-hidden="true">↗</span></Link>
                      </div>
                      <strong className="admin-product-price">{formatPrice(product.price)}</strong>
                      <button className="admin-delete-button" type="button" onClick={() => deleteProduct(product)} aria-label={`Delete ${product.name}`} title="Delete product"><span aria-hidden="true">×</span></button>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="admin-empty">
                  <span className="admin-empty-mark" aria-hidden="true">＋</span>
                  <h3>{search ? "No matching products" : "Your catalog is ready"}</h3>
                  <p>{search ? "Try a different product or category." : "Add your first product with the form to get started."}</p>
                </div>
              )}
              {products.length > 0 && <div className="admin-list-footer">Showing {visibleProducts.length} of {products.length} products</div>}
            </section>
          </div>
          <p className="admin-disclaimer">This catalog is stored in local browser storage and does not update the public storefront.</p>
        </div>
      </section>
    </main>
  );
}