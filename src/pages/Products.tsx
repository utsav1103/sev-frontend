import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAllProducts } from "@/services/productService";
import { handleError } from "@/services/errorService";
import { addToCart } from "@/services/cartService";
import { useState } from "react";

export default function Products() {
  // const { addItem } = useCart();
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
  });
  // Initialize selectedWeight lazily from first product’s first weight
  const [selectedWeight, setSelectedWeight] = useState(() => products[0]?.weight?.[0] ?? null);

  const [quantity, setQuantity] = useState(1);
  

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addToCart,
    onSuccess: (cart) => {
      queryClient.setQueryData(["cart"], cart)
    },
    onError: (err) => handleError(err, "failed to add to cart")
  })

  // if (isLoading) return <p className="p-6">Loading products...</p>;
  // if (isError) return <p className="p-6 text-red-600">Failed to load products</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-orange-700">Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products!.map((product) => (
          <div key={product.id} className="border rounded p-4 shadow">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="font-bold mt-2">₹{product.price}</p>

            {product.weight.map((item) => (
              <div 
              className="flex gap-1 border-s-2 border-black content-normal "
              onClick={() => {
                setSelectedWeight(item)
              }}
              >
                <p>{item.value}</p>

                <p>{item.unit}</p>
              </div>
            ))}

            <div className="flex gap-1">
              <p onClick={() => setQuantity((prev) => prev + 1)} className="text-2xl">+</p>
              {quantity}
              <p onClick={() => setQuantity((prev) => prev - 1)} className="text-2xl">-</p>
            </div>

            <button
              onClick={() =>
                // addItem({
                //   id: product.id,
                //   name: product.name,
                //   price: product.price,
                // })
                mutate({
                  productId: product.id,
                  quantity,
                  selectedWeight
                })
              }
              className="mt-4 bg-orange-600 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div >
  );
}
