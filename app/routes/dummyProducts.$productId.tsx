// app/routes/dummyProducts.$productId.tsx

// Import necessary types and functions from Remix
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import invariant from "tiny-invariant";

// Mock data for three products
const products = [
  { id: 1, name: "Laptop", price: 999.99 },
  { id: 2, name: "Smartphone", price: 499.99 },
  { id: 3, name: "Tablet", price: 299.99 },
];

// Loader function to provide data to the component
// This function will be replaced with a database query in a real application
export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const productId = params.productId ? parseInt(params.productId) : null;
  invariant(params.productId, "productId not found");
  const product=products.find((product) => product.id === productId);

  if (!product) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ product});
};

// Default export function for the products page
export default function DummyProductDetailPage() {
  const data = useLoaderData<typeof loader>(); // Use the loader data in the component

  return (
<article className="w-full max-w-4xl mx-auto rounded-lg bg-white p-6 shadow-md">
      <header className="mb-4">
        <h1 className="text-3xl font-bold">Product Detail</h1>
      </header>
      <section className="space-y-4">
        <div className="border-b pb-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            {data.product.name}
          </h2>
          <p className="mt-2 text-xl text-gray-700">
            ${data.product.price.toFixed(2)}
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
 
