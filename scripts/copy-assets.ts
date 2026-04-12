import { fse, publicDirs } from './shared'
import { runTask } from './task-runner'

// Why? See:
// https://nextjs.org/docs/app/api-reference/next-config-js/output#automatically-copying-traced-files
export const copyAssets = async () => {
  await runTask(() => fse.copy(publicDirs.source, publicDirs.target))
}

if (import.meta.main) {
  copyAssets().catch(console.error)
}
