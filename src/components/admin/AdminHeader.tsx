'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { authService } from '@/services';
import { Search, Bell, ChevronDown } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
}

export default function AdminHeader({ title }: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authService.logout();
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8 flex-1">
            <Link href="/admin" className="flex items-center gap-2 lg:hidden">
              <Image src="/images/logos/logo.png" alt="QuickHire Logo" width={32} height={32} />
              <span style={{ fontFamily: '"Red Hat Display", sans-serif', fontWeight: 700, fontSize: '24px', lineHeight: '150%', letterSpacing: '-0.01em', color: '#25324B' }}>QuickHire</span>
            </Link>

            <div className="hidden lg:flex items-center gap-3">
              <h1 className="text-xl font-bold text-gray-800">{title}</h1>
            </div>

            <div className="hidden md:flex flex-1 max-w-md ml-8 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search anything..."
                className="w-full bg-gray-50 border border-gray-200 text-sm rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button className="relative p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="h-8 w-px bg-gray-200 mx-1"></div>

            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-9 h-9 rounded-full bg-linear-to-br from-blue-100 to-indigo-100 border border-blue-200 flex items-center justify-center overflow-hidden">
                <span className="text-sm font-bold text-blue-700">A</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">Admin User</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
