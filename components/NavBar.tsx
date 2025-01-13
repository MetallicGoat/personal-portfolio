import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { FiChevronDown } from 'react-icons/fi';

interface NavBarProps {
    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;
    currentPath: string;
}

// Define the shape of page names.
type PageNames = {
    [key: string]: string;
};

function toggleRGBMode() {
    const body = document.body;
    body.classList.toggle('rgb-mode');
}

const NavBar: React.FC<NavBarProps> = ({ darkMode, setDarkMode, currentPath }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const darkToggleClicks = useRef<number>(0);
    const router = useRouter();

    // Variants for the dropdown animation.
    const dropdownVariants = {
        open: { opacity: 1, scale: 1, display: 'block' },
        closed: { opacity: 0, scale: 0.95, transitionEnd: { display: 'none' } },
    };

    // Handle clicks outside the dropdown.
    useEffect(() => {
        const handleDocumentClick = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleDocumentClick);
        return () => document.removeEventListener('mousedown', handleDocumentClick);
    }, []);

    // Define page names and get the current page name.
    const pageNames: PageNames = { '/': 'Home', '/mathproject': 'Math Project' };
    const currentPageName = pageNames[currentPath] || 'Home';

    // Function to create navigation links.
    const createNavLink = (href: string, label: string) => (
        <Link href={href} key={href}>
            <span className={`block px-4 py-2 text-sm cursor-pointer ${router.pathname === href ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-700 hover:bg-neutral-100'} ${darkMode ? 'text-white bg-neutral-800 hover:bg-neutral-700 hover:text-white' : ''}`} role="menuitem" onClick={() => setDropdownOpen(false)}>
                {label}
            </span>
        </Link>
    );

    // Filter and map navigation links.
    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/mathproject', label: 'Math Project' }
    ].filter(link => link.href !== currentPath).map(link => createNavLink(link.href, link.label));

    return (
        <motion.nav className="z-50 pt-4 pb-1 flex justify-between" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .3 }}>
            <div className="z-50  relative inline-block text-left" ref={dropdownRef}>
                <button className="z-50 flex h-full items-center justify-center space-x-1 text-md sm:text-xl md:text-2xl dark:text-white focus:outline-none" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <span>{currentPageName}</span>
                    <FiChevronDown className="z-50 w-4 h-4" />
                </button>

                <motion.div className={`z-50 origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 ${darkMode ? 'bg-neutral-800 text-white shadow-neutral-900' : 'bg-white text-neutral-900'}`} initial="closed" animate={dropdownOpen ? 'open' : 'closed'} variants={dropdownVariants} transition={{ duration: 0.2 }}>
                    <div className="z-50 py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {navLinks}
                    </div>
                </motion.div>
            </div>

            <ul className="z-50 flex items-center">
                <li>
                    <BsFillMoonStarsFill onClick={() => {
                        setDarkMode(!darkMode)
                        darkToggleClicks.current++;

                        if (darkToggleClicks.current == 20)
                            toggleRGBMode();

                    }} className="cursor-pointer text-xl sm:text-2xl md:text-3xl dark:text-white" />
                </li>
                <li>
                    <button className="z-50 bg-gradient-to-r from-green-400 to-teal-400 text-white px-2 sm:px-4 py-1 rounded-md ml-4 sm:ml-8 md:text-lg lg:text-2xl" onClick={openResume}>
                        Resume
                    </button>
                </li>
            </ul>
        </motion.nav>
    );
};

export default NavBar;

function openResume() {
    window.open("/pdfs/ResumeV3.pdf", '_blank');
}
