'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <span className="text-xl font-bold text-gray-900">QuickHire</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/jobs" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                Find Jobs
              </Link>
              <Link href="/jobs" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                Browse Companies
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/admin/login" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
              Login
            </Link>
            <Link
              href="/admin/login"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <Link href="/jobs" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                Find Jobs
              </Link>
              <Link href="/jobs" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                Browse Companies
              </Link>
              <Link href="/admin/login" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                Login
              </Link>
              <Link
                href="/admin/login"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors w-fit"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
