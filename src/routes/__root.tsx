import {
    createRootRouteWithContext,
    Outlet,
} from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { MantineProvider } from '@mantine/core'

interface RouterContext {
    queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
    component: RootComponent,
})

function RootComponent() {
    return (
        <>
            <MantineProvider defaultColorScheme="dark">
                <div className="flex min-h-screen flex-col bg-[#f5f5ed] text-foreground">
                    <main className='container mx-auto grow p-4'>
                        <Outlet />
                    </main>
                    <footer className='p-4 text-center'>
                        <p className={'text-sm text-muted-foreground'}>
                            Ratlami Riwaz &copy;
                        </p>
                    </footer>
                </div>
                <hr />
                {/* <Toaster/> */}
                <ReactQueryDevtools />
                <TanStackRouterDevtools position="bottom-left" />
            </MantineProvider>
        </>
    )
}