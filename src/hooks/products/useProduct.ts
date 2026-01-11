import { fetchAllProducts } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";


export function useProducts() {
    return useQuery({
        queryKey: ['products'],
        queryFn: fetchAllProducts,
    });
}
