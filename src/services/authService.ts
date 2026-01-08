import { api } from "@/lib/axios";
import type { LoginInput, SignupInput } from "@/types/schemas/authSchema";
import type { UserDTO } from "@/types/schemas/userSchema";

export const login = async (values: LoginInput) => {
    const res = await api.post('/auth/login', values)
    return res.data as UserDTO;
}

export const signup = async (values : SignupInput) => {
    const res = await api.post("/auth/signup",values);

    return res.data as UserDTO;
}