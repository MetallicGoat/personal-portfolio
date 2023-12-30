import React, {useRef, useEffect} from 'react';
import {motion} from 'framer-motion';
import Image from 'next/image';

interface InteractiveImageProps extends React.HTMLAttributes<HTMLDivElement> {
    src: string;
    alt: string;
}

const createParticle = (x: number, y: number, width: number, height: number, easterEggValue: number) => {
    const particle = document.createElement('span');
    particle.className = 'particle';
    document.body.appendChild(particle);

    const size = Math.random() * (easterEggValue > 50 ? 30 : 6) + 8;
    const color = `hsl(${Math.random() * 90 + 90 + easterEggValue*4}, 70%, 50%)`;
    const rotation = Math.random() * 520;

    // Set only dynamic styles here
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.boxShadow = `0 0 ${Math.floor(Math.random() * 10 + 10)}px ${color}`;
    particle.style.background = color;

    // Determine start position and direction
    const distance = 300;
    const side = Math.floor(Math.random() * 4);
    let startX, startY, destinationX, destinationY;

    if (side === 0) { // Top
        startX = x + Math.random() * width;
        startY = y;
        destinationX = (Math.random() - 0.5) * distance;
        destinationY = -(Math.random() * (distance/3)); // Move upward
    } else if (side === 1) { // Right
        startX = x + width;
        startY = y + Math.random() * height;
        destinationX = Math.random() * (distance/3); // Move rightward
        destinationY = (Math.random() - 0.5) * distance;
    } else if (side === 2) { // Bottom
        startX = x + Math.random() * width;
        startY = y + height;
        destinationX = (Math.random() - 0.5) * distance;
        destinationY = Math.random() * (distance/3); // Move downward
    } else { // Left
        startX = x;
        startY = y + Math.random() * height;
        destinationX = -(Math.random() * (distance/3)); // Move leftward
        destinationY = (Math.random() - 0.5) * distance;
    }

    const animation = particle.animate([
        {
            transform: `translate(${startX}px, ${startY}px) rotate(0deg)`,
            opacity: 1
        },
        {
            transform: `translate(${startX + destinationX}px, ${startY + destinationY}px) rotate(${rotation}deg)`,
            opacity: 0
        }
    ], {
        duration: Math.random() * 500 + 1500,
        easing: 'cubic-bezier(0, .9, .57, 1)',
        delay: Math.random() * 200
    });

    animation.onfinish = () => particle.remove();
};

export const InteractiveImage: React.FC<InteractiveImageProps> = ({src, alt, className}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const easterEggValue = useRef<number>(0);

    useEffect(() => {
        const handlePop = (e: MouseEvent) => {
            const rect = ref.current?.getBoundingClientRect();
            if (!rect) return;

            easterEggValue.current++;

            const currEggValue = easterEggValue.current > 10 ? easterEggValue.current - 10 : 0

            for (let i = 0; i < 30; i++)
                createParticle(rect.left, rect.top, rect.width, rect.height, currEggValue);
        };

        const currentRef = ref.current;
        currentRef?.addEventListener('click', handlePop);

        return () => {
            currentRef?.removeEventListener('click', handlePop);
        };
    }, []);

    return (
        <motion.div
            className="w-full"
            ref={ref}
            style={{
                perspective: 1000,
            }}
        >
            <motion.div
                className="w-full"
                whileTap={{scale: 0.95}}
                whileHover={{scale: 1.05}}
            >
                <Image className={className} src={src} alt={alt} width={500} height={500} sizes="100vw"/>
            </motion.div>
        </motion.div>
    );
};
