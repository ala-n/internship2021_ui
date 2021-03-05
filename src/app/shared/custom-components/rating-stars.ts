const TEMPLATE = document.createElement('template');

TEMPLATE.innerHTML = `
  <input type="radio" name="star" id="Excellent" value="5"/>
  <label for="Excellent"></label>

  <input type="radio" name="star" id="Good" value="4"/>
  <label for="Good"></label>

  <input type="radio" name="star" id="Normal" value="3"/>
  <label for="Normal"></label>

  <input type="radio" name="star" id="Passable" value="2"/>
  <label for="Passable"></label>

  <input type="radio" name="star" id="Terrible" value="1"/>
  <label for="Terrible"></label>
`;

class RatingStars extends HTMLElement {
  static is = 'rating-stars';

  constructor() {
    super();
    this._onChange = this._onChange.bind(this);

    this.attachShadow({
      mode: 'open'
    });
    const $inner = document.importNode(TEMPLATE.content, true);
    this.shadowRoot?.appendChild($inner);
  }

  connectedCallback() {
    this.update();
    if (!this.shadowRoot) return;
    this.shadowRoot.addEventListener('change', this._onChange);
  }

  disconnectedCallback() {
    if (!this.shadowRoot) return;
    this.shadowRoot.removeEventListener('change', this._onChange);
  }

  get value() {
    const val = this.getAttribute('value');
    return +(val || 0);
  }

  set value(val) {
    if (isNaN(+val)) {
      throw new Error(`${RatingStars.is} accepts only number value`);
    }
    val = Math.min(5, Math.max(0, val));
    this.setAttribute('value', String(val));
    this.update();
  }

  private update() {
    if (!this.shadowRoot) return;
    const value = String(this.value);
    const inputs = Array.from(
      this.shadowRoot.querySelectorAll('input')
    ) as HTMLInputElement[];
    const [active] = inputs.filter((item) => item.value === value);
    if (active) {
      active.checked = true;
    }
  }

  private _onChange(e: Event) {
    this.value = +(e.target as HTMLInputElement).value;
    const event = new CustomEvent('change', {
      bubbles: true,
      cancelable: true
    });
    this.dispatchEvent(event);
  }
}

customElements.define(RatingStars.is, RatingStars);
