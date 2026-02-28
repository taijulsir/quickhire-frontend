'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import { AdminHeader } from '@/components/admin';
import { Button } from '@/components/common';
import { adminService } from '@/services';
import { DashboardStats } from '@/services/adminService';

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await adminService.getDashboardStats();
                if (response.success && response.data) {
                    setStats(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="flex-1 overflow-y-auto">
            <AdminHeader title="Dashboard" />

            <main className="p-8 max-w-7xl mx-auto space-y-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Good morning, Admin</h1>
                    <p className="text-gray-500">Here is your dashboard statistic report from the last 7 days.</p>
                </div>

                {loading ? (
                    <div className="animate-pulse space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="h-32 bg-gray-200 rounded-xl" />
                            <div className="h-32 bg-gray-200 rounded-xl" />
                            <div className="h-32 bg-gray-200 rounded-xl" />
                        </div>
                        <div className="h-96 bg-gray-200 rounded-xl" />
                    </div>
                ) : stats ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* New candidates metric card */}
                            <div className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
                                <div>
                                    <h2 className="text-4xl font-bold mb-1">{stats.totalApplications}</h2>
                                    <p className="text-blue-100 font-medium leading-tight">Total<br />Candidates</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Active Jobs metric card */}
                            <div className="bg-linear-to-r from-emerald-400 to-teal-500 rounded-2xl p-6 text-white shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
                                <div>
                                    <h2 className="text-4xl font-bold mb-1">{stats.activeJobsCount}</h2>
                                    <p className="text-emerald-50 font-medium leading-tight">Active<br />Jobs</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Views/Messages metric card */}
                            <div className="bg-linear-to-r from-sky-400 to-blue-500 rounded-2xl p-6 text-white shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
                                <div>
                                    <h2 className="text-4xl font-bold mb-1">
                                        {stats.chartData.reduce((acc, curr) => acc + curr.views, 0)}
                                    </h2>
                                    <p className="text-sky-50 font-medium leading-tight">Total<br />Views</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Chart Section */}
                            <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Job statistics</h3>
                                        <p className="text-sm text-gray-500">Showing job statistic for the last 7 days</p>
                                    </div>
                                </div>

                                <div className="h-80 w-full mb-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={stats.chartData}
                                            margin={{ top: 20, right: 30, left: -20, bottom: 5 }}
                                            barSize={20}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                            <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                            <Tooltip
                                                cursor={{ fill: 'transparent' }}
                                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            />
                                            <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                                            <Bar dataKey="views" name="Job View" fill="#fbbf24" radius={[4, 4, 0, 0]} stackId="a" />
                                            <Bar dataKey="applications" name="Job Applied" fill="#818cf8" radius={[4, 4, 0, 0]} stackId="a" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Right Column Stats */}
                            <div className="space-y-8">
                                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                                    <h3 className="text-lg font-bold text-gray-900 mb-6">Job Open</h3>
                                    <div className="flex items-end gap-2">
                                        <span className="text-5xl font-extrabold text-gray-900">{stats.activeJobsCount}</span>
                                        <span className="text-gray-500 font-medium mb-1">Jobs Opened</span>
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                                    <h3 className="text-lg font-bold text-gray-900 mb-6">Applicants Summary</h3>
                                    <div className="flex items-end gap-2 mb-6">
                                        <span className="text-5xl font-extrabold text-gray-900">{stats.totalApplications}</span>
                                        <span className="text-gray-500 font-medium mb-1">Applicants</span>
                                    </div>

                                    <div className="h-4 flex rounded-full overflow-hidden mb-6">
                                        <div className="bg-indigo-500 w-2/5" />
                                        <div className="bg-teal-400 w-1/4" />
                                        <div className="bg-sky-400 w-1/5" />
                                        <div className="bg-amber-400 justify-self-stretch w-full" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-y-3 text-sm">
                                        {Object.entries(stats.jobTypesSummary).map(([type, count], index) => {
                                            const colors = ['bg-indigo-500', 'bg-teal-400', 'bg-sky-400', 'bg-amber-400'];
                                            return (
                                                <div key={type} className="flex items-center gap-2">
                                                    <div className={`w-3 h-3 rounded ${colors[index % colors.length]}`} />
                                                    <span className="text-gray-600">{type}</span>
                                                    <span className="font-semibold text-gray-900 ml-auto">{count as number}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : null}
            </main>
        </div>
    );
}
