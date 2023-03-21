import React, {RefObject, useCallback, useEffect, useRef, useState} from "react";
import {motion, useMotionValue, useSpring, useTransform} from "framer-motion";
import Image from "next/image";

interface InteractiveImageProps extends React.HTMLAttributes<HTMLDivElement> {
    src: string;
    alt: string;
}

export const InteractiveImage: React.FC<InteractiveImageProps> = ({src, alt, className}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const {imageW, imageH} = useDimensions(ref);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateY = useTransform(useSpring(x, { damping: 25, stiffness: 50 }), [0, imageW], [-10, 10]);
    const rotateX = useTransform(useSpring(y, { damping: 25, stiffness: 50 }), [0, imageH], [10, -10]);

    const handleMouseMove = useCallback((event: MouseEvent) => {
        if (ref.current) {
            const { left, top } = ref.current.getBoundingClientRect();
            x.set(event.clientX - left);
            y.set(event.clientY - top);
        }
    }, [x, y]);

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [handleMouseMove]);

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
                style={{
                    rotateX: rotateX,
                    rotateY: rotateY,
                    transformOrigin: "center",
                }}
                whileTap={{ scale: 0.90 }}
            >
                <Image
                    className={className}
                    src={src}
                    alt={alt}
                    width={imageW}
                    height={imageH}
                    sizes="100vw"
                />
            </motion.div>
        </motion.div>
    );
};

function useDimensions(ref: RefObject<HTMLElement>) {
    const [dimensions, setDimensions] = useState({ imageW: 0, imageH: 0});

    useEffect(() => {
        const updateDimensions = () => {
            if (ref.current) {
                setDimensions({
                    imageW: ref.current.offsetWidth,
                    imageH: ref.current.offsetHeight,
                });
            }
        };

        updateDimensions();

        window.addEventListener("resize", updateDimensions);

        return () => {
            window.removeEventListener("resize", updateDimensions);
        };
    }, [ref]);

    return dimensions;
}