import { z } from "zod";

const imagesSchema = z
    .array(
        z.object({
            originalname: z.string(),
            mimetype: z.string().regex(/^image\/(jpeg|png|jpg)$/),
            buffer: z.string().regex(/^image\/(jpeg|png|jpg)$/), // memoryStorage gives you Buffer
        })
    )
    .min(1, "At least 1 image file is required")
    .max(5, "You can upload up to 5 image files");

export const productBaseSchema = z.object({
    name: z.string().min(3).max(100),
    description: z.string().min(50).max(500),

    weight: z.array(
        z.object({
            value: z.number().positive(),
            unit: z.enum(['g', 'kg']),
        })
    ).min(1),

    price: z.number().min(10),
    discountedPrice: z.number().min(0).optional(),

    category: z.enum([
        'Namkeen', 'Sweets', 'Chips', 'Biscuits',
        'Spices', 'Pickles', 'Ready-to-eat', 'Health',
    ]),

    ingredients: z.string().min(5),

    images: imagesSchema,

    stock: z.number().int().nonnegative().default(0),
    isVegetarian: z.boolean().default(true),

    tags: z.array(z.string()).optional(),

    rating: z.object({
        average: z.number().min(0).max(5).default(0),
        count: z.number().int().nonnegative().default(0),
    }).optional(),
})

export const productSchema = productBaseSchema.transform((data) => ({
    ...data,
    name: data.name.trim().replace(/\s+/g, ' '),
    description: data.description.trim().replace(/\s+/g, ' '),
    ingredients: data.ingredients.trim().replace(/\s+/g, ' '),
    tags: data.tags?.map(t => t.trim().replace(/\s+/g, ' ')),
}))

export const productResponseSchema = productBaseSchema.extend({
    _id: z.string(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
})


export type ProductReqType = z.infer<typeof productSchema>

export type ProductResType = z.infer<typeof productResponseSchema>