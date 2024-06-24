export function initGauges() {
    const gaugesContainer = document.querySelector('#gauges')

    if (!gaugesContainer) {
        console.error('No gauges found.')
        return
    }

    const componentsObserver = new ResizeObserver((c) => {
        // yes, i know, it is very stupid way
        if (c[0]?.contentRect?.height > 200) {
            console.log('Web components loaded')
            assignButtons()
            gaugesContainer.classList.add('loaded')
        }
    })

    console.log('Size watcher attached', gaugesContainer)
    componentsObserver.observe(gaugesContainer)
}

function assignButtons() {
    const ring = document.querySelector('progress-ring')
    const buttonOne = document.querySelector('#buttonOne')
    const buttonTwo = document.querySelector('#buttonTwo')
    const buttonThree = document.querySelector('#buttonThree')

    buttonOne?.addEventListener('click', () => {
        ring?.setAttribute('percentage', '30')
    })

    buttonTwo?.addEventListener('click', () => {
        ring?.setAttribute('percentage', '60')
    })

    buttonThree?.addEventListener('click', () => {
        ring?.setAttribute('percentage', '90')
    })
}
