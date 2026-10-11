"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "pooja-creation-admin-products";

function formatPrice(price) {
  if (typeof price !== "number") return price || "";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(price);
}

function getImageSource(image) {
  if (!image) return "";
  const source = image.trim();
  if (source.startsWith("data:") || source.startsWith("http") || source.startsWith("/")) return source;
  return `/assets/${source}`;
}

export default function CatalogProductGrid({ categorySlug, initialProducts, emptyMessage }) {
  const [savedProducts, setSavedProducts] = useState([]);

  useEffect(() => {
    function readSavedProducts() {
      try {
        const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
        setSavedProducts(Array.isArray(saved) ? saved.filter((product) => product.category === categorySlug) : []);
      } catch {
        setSavedProducts([]);
      }
    }

    function handleStorageChange(event) {
      if (event.key === STORAGE_KEY || event.key === null) readSavedProducts();
    }

    readSavedProducts();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [categorySlug]);

  const products = [...savedProducts, ...initialProducts];

  if (!products.length) return <p className="catalog-empty">{emptyMessage || "Products in this collection will be added soon."}</p>;

  return (
    <div className="product-grid">
      {products.map((product, index) => {
        const imageSource = getImageSource(product.image);
        return (
          <article className="product-card" key={product.id || `${product.name}-${product.image}-${index}`}>
            {imageSource ? (
              <img src={imageSource} alt={`${product.name}${product.price ? `, ${formatPrice(product.price)}` : ""}`} />
            ) : (
              <div className="product-card-placeholder" aria-hidden="true">{product.name.slice(0, 1).toUpperCase()}</div>
            )}
            <div className="product-card-info">
              <h3>{product.name}</h3>
              {product.price && <span className="product-price">{formatPrice(product.price)}</span>}
            </div>
            {product.description && <p className="product-description">{product.description}</p>}
          </article>
        );
      })}
    </div>
  );
}