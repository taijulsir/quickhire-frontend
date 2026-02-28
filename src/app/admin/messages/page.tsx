import { AdminHeader, ComingSoon } from '@/components/admin';

export default function MessagesPage() {
    return (
        <div className="flex-1 overflow-y-auto bg-gray-50 flex flex-col h-screen">
            <AdminHeader title="Messages" />
            <ComingSoon title="Messages Feature Coming Soon" />
        </div>
    );
}
