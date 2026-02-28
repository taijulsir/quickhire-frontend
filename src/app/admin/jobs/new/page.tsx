'use client';

import { useRouter } from 'next/navigation';
import { AdminHeader, JobForm } from '@/components/admin';

export default function NewJobPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader title="Create New Job" />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Create New Job</h1>
          <p className="text-gray-600">Fill in the details to post a new job</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <JobForm onSuccess={handleSuccess} />
        </div>
      </main>
    </div>
  );
}
