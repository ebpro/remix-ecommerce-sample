import type { Product } from "@prisma/client";
import { prisma } from "~/db.server";
import { faker } from "@faker-js/faker";

export type { Product } from "@prisma/client";

/**
 * Fetch a single product by its ID.
 * @param id - The ID of the product to fetch.
 * @returns The product with the specified ID, or null if not found.
 */
export function getProduct({ id }: Pick<Product, "id">) {
  return prisma.product.findFirst({
    select: { id: true, name: true, description: true, price: true, createdAt: true},
    where: { id },
  });
}

/**
 * Fetch a list of products.
 * @returns An array of products with their ID, name, and price.
 */
export function getProductListItems() {
  return prisma.product.findMany({
    select: { id: true, name: true, description:true, price: true },
    orderBy: {name: "asc"}
  });
}

/**
 * Create a new product.
 * @param name - The name of the product.
 * @param description - The description of the product.
 * @param price - The price of the product.
 * @returns The newly created product.
 */
export function createProduct({
  name,
  description,
  price,
}: Pick<Product, "name" | "description" | "price">) {
  return prisma.product.create({
    data: {
      name,
      description,
      price,
    },
  });
}

/**
 * Delete a product by its ID.
 * @param id - The ID of the product to delete.
 * @returns The deleted product.
 */
export function deleteProduct({ id }: Pick<Product, "id">) {
  return prisma.product.delete({
    where: { id },
  });
}

/**
 * Generate test fake data.
 * @param numberOfProducts - The number of products to generate.
 * @returns A promise that resolves when the database has been populated.
 */
export async function generateFakeData(numberOfProducts: number) {
  // Empty the database
  await prisma.product.deleteMany();

  // Generate fake products
  const products = Array.from({ length: numberOfProducts }, () => ({
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    description: faker.commerce.productDescription(),
  }));

  // Insert fake products into the database
  await prisma.product.createMany({ data: products });
}


