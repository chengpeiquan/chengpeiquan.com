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
            'text-primary',
            'text-foreground',
            '!text-foreground',
            'text-muted-foreground',
            '!text-muted-foreground',
            'from-background',
            'via-background/80',
            'via-primary/80',
            'bg-background',
            'bg-background/20',
            'bg-primary',
            'bg-primary/50',
            'bg-accent/50',
            'bg-border',
            'border-primary/20',
            'border-l-background',
            'border-input',
            'border-l-input',
            'from-foreground',
            'from-background/30',
            'from-primary',
            'from-accent',
            'to-background',
            'to-foreground/60',
            'to-foreground/70',
            'to-primary/50',
            'to-accent/50',
            'to-border',
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
