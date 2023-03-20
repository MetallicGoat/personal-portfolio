import {MouseEventHandler, ReactNode} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';

interface NavLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
    onClick?: MouseEventHandler;
}

const NavLink = ({href, children, className, onClick}: NavLinkProps) => {
    const router = useRouter();

    const active = router.pathname === href;

    const activeClass = active
        ? 'bg-gray-100 text-gray-900'
        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900';

    return (
        <Link href={href} onClick={onClick}>
            <span className={`${className} ${activeClass} block px-4 py-2 text-sm cursor-pointer`} role="menuitem">
                {children}
             </span>
        </Link>
    );
};


export default NavLink;