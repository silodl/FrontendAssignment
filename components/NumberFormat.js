class NumberFormat extends HTMLElement {
    constructor () {
        super()
        
    }

    connectedCallback () {
        this.number = Number(this.innerHTML)
        this.style = this.getAttribute('style') || null
        this.currency = this.getAttribute('currency') || 'EUR'
        this.locale = this.getAttribute('locale') || 'de-DE'
        this._render()
    }


    convertNumber (num) {
        const ntl = new Intl.NumberFormat('en', {
            style: 'currency' || null,
            currency: this.currency
        })
        return ntl.format(num)
    }

    _render() {
        this.innerHTML = this.convertNumber(this.number)
    }
}

window.customElements.define('number-format', NumberFormat)