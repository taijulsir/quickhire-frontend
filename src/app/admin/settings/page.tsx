import { AdminHeader, ComingSoon } from '@/components/admin';

export default function SettingsPage() {
    return (
        <div className="flex-1 overflow-y-auto bg-gray-50 flex flex-col h-screen">
            <AdminHeader title="Settings" />
            <ComingSoon title="Settings Coming Soon" />
        </div>
    );
}
