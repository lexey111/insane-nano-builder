import {OUTPUT_DIR, PORT} from '../build.config.js'
import {errorBanner} from './error-processing.js'

const content_404 = '<!DOCTYPE html><html lang="en"><body>OOPS, file not found!</body></html>'

export async function initBS(bs, buildErrors) {
    console.log('[ Init BrowserSync... ]')

    let resolver
    const bsPromise = new Promise((resolve) => {
        resolver = resolve
    })

    bs.init({
        server: OUTPUT_DIR,
        open: false,
        online: false,
        port: PORT,
        ui: false,
        ghostMode: false,
        snippet: true,
        snippetOptions: {
            rule: {
                match: /<\/body>/i,
                fn: function (snippet, match) {
                    snippet += errorBanner(buildErrors)
                    return snippet + match
                }
            }
        },
        callbacks: {
            ready: function (err, bs) {
                bs.addMiddleware('*', (req, res) => {
                    res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' })
                    res.write(content_404)
                    res.end()
                })
            },
        }
    },
    (err, bs) => {
        console.log('[ BrowserSync ready ]')
        if (err || !bs.active) {
            console.error(err || 'Unknown error')
            process.exit(2)
        }
        resolver()
    })

    return bsPromise
}