import { AdminHeader, ComingSoon } from '@/components/admin';

export default function CompanyProfilePage() {
    return (
        <div className="flex-1 overflow-y-auto bg-gray-50 flex flex-col h-screen">
            <AdminHeader title="Company Profile" />
            <ComingSoon title="Company Profile Coming Soon" />
        </div>
    );
}
