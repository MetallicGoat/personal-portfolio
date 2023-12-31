const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./pages/**/*.{html,js,ts,jsx,tsx}",
        "./components/**/*.{html,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontSize: {

            },
            maskImage: {
                'gradient-to-r': 'linear-gradient(to right, #000, rgba(0, 0, 0, 0))',
                'gradient-to-r-opacity': 'linear-gradient(to right, #000, rgba(0, 0, 0, 0.2))',
            }
        },
        screens: {
            'xs': '500px',
            // // => @media (min-width: 400px) { ... }

            'sm': '640px',
            // => @media (min-width: 640px) { ... }

            'md': '768px',
            // => @media (min-width: 768px) { ... }

            'lg': '1024px',
            // => @media (min-width: 1024px) { ... }

            'xl': '1280px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }
        }
    },

    plugins: [
        plugin(function({ addVariant, e }) {
            addVariant('RGB', ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `.rgb-mode .${e(`RGB${separator}${className}`)}`;
                });
            });
        }),
    ],
}