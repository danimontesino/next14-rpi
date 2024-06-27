const plugin = require('tailwindcss/plugin')

const animationDelay = plugin(
  function ({ matchUtilities, theme }) {
    matchUtilities(
      {
        'animation-delay': (value) => {
          return {
            animationDelay: `${value}`,
          }
        },
      },
      {
        values: theme('animationDelay'),
      },
    )
  },
  {
    theme: {
      animationDelay: {
        none: '0s',
        75: '75ms',
        100: '100ms',
        150: '150ms',
        200: '200ms',
        300: '300ms',
        400: '400ms',
        500: '500ms',
        600: '600ms',
        700: '700ms',
        800: '800ms',
        900: '900ms',
        1000: '1000ms',
        1100: '1100ms',
        1200: '1200ms',
        1300: '1300ms',
        1400: '1400ms',
        1500: '1500ms',
        2000: '2000ms',
        2500: '2500ms',
        3000: '3000ms',
        3500: '3500ms',
        4000: '4000ms',
        4500: '4500ms',
        5000: '5000ms',
        6000: '6000ms',
        7000: '7000ms',
        8000: '8000ms',
        9000: '9000ms',
      },
    },
  },
)

module.exports = animationDelay
