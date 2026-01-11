import { api } from "@/lib/axios"
import type { cartReqType, CartType } from "@/types/schemas/cartSchema"

export const addToCart = async (product : cartReqType): Promise<CartType>=> {
    const res = await api.post("/cart/add", product);

    if (!res.data.success) {
        throw new Error(res.data.message)
    }

    return res.data.data;
}