import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Product name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "price", title: "Price (INR)", type: "number", validation: (rule) => rule.required().positive() }),
    defineField({ name: "image", title: "Product image", type: "image", options: { hotspot: true }, fields: [{ name: "alt", title: "Alternative text", type: "string" }], validation: (rule) => rule.required() }),
    defineField({ name: "category", title: "Category", type: "reference", to: [{ type: "category" }], validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "available", title: "Available", type: "boolean", initialValue: true }),
    defineField({ name: "sortOrder", title: "Sort order", type: "number", initialValue: 0 }),
  ],
  preview: { select: { title: "name", subtitle: "category.title", media: "image" } },
});