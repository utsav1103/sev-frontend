import z from 'zod'
// User schema based on userDTO
export const userSchema = z.object({
    id: z.string(), // MongoDB _id as string
    username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters long" })
        .max(40, { message: "Username must not exceed 40 characters" }),
    email: z
        .string()
        .email({ message: "Please enter a valid email address" }),
    isEmailVerified: z.boolean(),
    phone: z
        .string()
        .regex(/^[6-9]\d{9}$/, {
            message: "Please enter a valid Indian mobile 10 digit number",
        })
        .optional(),
    isPhoneVerified: z.boolean(),
    avatar: z.string().url().optional(),
    addresses: z.array(z.string()).optional(), // or a more detailed address schema
    wishlist: z.array(z.string()).optional(),
});

// Type inference
export type UserDTO = z.infer<typeof userSchema>;
