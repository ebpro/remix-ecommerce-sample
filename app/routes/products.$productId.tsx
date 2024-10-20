// app/routes/products.$productId.tsx

import { useLoaderData, Link } from "@remix-run/react";
import invariant from "tiny-invariant";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getProduct } from "~/models/product.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const productId = params.productId ? parseInt(params.productId) : null;
  invariant(productId, "productId not found");
  const product = await getProduct({ id: productId });
  if (!product) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ product });
};

type Product = {
  id: number;
  name: string;
  price: number;
  description?: string | null;
  createdAt: string;
};

function ProductDetail({ product }: { product: Readonly<Product> }) {
  return (
    <article className="w-full max-w-4xl mx-auto rounded-lg bg-white p-6 shadow-md">
      <header className="mb-4">
        <h1 className="text-3xl font-bold">Product Detail</h1>
      </header>
      <section className="space-y-4">
        <div className="border-b pb-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            {product.name}
          </h2>
          <p className="mt-2 text-xl text-gray-700">
            ${product.price.toFixed(2)}
          </p>
          <p className="mt-4 text-gray-600">
            {product.description ?? "No description available."}
          </p>
          <p className="mt-4 text-gray-500">
            Created at: {new Date(product.createdAt).toLocaleDateString()}
          </p>
        </div>
      </section>
      <footer className="mt-6">
        <Link
          to="/products"
          className="inline-block rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Back to Products
        </Link>
      </footer>
    </article>
  );
}

// Default export function for the product detail page
export default function ProductDetailPage() {
  const data = useLoaderData<typeof loader>(); // Use the loader data in the component

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <ProductDetail product={data.product} />
    </div>
  );
}
