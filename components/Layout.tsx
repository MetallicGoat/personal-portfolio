import React, {ReactNode, useState} from 'react';
import {FiAlertTriangle, FiX} from 'react-icons/fi';
import {Transition} from '@headlessui/react';

type Props = {
    children: ReactNode;
};

const Layout = ({children}: Props) => {
    const [showBanner, setShowBanner] = useState(true);

    return (
        <div>
            <Transition
                show={showBanner}
                enter="transition-opacity delay-5 duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >

                <div className="border-4 border-yellow-700 bg-amber-200 p-2 flex items-center text-dark flex justify-center">
                    <FiAlertTriangle className="text-2xl mr-2 text-yellow-700"/>
                    <h1 className="text-yellow-700 font-bold">This Website is Still Under Constitution!</h1>

                    <button
                        className="absolute pl-5 right-5 text-2xl text-yellow-700"
                        onClick={() => setShowBanner(false)}
                    >
                        <FiX/>
                    </button>
                </div>
            </Transition>
            {children}
        </div>
    );
};

export default Layout;