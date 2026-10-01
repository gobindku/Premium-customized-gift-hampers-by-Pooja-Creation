# Sanity Catalog Setup

## Connect a project

1. Create a Sanity project and a dataset named `production` in the Sanity dashboard.
2. Copy `.env.example` to `.env.local`.
3. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` to the project ID. Set `NEXT_PUBLIC_SANITY_DATASET` if the dataset has another name.
4. Restart the Next.js development server and open `/studio`.

The project ID and dataset name are public identifiers, not API secrets. The catalog uses Sanity's published, read-only content API.

## Manage products

Create and publish a category with its name, URL slug, description, and category image. Then create products, upload product images, enter their prices, and assign each product to its category. Categories link to `/collections/<slug>` and published changes appear within about a minute.

Until the project is configured and categories are published, the existing hardcoded catalog remains visible. Existing product entries are not automatically imported into Sanity.

## Deploy

CMS-backed routes need a Next.js server runtime; a static-only export is not sufficient. Deploy with a host or adapter that supports Next.js server rendering, and set the same two environment variables in its project settings. The Studio editor is available at `/studio` after deployment.