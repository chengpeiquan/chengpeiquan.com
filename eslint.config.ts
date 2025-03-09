import {
  createGetConfigNameFactory,
  defineFlatConfig,
  imports,
  javascript,
  jsx,
  next,
  react,
  typescript,
} from '@bassist/eslint-config'

const getConfigName = createGetConfigNameFactory('chengpeiquan.com')

export default defineFlatConfig([
  ...imports,
  ...javascript,
  ...jsx,
  ...react,
  ...typescript,
  ...next,
  {
    name: getConfigName('navigation'),
    rules: {
      // Consistently import navigation APIs from `@/navigation`
      'no-restricted-imports': [
        'error',
        {
          name: 'next/link',
          message: 'Please import from `@/navigation` instead.',
        },
        {
          name: 'next/navigation',
          importNames: [
            'redirect',
            'permanentRedirect',
            'useRouter',
            'usePathname',
          ],
          message: 'Please import from `@/navigation` instead.',
        },
      ],
    },
  },
  {
    name: getConfigName('override'),
    rules: {
      'require-await': 'off',
    },
  },
  {
    name: getConfigName('tailwindcss'),
    rules: {
      'tailwindcss/no-custom-classname': [
        'warn',
        {
          whitelist: [
            'text-foreground',
            'text-muted-foreground',
            'bg-background',
            'border-l-background',
            'border-input',
            'border-l-input',
          ],
        },
      ],
    },
  },
  {
    name: getConfigName('ignore'),
    ignores: ['**/contents/**.md', '**/types/**/*.d.ts'],
  },
])
