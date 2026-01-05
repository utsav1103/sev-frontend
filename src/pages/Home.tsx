import { useCart } from "../context/CartContext";

export default function Home() {
  const { cartCount, setCartCount } = useCart();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-orange-700">Welcome to Sev & Namkeen!</h2>
      <p className="mb-4 text-gray-700">
        This is your delicious snack shop. Click below to add tasty namkeen to your cart.
      </p>
      <button
        onClick={() => setCartCount(cartCount + 1)}
        className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-5 py-3 rounded shadow"
      >
        Add One Item to Cart
      </button>

      <p className="mt-6 text-lg">Items in Cart: <strong>{cartCount}</strong></p>
    </div>
  );
}
