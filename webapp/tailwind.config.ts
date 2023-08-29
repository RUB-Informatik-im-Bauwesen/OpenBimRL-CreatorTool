// @ts-ignore
import colors from 'tailwindcss/colors';

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                default: {
                    darkest: '#000000',
                    dark: '#14213D',
                    medium: colors.neutral[200],
                    light: colors.teal[50],
                    contrast: '#FCA311',
                },
                success: colors.green[500],
                'ease-blue': colors.blue[600],
                danger: colors.red[600],
            },
        },
    },
    plugins: [],
};
