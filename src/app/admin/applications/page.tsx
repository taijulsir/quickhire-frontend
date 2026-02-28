'use client';

import { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin';
import { applicationService } from '@/services';
import { Application } from '@/types';

export default function ApplicationsPage() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await applicationService.getAll();
                if (response.success && response.data) {
                    const data: any = response.data;
                    setApplications(Array.isArray(data) ? data : data.applications || []);
                }
            } catch (error) {
                console.error('Failed to fetch applications:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    return (
        <div className="flex-1 overflow-y-auto">
            <AdminHeader title="All Applicants" />
            <main className="p-8 max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Applicants</h1>
                    <p className="text-gray-600">Review all candidate applications in one place.</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    {loading ? (
                        <div className="p-8 flex justify-center text-gray-500">Loading applications...</div>
                    ) : applications.length === 0 ? (
                        <div className="p-12 text-center text-gray-500 flex flex-col items-center">
                            <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <p className="text-lg font-medium text-gray-900">No applicants yet</p>
                            <p>When candidates apply, their resumes will appear here.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-medium">
                                    <tr>
                                        <th className="px-6 py-4">Candidate Name</th>
                                        <th className="px-6 py-4">Email Address</th>
                                        <th className="px-6 py-4">Applied Job</th>
                                        <th className="px-6 py-4">Resume</th>
                                        <th className="px-6 py-4 text-right">Applied Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {applications.map((app) => (
                                        <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900">{app.name}</div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500">{app.email}</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium text-xs">
                                                    {(app.job_id as any)?.title || 'Unknown Job'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <a
                                                    href={app.resume_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 font-medium hover:underline flex items-center gap-1"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                    View Resume
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 text-right text-gray-500">
                                                {new Date(app.created_at).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
