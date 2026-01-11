
import { z } from 'zod';
import type { ProductResType } from './productSchema';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const cartReqSchema = z.object({
    productId: z
        .string()
        .regex(objectIdRegex),

    quantity: z
        .number()
        .int('Quantity must be an integer')
        .min(1, 'Quantity must be at least 1')
        .default(1),

    selectedWeight: z.object({
        value: z
            .number()
            .positive('Weight value must be greater than 0'),
        unit: z.enum(['gm', 'kg'])
    })
});

export type CartItem = {
    product: string | ProductResType   // id or populated product
    selectedWeight: {
        value: number
        unit: 'gm' | 'kg'
    }
    quantity: number
    price: number
}


export type CartType = {
    _id: string
    user: string
    items: CartItem[]
    totalPrice: number
    totalItems: number
    createdAt?: string
    updatedAt?: string
}

export type cartReqType = z.infer<typeof cartReqSchema>