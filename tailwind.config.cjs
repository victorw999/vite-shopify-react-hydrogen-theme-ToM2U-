/** @type {import('tailwindcss').Config} */

const palette = {
  'teal': '56, 191, 195',
  'dark-teal': '38, 130, 133',
  'black': '35, 31, 32',
  'dark-gray': '51, 51, 51',
  'slate': '75, 75, 75',
  'dim-gray': '112, 112, 112',
  'lightgray': '0 0% 96.9%',
  'smoke': '224, 224, 224',
  'salt': '248, 251, 251',
  'brown': '162, 100, 50',
  'red': '239, 71, 52',
  'salmon': '255, 93, 82',
  'pink': '244, 129, 123',
  'yellow': '243, 235, 216',
  'orange': '252, 182, 62',
  'green': '29, 180, 102',
  'blue-green': '71, 191, 175',
  'purple': '139, 125, 186',
  'muted-purple': '82, 105, 105',
  'blue-purple': '131, 148, 191',
};

module.exports = {
  /* prevent conflict w/ existing css  */
  corePlugins: {
    preflight: false,
  },
  prefix: 'tw-',
  // important: true,
  /* prevent conflict w/ existing css  */

  
  darkMode: ["class"],
  content: [
    './templates/**/*.{liquid,html,js,json}',
    './snippets/*.{liquid,html,js,json}',
    './sections/*.{liquid,html,js,json}',
    './layout/*.{liquid,html,js,json}',
    "./frontend/**/*.{html,js,jsx}"
  ],

  // don't look at these folders
  exclude: [    
    './.github/**',
    './.vscode/**',
    './assets/**',
    './config/**',
    './node_modules/**',
  ],

  
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {

      fontSize: {
        // 'xs': ['0.752rem', '1rem'], 
        // 'sm': ['0.875rem', '1.25rem'],
        // 'base': ['1rem', '1.5rem'], 
        // 'lg': ['1.125rem', '1.75rem'],
        // 'xl': ['1.25rem', '1.875rem'],   
        // '2xl': ['1.5rem', '2.15rem'],  
        // '3xl': ['1.875rem', '2.25rem'],  
        // '4xl': ['2.25rem', '2.5rem'], 
        // '5xl': ['3rem', '3.25rem'], 

        // vicmod: 
        // I think Tailwind generates font-size CSS alphabetically. 
        // That's why text-xs and text-sm always appear after text-lg in the output CSS.
        // therefore im adding z_ prefix 
        'z_xs': ['0.752rem', '1rem'],
        'z_sm': ['0.875rem', '1.25rem'],
        'z_base': ['1rem', '1.5rem'],
        'z_lg': ['1.125rem', '1.75rem'],
        'z_xl': ['1.25rem', '1.875rem'],
        'z_2xl': ['1.5rem', '2.15rem'],
        'z_3xl': ['1.875rem', '2.25rem'],
        'z_4xl': ['2.25rem', '2.5rem'],
        'z_5xl': ['3rem', '3.25rem'],
      },

      colors: {
        'teal': `rgb(${palette.teal})`,
        'teal-1': `rgba(${palette.teal}, .9)`,
        'teal-2': `rgba(${palette.teal}, .8)`,
        'teal-3': `rgba(${palette.teal}, .7)`,
        'teal-4': `rgba(${palette.teal}, .6)`,
        'teal-5': `rgba(${palette.teal}, .5)`,
        'teal-100': `rgb(237, 249, 249)`,

        'lightgray': `hsl(0 0% 97)`,
        'lightgray1': `hsl(0 0% 96)`,
        'lightgray2': `hsl(0 0% 95)`,
        'lightgray3': `hsl(0 0% 94)`,
        'lightgray4': `hsl(0 0% 93)`,
        'lightgray5': `hsl(0 0% 92)`,

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "spin2": {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        "spinme": {
          '0%': { transform: 'rotateZ(0deg)' },
          '100%': { transform: 'rotateZ(360deg)' }
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'spin-slow': 'spin2 3s linear infinite', 
        'spin-me': 'spinme 1s linear infinite', 
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}