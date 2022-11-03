const styles = `
:host .progress {
    display: block;
    position: relative;
    background-color: #ccc;
    height: 8px;
}
:host .progress .bar {
    background-color: #aaa;
    height: 8px;
    position: absolute;
    top: 0;
    left: 0;
    transition: width 100ms linear;

    background-color: var(--green)
}
:host .progress.indetermined .bar {
    width: 10%;
    animation: animate infinite 2s linear;
}

@keyframes animate {
    0% {
        width: 10%;
        left: 0;
    }
    50% {
        width: 20%;
        left: 50%;
    }
    100% {
        width: 10%;
        left: 90%;
    }
}
`

class ProgressBar extends HTMLElement {
    constructor() {
        super()
        this.root = this.attachShadow({mode: 'open'})
    }

    static get observedAttributes() { return ['progress']; }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'progress') {
            this.progress = newValue
            console.log(this.progress)
        }
        this._render()
      }

    connectedCallback () {
        this.progress = Number(this.getAttribute('progress')) || null
        this._render()
    }

    _render() {
        const progressClassName = this.progress ? 'percent' : 'indetermined'
        this.root.innerHTML = `
            <style>${styles}</style>
            <div class="progress ${progressClassName}">
            <div class="bar" style="width: ${this.progress || 10}%;">
            </div>
        `
    }
}

window.customElements.define('progress-bar', ProgressBar)