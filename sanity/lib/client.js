import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const sanityConfigured = Boolean(projectId);

export const sanityClient = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2025-02-19",
      useCdn: true,
    })
  : null;

const fetchOptions = { next: { revalidate: 60 } };

export async function getCategories() {
  if (!sanityClient) return [];

  return sanityClient.fetch(
    `*[_type == "category"] | order(sortOrder asc, title asc) {
      _id,
      title,
      "slug": slug.current,
      description,
      eyebrow,
      actionLabel,
      "image": image.asset->url,
      "imageAlt": image.alt
    }`,
    {},
    fetchOptions,
  );
}

export async function getCategoryBySlug(slug) {
  if (!sanityClient) return null;

  return sanityClient.fetch(
    `*[_type == "category" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      description,
      eyebrow
    }`,
    { slug },
    fetchOptions,
  );
}

export async function getProductsByCategory(slug) {
  if (!sanityClient) return [];

  return sanityClient.fetch(
    `*[_type == "product" && available == true && category->slug.current == $slug] | order(sortOrder asc, name asc) {
      _id,
      name,
      price,
      description,
      "image": image.asset->url,
      "imageAlt": image.alt
    }`,
    { slug },
    fetchOptions,
  );
}