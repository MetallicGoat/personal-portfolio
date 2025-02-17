import {useEffect, useMemo, useState} from "react";
import Particles, {initParticlesEngine} from "@tsparticles/react";
import {type Container, type ISourceOptions} from "@tsparticles/engine";
import {loadSlim} from "@tsparticles/slim";


const BackgroundLinkParticles = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = async (container?: Container): Promise<void> => {
        console.log(container);
    };

    const options: ISourceOptions = useMemo(
        () => ({
            fpsLimit: 120,
            style: {
                position: "absolute",
                index: -1
            },
            particles: {
                color: {
                    value: "#c3c3c3",
                },
                links: {
                    color: "#9d9d9d",
                    distance: 125,
                    enable: true,
                    opacity: 0.6,
                    width: 2,
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "out",
                    },
                    random: false,
                    speed: 0.75,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                    },
                    value: 175,
                },
                opacity: {
                    value: 0.6,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 5 },
                },
            },
            detectRetina: true,
        }),
        [],
    );

    if (init) {
        return (
            <Particles
                className="-z-10"
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={options}
            />
        );
    }

    return <></>;
};

export default BackgroundLinkParticles;