import Image from 'next/image'
import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaDribbble, FaLinkedinIn, FaTwitter } from 'react-icons/fa'

interface FooterLink {
  label: string
  href: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

const footerColumns: FooterColumn[] = [
  {
    title: 'About',
    links: [
      { label: 'Companies', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Advice', href: '#' },
      { label: 'Privacy Policy', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Help Docs', href: '#' },
      { label: 'Guide', href: '#' },
      { label: 'Updates', href: '#' },
      { label: 'Contact Us', href: '#' },
    ],
  },
]

const socialLinks = [
  { icon: FaFacebookF, href: '#', label: 'Facebook' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaDribbble, href: '#', label: 'Dribbble' },
  { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
]

export default function Footer() {
  return (
    <footer className="bg-[#202430]">
      {/* MOBILE LAYOUT */}
      <div className="md:hidden px-5 pt-12 pb-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-6">
          <Image
            src="/images/nav/logo.svg"
            alt="QuickHire Logo"
            width={24}
            height={24}
            className="h-8 w-8"
          />
          <span className="text-2xl font-bold text-white font-red-hat-display">
            QuickHire
          </span>
        </Link>

        {/* Description */}
        <p className="text-[#A8ADB7] text-sm leading-relaxed mb-8">
          Great platform for the job seeker that passionate about startups. Find your dream job easier.
        </p>

        {/* Link Columns - 2 side by side */}
        <div className="grid grid-cols-2 gap-8 mb-10">
          {footerColumns.map((column: FooterColumn) => (
            <div key={column.title}>
              <h4 className="text-white font-semibold text-lg mb-5">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link: FooterLink) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#A8ADB7] text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mb-10">
          <h4 className="text-white font-semibold text-lg mb-4">
            Get job notifications
          </h4>
          <p className="text-[#A8ADB7] text-sm leading-relaxed mb-4">
            The latest job news, articles, sent to your inbox weekly.
          </p>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full bg-white border border-[#A8ADB7]/30 text-black text-sm px-4 py-3 outline-none placeholder:text-[#A8ADB7]/60 focus:border-[#4640DE] transition-colors mb-3"
          />
          <button className="bg-[#4640DE] text-white text-sm font-semibold px-6 py-3 hover:bg-[#3730A3] transition-colors cursor-pointer">
            Subscribe
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-[#A8ADB7]/20 pt-6">
          <p className="text-[#A8ADB7] text-sm text-center mb-6">
            {new Date().getFullYear()} @ QuickHire. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-[#313541] flex items-center justify-center text-[#A8ADB7] hover:bg-[#4640DE] hover:text-white transition-all duration-300"
                >
                  <Icon className="text-sm" />
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden md:block mx-20 2xl:mx-30 3xl:mx-40 pt-16 pb-10">
        {/* Top Section */}
        <div className="grid grid-cols-[2.5fr_1fr_1fr_1.5fr] gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image
                src="/images/nav/logo.svg"
                alt="QuickHire Logo"
                width={24}
                height={24}
                className="h-8 w-8"
              />
              <span className="text-2xl font-bold text-white font-red-hat-display">
                QuickHire
              </span>
            </Link>
            <p className="text-[#A8ADB7] text-sm leading-relaxed w-[90%]">
              Great platform for the job seeker that passionate about startups. Find your dream job easier.
            </p>
          </div>

          {/* Link Columns */}
          {footerColumns.map((column: FooterColumn) => (
            <div key={column.title}>
              <h4 className="text-white font-semibold text-lg mb-5">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link: FooterLink) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#A8ADB7] text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Column */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-5">
              Get job notifications
            </h4>
            <p className="text-[#A8ADB7] text-sm leading-relaxed mb-5">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 bg-white border border-[#A8ADB7]/30 text-black text-sm px-4 py-3 outline-none placeholder:text-[#A8ADB7]/60 focus:border-[#4640DE] transition-colors"
              />
              <button className="bg-[#4640DE] text-white text-sm font-semibold px-5 py-3 hover:bg-[#3730A3] transition-colors cursor-pointer">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#A8ADB7]/20 pt-6">
          {/* Bottom Section */}
          <div className="flex items-center justify-between">
            <p className="text-[#A8ADB7] text-sm">
              {new Date().getFullYear()} @ QuickHire. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full bg-[#313541] flex items-center justify-center text-[#A8ADB7] hover:bg-[#4640DE] hover:text-white transition-all duration-300"
                  >
                    <Icon className="text-sm" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
