import htmlPlugin from '@chialab/esbuild-plugin-html'
import {sassPlugin} from 'esbuild-sass-plugin'

export const PORT = 3000

export const SOURCE_DIR = './src'
export const OUTPUT_DIR = './dist'

export const DEBOUNCE_BUILD_TIME = 500

export const buildConfig = {
    entryPoints: [
        'src/index.html',
        'src/dashboard.html'
    ],
    assetNames: 'assets/[name]-[hash]',
    chunkNames: '[ext]/[name]-[hash]',
    outdir: OUTPUT_DIR,
    bundle: true,
    minify: false,
    plugins: [
        htmlPlugin(),
        sassPlugin(),
    ],
}

