import { defineOxlintConfig, oxlintPresets } from '@bassist/oxc-integration'

export default defineOxlintConfig(oxlintPresets.react(), {
  env: {
    browser: true,
    node: true,
  },
  options: {
    typeAware: true,
  },
  plugins: ['nextjs'],
  ignorePatterns: [
    '**/dist/**',
    '**/.next/**',
    '**/.build/**',
    '**/public/pagefind/**',
    '**/CHANGELOG.md',
    '**/types/**/*.d.ts',
    'docs/plans/**',
  ],
  rules: {
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/react-in-jsx-scope': 'off',
    'typescript/no-extraneous-class': 'off',
    'typescript/strict-boolean-expressions': 'off',
    'typescript/require-await': 'off',
    'typescript/no-unsafe-assignment': 'off',
    'typescript/no-unsafe-type-assertion': 'off',
    'typescript/no-unsafe-return': 'off',
    'typescript/no-unsafe-member-access': 'off',
    'typescript/no-unsafe-call': 'off',
    'typescript/prefer-readonly-parameter-types': 'off',
    'typescript/no-misused-promises': 'off',
    'typescript/strict-void-return': 'off',
    'typescript/prefer-nullish-coalescing': 'off',
  },
})
