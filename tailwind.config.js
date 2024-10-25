module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    
    extend: {
      textShadow: {
        'lg': '0 0 5px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.5)',
        'lg-white': '0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.5)',
        'lg-blue': '0 0 5px rgba(59, 130, 246, 0.5), 0 0 10px rgba(59, 130, 246, 0.5)',
        'lg-gray': '0 0 5px rgba(75, 85, 99, 0.5), 0 0 10px rgba(75, 85, 99, 0.5)', 
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        georgia: ['Georgia', 'serif'],
        montserrat: ['Moneserrat', 'sans-serif'],
        courier: ['"Courier New"', 'monospace'],
        monaco: ['Monaco', 'monospace'],
        worksans: ['Work Sans', 'sans-serif'],
        pixel: ['"Press Start 2P"', 'cursive'],
      },
      
      letterSpacing: {
        wider: '0.05em',
        widest: '0.1em',
      },

      colors:{
        'grey-animate': '#2c2c2c'
      },
      // fontSize: {
      //   sm: ['14px', '20px'],
      //   base: ['16px', '24px'],
      //   lg: ['20px', '28px'],
      //   xl: ['24px', '32px'],
      // },
  
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        blink: 'blink 1s step-end infinite',
        'slide-in-top': 'slide-in-top 0.3s both',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
          'slide-in-top': {
                            '0%': { transform: 'translateY(-50px)', opacity: '0' },
                            '100%': { transform: 'translateY(0)', opacity: '1' },
                        },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    },
  ],
};
