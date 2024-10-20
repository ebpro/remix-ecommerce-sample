// app/routes/dummyProducts.tsx

// Import necessary types and functions from Remix
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

// Mock data for three products
const products = [
  { id: 1, name: 'Laptop', price: 999.99 },
  { id: 2, name: 'Smartphone', price: 499.99 },
  { id: 3, name: 'Tablet', price: 299.99 },
];

// Loader function to provide data to the component
// This function will be replaced with a database query in a real application
export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json(products); // Return the mock products data as JSON
};

// Default export function for the products page
export default function DummyProductsPage() {
  const data = useLoaderData<typeof loader>(); // Use the loader data in the component

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Container for the content, centered and with padding */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Title of the page */}
        <h1 className="text-3xl font-bold mb-4">Products</h1>
        {/* List of products */}
        <ul className="space-y-4">
          {data.map(product => (
            <li key={product.id} className="border-b pb-4">
              {/* Product name */}
              <div className="text-xl font-semibold">{product.name}</div>
              {/* Product price */}
              <div className="text-gray-600">${product.price}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 p-6">
          <Outlet />
      </div>
    </div>
  );
}