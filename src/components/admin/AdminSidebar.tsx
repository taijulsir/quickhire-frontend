'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    BarChart,
    MessageSquare,
    Building2,
    Users,
    FileText,
    Calendar,
    Settings,
    HelpCircle,
    LogOut
} from 'lucide-react';
import { authService } from '@/services';
import Cookies from 'js-cookie';
import Image from 'next/image';

const MENU_ITEMS = [
    { name: 'Dashboard', icon: BarChart, href: '/admin' },
    { name: 'All Applicants', icon: Users, href: '/admin/applications' },
    { name: 'Job Listing', icon: FileText, href: '/admin/jobs' },
    { name: 'Messages', icon: MessageSquare, href: '/admin/messages', badge: 1 },
    { name: 'Company Profile', icon: Building2, href: '/admin/company' },
    { name: 'My Schedule', icon: Calendar, href: '/admin/schedule' },
];

const SETTINGS_ITEMS = [
    { name: 'Settings', icon: Settings, href: '/admin/settings' },
    { name: 'Help Center', icon: HelpCircle, href: '/admin/help' },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await authService.logout();
            Cookies.remove('token');
            router.push('/admin/login');
        } catch (error) {
            console.error('Logout failed:', error);
            // Fallback: clear cookie and redirect anyway
            Cookies.remove('token');
            router.push('/admin/login');
        }
    };

    if (pathname === '/admin/login') {
        return null;
    }

    return (
        <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 overflow-y-auto">
            <Link href="/" className="p-6 flex items-center gap-3 border-b border-transparent hover:opacity-80 transition-opacity">
                <Image src="/images/logos/logo.png" alt="QuickHire Logo" width={32} height={32} />
                <span style={{ fontFamily: '"Red Hat Display", sans-serif', fontWeight: 700, fontSize: '24px', lineHeight: '150%', letterSpacing: '-0.01em', color: '#25324B' }}>
                    QuickHire
                </span>
            </Link>

            <nav className="flex-1 px-4 space-y-1 mt-4">
                {MENU_ITEMS.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${isActive
                                ? 'bg-blue-50 text-blue-600 font-medium'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                                {item.name}
                            </div>
                            {item.badge && (
                                <span className="bg-blue-600 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="px-4 py-6 border-t border-gray-100">
                <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Settings
                </h3>
                <div className="space-y-1">
                    {SETTINGS_ITEMS.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        >
                            <item.icon className="w-5 h-5 text-gray-400" />
                            {item.name}
                        </Link>
                    ))}
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors text-left"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </div>
        </aside>
    );
}
