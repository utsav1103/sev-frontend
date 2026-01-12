import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types/api";
import type { LoginInput, SignupInput } from "@/types/schemas/authSchema";
import type { UserDTO } from "@/types/schemas/userSchema";


export const login = async (values: LoginInput): Promise<UserDTO> => {
    const res = await api.post<ApiResponse<UserDTO>>('/auth/login', values)

    // you still HAVE access to success/message here if needed
    if (!res.data.success) {
        throw new Error(res.data.message)
    }

    return res.data.data
}

export const signup = async (values: SignupInput): Promise<UserDTO> => {
    const res = await api.post<ApiResponse<UserDTO>>('/auth/signup', values)

    if (!res.data.success) {
        throw new Error(res.data.message)
    }

    return res.data.data
}
