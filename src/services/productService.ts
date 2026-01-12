import { api } from "@/lib/axios"
import type { ApiResponse } from "@/types/api";
import type { ProductResType } from "@/types/schemas/productSchema";

export const fetchAllProducts = async (): Promise<ProductResType[]> => {
  const res = await api.get<ApiResponse<ProductResType[]>>('/products')

  return res.data.data;
}
