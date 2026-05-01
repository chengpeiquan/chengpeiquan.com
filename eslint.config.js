// @ts-check

import { createGetConfigNameFactory } from '@bassist/eslint-config'
import { defineEslintConfig, eslintPresets } from '@bassist/oxc-integration'
import tailwindWhitelist from './tailwind.whitelist.js'

const getConfigName = createGetConfigNameFactory('chengpeiquan.com')
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export default defineEslintConfig(
  eslintPresets.node(),
  eslintPresets.vitest(),
  eslintPresets.imports(),
  eslintPresets.jsonc(),
  eslintPresets.tailwindcss({
    whitelist: tailwindWhitelist,
    entryPoint: 'src/styles/globals.css',
  }),

  {
    name: getConfigName('tailwindcss'),
    rules: {
      'better-tailwindcss/no-unknown-classes': [
        'error',
        {
          ignore: tailwindWhitelist.map(
            (className) => `^${escapeRegExp(className)}$`,
          ),
        },
      ],
    },
  },

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
    name: getConfigName('ignore'),
    ignores: [
      '**/dist/**',
      '**/public/**/*.json',
      '**/cache/**/*.json',
      '**/.next/**',
      '**/.build/**',
      '**/CHANGELOG.md',
      '**/types/**/*.d.ts',
      'docs/plans/**',
    ],
  },
)
