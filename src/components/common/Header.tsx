'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className='relative z-50 flex justify-between items-center mx-5 md:mx-20 2xl:mx-30 3xl:mx-40 py-4'>
      {/* Logo and Navigation */}
      <div className='flex items-center gap-12'>
        {/* Logo */}
        <Link href="/" className='flex items-center gap-2'>
          <Image
            src="/images/nav/logo.svg"
            alt="QuickHire Logo"
            width={24}
            height={24}
            className='h-8 w-8'
          />
          <span className='text-2xl font-bold text-[#25324B] font-[family-name:var(--font-clash-display)]'>QuickHire</span>
        </Link>

        {/* Navigation Links - hidden on mobile */}
        <div className='hidden md:flex items-center gap-8 mt-2'>
          <Link href="/jobs" className='text-base font-medium text-[#515B6F] hover:text-[#4640DE] transition-colors'>
            Find Jobs
          </Link>
          <Link href="/jobs" className='text-base font-medium text-[#515B6F] hover:text-[#4640DE] transition-colors'>
            Browse Companies
          </Link>
        </div>
      </div>

      {/* Auth Buttons - hidden on mobile */}
      <div className='hidden md:flex items-center gap-3'>
        <Link href="/admin/login">
          <button className='px-6 py-2.5 text-base font-semibold text-[#4640DE] hover:text-[#3730A3] transition-colors cursor-pointer'>
            Login
          </button>
        </Link>

        <div className='h-10 w-px bg-[#D6DDEB]'></div>

        <Link href="/admin/login">
          <button className='px-6 py-2.5 bg-[#4640DE] text-base font-bold text-white hover:bg-[#3730A3] transition-colors cursor-pointer'>
            Sign Up
          </button>
        </Link>
      </div>

      {/* Hamburger Menu - visible on mobile only */}
      <button
        className='md:hidden text-[#25324B] text-2xl p-1'
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label='Toggle menu'
      >
        {mobileMenuOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
      </button>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className='md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-[#D6DDEB] z-50 py-4 px-5'>
          <div className='flex flex-col gap-4'>
            <Link
              href="/jobs"
              className='text-base font-medium text-[#515B6F] hover:text-[#4640DE] transition-colors'
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Jobs
            </Link>
            <Link
              href="/jobs"
              className='text-base font-medium text-[#515B6F] hover:text-[#4640DE] transition-colors'
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse Companies
            </Link>
            <hr className='border-[#D6DDEB]' />
            <Link
              href="/admin/login"
              className='text-base font-semibold text-[#4640DE]'
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/admin/login"
              className='bg-[#4640DE] text-white text-center text-base font-bold py-2.5 hover:bg-[#3730A3] transition-colors'
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
