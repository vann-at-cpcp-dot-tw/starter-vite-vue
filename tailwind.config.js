const plugin = require('tailwindcss/plugin')

const extendColors = [
  'main',
  'secondary',
  'error'
].reduce((acc, colorKey, inde)=>{
  return {
    ...acc,
    [colorKey]: {
      DEFAULT: `var(--color-${colorKey})`,
      50: `var(--color-${colorKey}-50)`,
      100: `var(--color-${colorKey}-100)`,
      200: `var(--color-${colorKey}-200)`,
      300: `var(--color-${colorKey}-300)`,
      400: `var(--color-${colorKey}-400)`,
      500: `var(--color-${colorKey}-500)`,
      600: `var(--color-${colorKey}-600)`,
      700: `var(--color-${colorKey}-700)`,
      800: `var(--color-${colorKey}-800)`,
      900: `var(--color-${colorKey}-900)`,
    }
  }
}, {})

module.exports = {
  content: {
    content: [
      // './src/**/*.{vue,jsx}',
      '**/*.{html,jsx,vue,php}',
    ],
  },
  future: { },
  theme: {
    container: {
      center: true,
    },
    fontWeight: {
      100: '100',
      200: '200',
      300: '300',
      400: '400',
      500: '500',
      600: '600',
      700: '700',
      800: '800',
      900: '900',
    },
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1400px',
      xxxl: '1600px',
      xxxxl: '1920px',
    },
    extend: {
      colors: extendColors,
      screens: {
        print: {raw: 'print'},
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    plugin(function({ addVariant, e }){
      addVariant('lang-zh-TW', ({modifySelectors, separator})=>{
        modifySelectors(({className})=>`body.lang-zh-TW .${e(`lang-zh-TW${separator}${className}`)}`)
      })

      addVariant('lang-other', ({modifySelectors, separator})=>{
        modifySelectors(({className})=>`body.lang-other .${e(`lang-other${separator}${className}`)}`)
      })
    }),
  ],
  corePlugins: {
    container: false,
    animation: false,
  },
}
