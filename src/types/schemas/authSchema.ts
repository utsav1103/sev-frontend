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


export const signupSchema = z.object({
    email: z
        .string()
        .email({ message: 'Please enter a valid email address' }),

    username: z
        .string()
        .min(3, { message: 'Username must be at least 3 characters long' })
        .max(40, { message: 'Username must not exceed 40 characters' }),

    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .regex(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
            {
                message:
                    'Password must contain at least 1 uppercase letter, 1 number, and 1 special character'
            }
        ),
    
    confirmPassword: z.string()
    ,phone: z
        .string()
        .regex(/^[6-9]\d{9}$/, { message: 'Please enter a valid Indian mobile 10 digit number' })
        .optional()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type SignupInput = z.infer<typeof signupSchema>

// Default values for UserDTO
export const defaultUser: SignupInput = {
    username: "", // no username yet
    email: "", // no email yet
    phone: undefined, // optional
    password: "",
    confirmPassword: "",
};
