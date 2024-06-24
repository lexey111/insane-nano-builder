const messagePrefix = '__build_error_message_'

export function errorBanner(buildErrors) {
    if (!buildErrors || buildErrors.length === 0) {
        return ''
    }

    // to safe html
    const errors = buildErrors.map(buildError => '<p>' +
        buildError.replaceAll('<', '&lt;')
            .replaceAll('<', '&gt;')
            .replaceAll('\n', '<br/>')
        + '</p>')

    return `
<style>
    #${messagePrefix},
    #${messagePrefix}::before,
    #${messagePrefix}::after,
    #${messagePrefix} *
    #${messagePrefix} *::before,
    #${messagePrefix} *::after {
      all: revert;
    }
    #${messagePrefix} {
       position: fixed;
       display: block;
       top: 0;
       left: 0;
       right: 0;
       bottom: 0;
       padding: 20px;
       background: rgba(0,0,0,0.8);
       font-size: 14px;
       z-index: 1000;
    }
    #${messagePrefix} h1 {
       font-size: 32px;
       font-weight: 200;
       color: #ff006a;    
       border-bottom: 2px solid #ff006a;
       padding: 0 0 8px 0;
       margin: 0 0 32px 0;
       font-family: monospace;
    }
    #${messagePrefix} p {
       font-size: 16px;
       font-family: monospace;
       display: block;
       width: 100%;
       float: none;
       color: #ff006a;    
       margin: 0 0 16px 0;
       padding: 0;
       text-indent: 0;
       line-height: 1.4em;
       white-space: pre-wrap;
    }
</style>
<div id="${messagePrefix}">
    <h1>Build error (at least ${buildErrors.length})</h1>
    ${errors.join('\n')}
</div>
`
}

// sometimes plugins store errors with ANSI highlight
const pattern = [
    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
    '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))'
].join('|')

const ansiRegex = new RegExp(pattern, 'g')

export function fillErrorLines(buildErrors, errors) {
    buildErrors.length = 0

    errors?.forEach(error => {
        const detailedError = error.detail.errors

        detailedError.forEach(detail => {
            let text = ''
            if (detail.location?.file) {
                text += '\n' + 'File: ' + detail.location?.file + ':' + (detail.location?.line || '0') + ':' + (detail.location?.column || '0')
            }

            if (detail.location?.lineText) {
                let err = ''
                const gutterWidth = ('' + detail.location?.line).length + 1

                err += '\n' + ' '.padEnd(gutterWidth) + '╷ '
                err += '\n' + detail.location.line + ' │ ' + detail.location.lineText

                err += '\n' + ' '.padEnd(gutterWidth) + '│ ' + ''.padEnd(detail.location.column)

                if (detail.location.length > 1) {
                    err += ''.padEnd(detail.location.length, '~')
                } else {
                    err += '^'
                }

                if (detail.location.column > 0 && detail.location.suggestion) {
                    err += '\n' + ' '.padEnd(gutterWidth) + '╵ ' + ''.padEnd(detail.location.column) + (detail.location.suggestion || '^')
                }

                text += err + '\n'
            }
            text += '\n' + detail.text

            if (detail.pluginName) {
                text += '\n\n[ ' + detail.pluginName + ' ]'
            }

            const finalText = text.replace(ansiRegex, '')

            if (!buildErrors.includes(finalText)) {
                buildErrors.push(finalText)
            }
        })
    })
}
