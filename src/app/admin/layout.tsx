import { AdminSidebar } from '@/components/admin';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <AdminSidebar />
            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                {children}
            </div>
        </div>
    );
}
