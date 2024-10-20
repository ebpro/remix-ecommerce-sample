// app/routes/dummyProducts.tsx

// Import the Link component from Remix to handle navigation
import { Link } from "@remix-run/react";

// Default export function for the dummy products page
export default function DummyProducts() {
  return (
    <div>
      {/* Page title */}
      <h1>Dummy Products</h1>
      {/* List of dummy products */}
      <ul>
        <li>Product 1 - $10.00</li>
        <li>Product 2 - $20.00</li>
        <li>Product 3 - $30.00</li>
      </ul>
      {/* 
        Link component is used for client-side navigation.
        It prevents the browser from making a full page reload,
        providing a smoother and faster user experience.
      */}
      <Link to="/">Back to Home</Link>
    </div>
  );
}