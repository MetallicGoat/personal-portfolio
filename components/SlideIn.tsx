import React, {useEffect, useRef, useState} from "react";

interface RevealOnScrollProps {
    children: React.ReactNode;
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ children }) => {
    const ref = useRef<HTMLDivElement>(null);
    let bool = false;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting)
                    entry.target.classList.add("slide-in-bottom");

            },
            { threshold: 0.06 }
        );

        observer.observe(ref.current!);

        return () => {
            //observer.unobserve(ref.current!);
        };
    }, []);

    return (
        <div ref={ref} className="hidden-revealable">
            {children}
        </div>
    );
};

export default RevealOnScroll;