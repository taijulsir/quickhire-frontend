import { AdminHeader, ComingSoon } from '@/components/admin';

export default function HelpPage() {
    return (
        <div className="flex-1 overflow-y-auto bg-gray-50 flex flex-col h-screen">
            <AdminHeader title="Help Center" />
            <ComingSoon title="Help Center Coming Soon" />
        </div>
    );
}
