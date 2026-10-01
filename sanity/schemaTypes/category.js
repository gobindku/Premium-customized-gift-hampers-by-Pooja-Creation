import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Product category",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "URL slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "eyebrow", title: "Small heading", type: "string" }),
    defineField({ name: "image", title: "Category image", type: "image", options: { hotspot: true }, fields: [{ name: "alt", title: "Alternative text", type: "string" }] }),
    defineField({ name: "actionLabel", title: "Link label", type: "string", initialValue: "View products" }),
    defineField({ name: "sortOrder", title: "Sort order", type: "number", initialValue: 0 }),
  ],
  preview: { select: { title: "title", media: "image" } },
});