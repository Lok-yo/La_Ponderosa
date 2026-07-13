import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync
} from 'node:fs'
import { join, resolve } from 'node:path'

const distDir = resolve('dist')
const workerOutputs = readdirSync(distDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => join(distDir, entry.name))
  .filter((directory) => existsSync(join(directory, 'wrangler.json')))

if (workerOutputs.length !== 1) {
  throw new Error(`Expected one Cloudflare worker output, found ${workerOutputs.length}.`)
}

const [workerOutput] = workerOutputs
const serverDir = join(distDir, 'server')

mkdirSync(serverDir, { recursive: true })
copyFileSync(join(workerOutput, 'index.js'), join(serverDir, 'index.js'))
copyFileSync(join(workerOutput, 'wrangler.json'), join(serverDir, 'wrangler.json'))

console.log('Sites bundle prepared at dist/server/index.js')
