import { fs } from '@bassist/node-utils'
import { publicDirs } from './shared'

// Why? See:
// https://nextjs.org/docs/app/api-reference/next-config-js/output#automatically-copying-traced-files
const run = async () => {
  fs.copy(publicDirs.source, publicDirs.target)
}

run().catch((e) => {
  console.log(e)
})
