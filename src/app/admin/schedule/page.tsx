import { AdminHeader, ComingSoon } from '@/components/admin';

export default function SchedulePage() {
    return (
        <div className="flex-1 overflow-y-auto bg-gray-50 flex flex-col h-screen">
            <AdminHeader title="My Schedule" />
            <ComingSoon title="My Schedule Coming Soon" />
        </div>
    );
}
