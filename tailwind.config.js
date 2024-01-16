import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            'display': ['Lemon']
        },
        extend: {},
    },
    plugins: [daisyui],
    daisyui: {
        themes: ["corporate", "business"],
    },
}