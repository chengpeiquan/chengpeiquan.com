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
      '@typescript-eslint/no-extraneous-class': 'off',
    },
  },
  {
    name: getConfigName('tailwindcss'),
    rules: {
      'tailwindcss/no-custom-classname': [
        'warn',
        {
          whitelist: [
            'dark',
            'text-foreground',
            '!text-foreground',
            'text-muted-foreground',
            '!text-muted-foreground',
            'from-background',
            'via-background/80',
            'via-primary/80',
            'bg-background',
            'bg-primary/50',
            'bg-accent/50',
            'border-primary/20',
            'border-l-background',
            'border-input',
            'border-l-input',
            'from-foreground',
            'from-primary',
            'from-accent',
            'to-foreground/60',
            'to-foreground/70',
            'to-primary/50',
            'to-accent/50',
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
