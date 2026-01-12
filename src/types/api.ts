// types/api.ts
export type ApiResponse<T> = {
    success: boolean
    message: string
    data: T
    timestamp: string
}
