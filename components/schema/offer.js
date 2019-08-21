import {importTemplate} from '../../js/functions.js';
customElements.define('schema-offer', class SchemaOfferElement extends HTMLElement {
	constructor() {
		super();
		importTemplate(new URL('offer.html', import.meta.url)).then(frag => this.append(frag));
	}

	toJSON() {
		return {
			'@type': this.itemtype,
			name: this.name,
			price: this.price,
			priceCurrency: this.priceCurrency,
		};
	}

	get itemtype() {
		return this.querySelector('[name="@type"]').value;
	}

	set itemtype(val) {
		this.querySelector('[name="@type"]').value = val;
	}

	get name() {
		return this.querySelector('[name="name"]').value;
	}

	set name(val) {
		this.querySelector('[name="name"]').value = val;
	}

	get price() {
		return this.querySelector('[name="price"]').value;
	}

	set price(val) {
		this.querySelector('[name="price"]').value = val;
	}

	get priceCurrency() {
		return this.querySelector('[name="priceCurrency"]').value;
	}

	set priceCurrency(val) {
		this.querySelector('[name="priceCurrency"]').value = val;
	}
});
