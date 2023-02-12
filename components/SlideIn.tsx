import React, { useEffect, useRef } from "react";

interface RevealOnScrollProps {
    children: React.ReactNode;
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ children }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("slide-in-bottom");
                } else {
                    entry.target.classList.remove("slide-in-bottom");
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(ref.current!);

        return () => {
            observer.unobserve(ref.current!);
        };
    }, []);

    return (
        <div ref={ref} className="hidden sm:block">
            {children}
        </div>
    );
};

export default RevealOnScroll;