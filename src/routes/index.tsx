import {createFileRoute} from '@tanstack/react-router'
import Home from "../pages/Home.tsx";
import { fetchAllProducts } from '@/services/productService.ts';

export const Route = createFileRoute('/')({
    loader: async ({ context }) => {
        await context.queryClient.ensureQueryData({
            queryKey: ['products'],
            queryFn: fetchAllProducts,
        })
    },
    component: RouteComponent,
})

function RouteComponent() {
    return <Home/>
}
