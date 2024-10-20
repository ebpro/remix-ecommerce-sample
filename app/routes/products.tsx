import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, Form, Link, useLoaderData } from "@remix-run/react";

import { getProductListItems } from "~/models/product.server";

import type { Product } from "@prisma/client";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const productListItems = await getProductListItems();
  return json({ productListItems: productListItems.map(product => ({ ...product, createdAt: new Date() })) });
};

function ProductCard({ product }: Readonly<{ product: Product }>) {
  return (
    <article className="overflow-hidden rounded-lg bg-white shadow-md">
      <div className="p-6">
        <h2 className="mb-2 text-xl font-semibold text-gray-900">
          {product.name}
        </h2>
        <p className="mb-4 text-gray-700">${product.price.toFixed(2)}</p>
        <Link
          to={`/products/${product.id}`}
          className="inline-block rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          View
        </Link>

      </div>
    </article>
  );
}

export default function Products() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">Products</Link>
        </h1>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </header>

      <main className="flex flex-col lg:flex-row h-full bg-white">
        <aside className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r bg-gray-50 p-4">
          <Link to="new" className="block text-xl text-blue-500">
            New
          </Link>
        </aside>

        <section className="flex-1 p-6">
          {data.productListItems.length === 0 ? (
            <p className="p-4">No products yet</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.productListItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        <section className="flex-1 p-6">
          <Outlet />
        </section>
      </main>
    </div>
  );
}