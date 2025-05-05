import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from './__components/DashboardSidebar';

type Props = { children: React.ReactNode };

const Layout = ({ children }: Props) => {
    return (
        <SidebarProvider>
            <DashboardSidebar  />
            <SidebarTrigger className='cursor-pointer text-zinc-50 text-9xl' size="lg" />
            <main className='w-full'>
                {children}
            </main>
        </SidebarProvider>);
};

export default Layout;