'use client'

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { FiMenu, FiX } from 'react-icons/fi';
import { usePathname } from "next/navigation";

type PageNames = { href: string; label: string }[];

function toggleRGBMode() {
  const body = document.body;
  body.classList.toggle('rgb-mode');
}

const pages: PageNames = [
  { href: '/', label: 'Home' },
  // { href: '/mathproject', label: 'Math Project' },
  { href: '/blogs', label: 'Blogs' },
];

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const darkToggleClicks = useRef<number>(0);

  const [darkMode, setDarkMode] = useState(true);
  const pathname = usePathname();


  // First Start
  useEffect(() => {
    const value = localStorage.getItem('darkMode');
    const curMode = value == null || value === 'true';

    setDarkMode(curMode);
  }, []);

  // On Change
  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('darkMode', "true");
    } else {
      root.classList.remove('dark');
      localStorage.setItem('darkMode', "false");
    }
  }, [darkMode]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleDocumentClick);
      return () => document.removeEventListener('mousedown', handleDocumentClick);
    }
  }, [dropdownOpen]);

  // Desktop nav links (enhanced style)
  const desktopNavLinks = pages.map((page) => {
    const isActive =
      pathname === page.href ||
      (page.href === '/blogs' && pathname.startsWith('/blogs'));
    return (
      <Link href={page.href} key={page.href}>
        <span
          className={`
            px-5 py-3 rounded-2xl text-lg font-semibold transition-all duration-300 border
            ${
            isActive
              ? 'bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-lg dark:shadow-neutral-900 border-neutral-200 dark:border-neutral-800'
              : 'text-neutral-700 dark:text-neutral-200 border-transparent'
          }
            ${!isActive && 'hover:bg-neutral-100 hover:shadow-xl hover:dark:bg-neutral-900 hover:dark:shadow-neutral-900 hover:border-neutral-200 hover:dark:border-neutral-800'}
          `}
        >
          {page.label}
        </span>
      </Link>
    );
  });

  // Mobile dropdown nav links (original, but slightly bigger)
  const dropdownNavLinks = pages.map((page) => {
    const isActive =
      pathname === page.href ||
      (page.href === '/blogs' && pathname.startsWith('/blogs'));
    return (
      <Link href={page.href} key={page.href}>
        <span
          className={`
            block px-5 py-3 rounded-xl text-lg font-medium transition
            ${isActive
            ? 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400'
            : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'}
          `}
          onClick={() => setDropdownOpen(false)}
          role="menuitem"
        >
          {page.label}
        </span>
      </Link>
    );
  });

  return (
    <nav className="z-50 flex items-center justify-between py-4 px-2 sm:px-6 top-0">
      <div className="z-50 flex items-center">
        {/* Hamburger for small screens */}
        <div className="sm:hidden" ref={dropdownRef}>
          <button
            className="p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400"
            aria-label={dropdownOpen ? "Close menu" : "Open menu"}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {dropdownOpen ? <FiX className="w-7 h-7 dark:text-white" /> : <FiMenu className="w-7 h-7 dark:text-white" />}
          </button>
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.12 } }}
                transition={{ duration: 0.12 }}
                className="absolute left-2 top-16 w-56 min-w-[12rem] rounded-2xl bg-white dark:bg-neutral-800 shadow-lg border border-neutral-100 dark:border-neutral-700 py-2 flex flex-col"
              >
                {dropdownNavLinks}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Inline links for desktop */}
        <div className="hidden sm:flex gap-3 md:gap-8">
          {desktopNavLinks}
        </div>
      </div>
      <ul className="z-50 flex items-center gap-3 sm:gap-5">
        <li>
          <BsFillMoonStarsFill
            onClick={() => {
              setDarkMode(!darkMode);
              darkToggleClicks.current++;
              if (darkToggleClicks.current === 20) toggleRGBMode();
            }}
            className="cursor-pointer text-2xl sm:text-3xl md:text-4xl dark:text-white transition"
            aria-label="Toggle dark mode"
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter') setDarkMode(!darkMode); }}
          />
        </li>
        <li>
          <button
            className="bg-gradient-to-r from-green-400 to-teal-400 text-white px-6 sm:px-8 py-2.5 rounded-xl ml-2 text-lg sm:text-xl font-bold shadow-md transition"
            onClick={openResume}
          >
            Resume
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

function openResume() {
  window.open("/pdfs/ResumeV4.pdf", '_blank');
}
