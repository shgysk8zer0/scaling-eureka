import {importTemplate} from '../../js/functions.js';
import {SoCal} from '../../js/orgs.js';
import './offer.js';
customElements.define('schema-trip', class SchemaTripElement extends HTMLFormElement {
	constructor() {
		super();

		importTemplate(new URL('trip.html', import.meta.url)).then(async frag => {
			frag.querySelector('[name="image"]').addEventListener('change', async event => {
				const preview = this.querySelector('img[data-preview="image"]');
				preview.src = event.target.value;
			});

			frag.querySelector('img').addEventListener('load', event => {
				if (! event.target.src.endsWith('.svg')) {
					event.target.width = event.target.naturalWidth;
					event.target.height = event.target.naturalHeight;
				}
				console.log(event.target);
			});

			frag.querySelectorAll('[data-add]').forEach(btn => {
				btn.addEventListener('click', async event => {
					const target = event.target.closest('[data-add]');
					switch(target.dataset.add) {
						case 'offer':
							this.addOffer();
							break;
						case 'time':
							this.querySelector('.times-container').append(this.querySelector('[data-template-form="times"]').content.cloneNode(true));
							break;
					}
				});
			});
			this.append(frag);
			this.addEventListener('submit', async event => {
				event.preventDefault();
				console.log(JSON.parse(JSON.stringify(this)));
				navigator.clipboard.writeText(JSON.stringify(this, null, 4));
			})
		}).catch(console.error);
	}

	get(name) {
		return this.querySelector(`[name="${name}"]`).value;
	}

	set(name, value) {
		const input = this.querySelector(`[name="${name}"]`);
		if (input instanceof HTMLElement) {
			return input.value;
		} else {
			throw new Error(`Invalid input name: "${name}"`);
		}
	}

	toJSON() {
		const {offers} = this;
		const arrivalTime = [...this.querySelectorAll('[name="arrivalTime[]"]')].map(input => input.value);
		const departureTime = [...this.querySelectorAll('[name="departureTime[]"]')].map(input => input.value);
		const image = this.imagePreview;
		return {
			'@context': 'https://schema.org',
			'@type': 'Trip',
			name: this.get('name'),
			offers,
			arrivalTime,
			departureTime,
			image: {
				'@type': 'ImageObject',
				url: image.src,
				height: image.height,
				width: image.width,
			},
			description: this.get('description'),
			provider: SoCal,
		};
	}

	get type() {
		return this.get('@type');
	}

	set type(val) {
		this.set('@type', val);
	}

	get imagePreview() {
		return this.querySelector('img[data-preview="image"]');
	}

	get provider() {
		return SoCal;
	}

	/*get name() {
		return this.querySelector('[name="name"]').value;
	}

	set name(val) {
		this.querySelector('[name="name"]').value = val;
	}*/

	get offers() {
		return [...this.querySelectorAll('schema-offer')];
	}

	async addOffer() {
		await customElements.whenDefined('schema-offer');
		const Offer = customElements.get('schema-offer');
		const offer = new Offer();
		offer.classList.add('block');
		this.querySelector('.offers-container').append(offer);
	}
}, {
	extends: 'form',
})
