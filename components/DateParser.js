/*
    When calling this component with a date string (2022-10-14 12:00)
    it will return how many hours ago/until that date.

    Objective:
    1.  Add an optional attribute named "format" to the component so that you can choose between hours or days. 
    2.  Add a calculation so that if format is not defined, it returns the most intuitive time unit.
*/

class DateParser extends HTMLElement {
    constructor () {
        super()
    }

    connectedCallback () {
        this.time = this.getAttribute('time')
        this._render()
    }
    getRelativeTime (d1, d2 = new Date(), lang) {
        const units = {
            'hour': 60 * 60 * 1000,
            'second': 1000
        }
        const rtl = new Intl.RelativeTimeFormat('nb-no', { numeric: 'auto' })
        const elapsed = Math.round((new Date(d1) - d2) / 1000 / 60 / 60)

        return rtl.format(elapsed, 'hour')
    }

    _render () {
        this.innerHTML = `${this.getRelativeTime(this.time)}`
    }
}

window.customElements.define('date-parser', DateParser)