'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="mr-2"
          />
          <span className="text-white text-xl font-semibold">MyApp</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/labtest" className="text-gray-300 hover:text-white px-2 py-1 rounded">
            Test
          </Link>
          <Link href="/booking" className="text-gray-300 hover:text-white px-2 py-1 rounded">
            Booking
          </Link>
          <Link href="/donate" className="text-gray-300 hover:text-white px-2 py-1 rounded">
            Donate
          </Link>
          <Link href="/PrivacyPolicy" className="text-gray-300 hover:text-white px-2 py-1 rounded">
            PrivacyPolicy
          </Link>
          <Link href="/ambulance" className="block text-gray-300 hover:text-white px-2 py-1 rounded">
            Ambulance
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-300 hover:text-white focus:outline-none"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2">
          <Link href="/" className="block text-gray-300 hover:text-white px-2 py-1 rounded">
            Home
          </Link>
          <Link href="/about" className="block text-gray-300 hover:text-white px-2 py-1 rounded">
            About
          </Link>
          <Link href="/contact" className="block text-gray-300 hover:text-white px-2 py-1 rounded">
            Contact
          </Link>
          <Link href="/services" className="block text-gray-300 hover:text-white px-2 py-1 rounded">
            Services
          </Link>
          <Link href="/blog" className="block text-gray-300 hover:text-white px-2 py-1 rounded">
            Blog
          </Link>
        </div>
      )}
    </nav>
  );
}
