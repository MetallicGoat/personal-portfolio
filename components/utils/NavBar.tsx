// components/NavBar.tsx
import React, {useEffect, useRef, useState} from 'react';
import {motion} from 'framer-motion';
import NavLink from './NavLink';
import {BsFillMoonStarsFill} from 'react-icons/bs';
import {FiChevronDown} from 'react-icons/fi';

interface NavBarProps {
    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;
    currentPath: string;
}

const NavBar: React.FC<NavBarProps> = ({darkMode, setDarkMode, currentPath}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const dropdownVariants = {
        open: {opacity: 1, scale: 1, display: 'block'},
        closed: {opacity: 0, scale: 0.95, transitionEnd: {display: 'none'}},
    };

    const handleDocumentClick = (event: MouseEvent) => {
        if (dropdownRef.current && !(dropdownRef.current as any).contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleDocumentClick);

        return () => {
            document.removeEventListener('mousedown', handleDocumentClick);
        };
    }, []);

    const handleNavLinkClick = () => {
        setDropdownOpen(false);
    };

    // TODO temporary
    const getCurrentPageName = () => {
        switch (currentPath) {
            case '/':
                return 'Home';
            case '/mathproject':
                return 'Math Project';
            default:
                return 'Home';
        }
    };


    return (
        <motion.nav
            className="py-6 flex justify-between"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: .3}}
        >
            <div className="relative inline-block text-left" ref={dropdownRef}>
                <button
                    className="flex h-full items-center justify-center space-x-1 text-md sm:text-xl lg:text-2xl dark:text-white focus:outline-none"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                    <span>{getCurrentPageName()}</span>
                    <FiChevronDown className="w-4 h-4"/>
                </button>

                <motion.div
                    className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    initial="closed"
                    animate={dropdownOpen ? 'open' : 'closed'}
                    variants={dropdownVariants}
                    transition={{duration: 0.2}}
                >
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {currentPath !== '/' && (
                            <NavLink href="/" className="cursor-pointer" onClick={handleNavLinkClick}>
                                Home
                            </NavLink>
                        )}
                        {currentPath !== '/mathproject' && (
                            <NavLink href="/mathproject" className="cursor-pointer" onClick={handleNavLinkClick}>
                                Math Project
                            </NavLink>
                        )}
                    </div>
                </motion.div>
            </div>
            <ul className="flex items-center">
                <li>
                    <BsFillMoonStarsFill
                        onClick={() => setDarkMode(!darkMode)}
                        className="cursor-pointer text-xl sm:text-2xl lg:text-3xl dark:text-white"
                    />
                </li>

                <li>
                    <button
                        className="bg-gradient-to-r from-green-400 to-teal-400 text-white px-2 sm:px-4 py-2 rounded-md ml-4 sm:ml-8 lg:text-xl"
                        onClick={openResume}
                    >
                        Resume
                    </button>
                </li>
            </ul>
        </motion.nav>
    );
};

export default NavBar;

function openResume() {
    window.open("/pdfs/resume.pdf", '_blank');
}