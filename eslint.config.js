// @ts-check
import {
  defineFlatConfig,
  js,
  jsx,
  prettier,
  react,
  typescript,
} from '@bassist/eslint'
import nextPlugin from '@next/eslint-plugin-next'

/**
 * @typedef {import('eslint-define-config').FlatESLintConfig} FlatESLintConfig
 */

const next = /** @type {FlatESLintConfig[]} */ ([
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
])

export default defineFlatConfig([
  ...js,
  ...jsx,
  ...prettier,
  ...react,
  ...typescript,
  ...next,
  {
    ignores: ['dist'],
  },
])
