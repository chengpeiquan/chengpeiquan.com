import { getOxfmtConfig } from '@bassist/oxc-integration'
import { defineConfig } from 'oxfmt'

export default defineConfig(
  getOxfmtConfig({
    ignorePatterns: ['**/*.md'],
  }),
)
