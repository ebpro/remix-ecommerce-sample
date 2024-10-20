// app/routes/products.new.tsx

import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useEffect, useRef } from "react";

import { createProduct } from "~/models/product.server";
import { requireUserId } from "~/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const name = formData.get("name") as string | null;
  const price = formData.get("price") as string | null;
  const description = formData.get("description") as string | null;

  const errors = {
    name: typeof name !== "string" || name.length === 0 ? "Name is required" : null,
    price: typeof price !== "string" || isNaN(parseFloat(price)) ? "Price must be a valid number" : null,
    description: typeof description !== "string" || description.length === 0 ? "Description is required" : null,
  };

  if (errors.name || errors.price || errors.description) {
    return json({ errors }, { status: 400 });
  }

  const product = await createProduct({ 
    name: name as string, 
    price: parseFloat(price as string), 
    description: description as string, 
  });

  return redirect(`/products/${product.id}`);
};

function InputField({
  label,
  name,
  type = "text",
  error,
  inputRef,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string | null;
  inputRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement>;
}) {
  return (
    <div>
      <label className="flex w-full flex-col gap-1">
        <span>{label}: </span>
        {type === "textarea" ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            name={name}
            rows={8}
            className="w-full flex-1 rounded-md border-2 border-blue-500 px-3 py-2 text-lg leading-6"
            aria-invalid={error ? true : undefined}
            aria-errormessage={error ? `${name}-error` : undefined}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            name={name}
            type={type}
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            aria-invalid={error ? true : undefined}
            aria-errormessage={error ? `${name}-error` : undefined}
          />
        )}
      </label>
      {error ? (
        <div className="pt-1 text-red-700" id={`${name}-error`}>
          {error}
        </div>
      ) : null}
    </div>
  );
}

export default function NewProductPage() {
  const actionData = useActionData<typeof action>();
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (actionData?.errors?.name) {
      nameRef.current?.focus();
    } else if (actionData?.errors?.price) {
      priceRef.current?.focus();
    } else if (actionData?.errors?.description) {
      descriptionRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Form method="post" className="flex flex-col gap-8 w-full max-w-lg mx-auto p-4">
      <InputField
        label="Name"
        name="name"
        error={actionData?.errors?.name}
        inputRef={nameRef}
      />
      <InputField
        label="Price"
        name="price"
        type="number"
        error={actionData?.errors?.price}
        inputRef={priceRef}
      />
      <InputField
        label="Description"
        name="description"
        type="textarea"
        error={actionData?.errors?.description}
        inputRef={descriptionRef}
      />
      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Save
        </button>
      </div>
    </Form>
  );
}