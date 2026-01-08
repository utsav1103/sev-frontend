import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address' }),

    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
            message:
                'Password must contain at least 1 uppercase letter, 1 number, and 1 special character',
        }),
})

export type LoginInput = z.infer<typeof loginSchema>
