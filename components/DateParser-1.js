class DateParser extends HTMLElement {
    constructor () {
        super()
        this.format = this.getAttribute('format')
    }

    connectedCallback () {
        this.time = this.getAttribute('time')
        this._render()
    }
    getRelativeTime (d1, d2 = new Date(), lang) {
        const rtl = new Intl.RelativeTimeFormat('nb-no', { numeric: 'auto' })
        const units = {
            'year': 60 * 60 * 24 * 365 * 1000,
            'month': 60 * 60 * 24 * 365/12,
            'week': 60 * 60 * 24 * 7 * 1000,
            'day': 60 * 60 * 24 * 1000,
            'hour': 60 * 60 * 1000,
            'minute': 60 * 1000,
            'second': 1000
        }

        const elapsed = Math.round((new Date(d1) - d2))
        const recalc =  Math.round(elapsed / units[this.format])
        return rtl.format(recalc, this.format)
    }

    _render () {
        this.innerHTML = `${this.getRelativeTime(this.time)}`
    }
}

window.customElements.define('date-parser', DateParser)