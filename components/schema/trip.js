import {importTemplate} from '../../js/functions.js';
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
			provider: {
				'@type': 'Organization',
				name: 'SoCal Rafting',
				url: 'https://www.socalrafting.com/',
				email: 'booking@socalrafting.com',
				telephone: '+1-888-537-6748',
				sameAs: [
					'http://www.facebook.com/kernriverrafting',
					'https://www.yelp.com/biz/socal-rafting-kernville',
					'http://instagram.com/kernriverrafting',
					'http://www.youtube.com/c/socalrafting',
				],
				logo: {
					'@type': 'ImageObject',
					url: 'https://static.wixstatic.com/media/47074e_e3fd372c95924fc185ce4e614f46669f~mv2_d_2768_1384_s_2.png/v1/crop/x_0,y_264,w_2768,h_863/fill/w_304,h_95,al_c,q_80,usm_0.66_1.00_0.01/47074e_e3fd372c95924fc185ce4e614f46669f~mv2_d_2768_1384_s_2.png',
					height: 95,
					width: 304
				},
				image: {
					'@type': 'ImageObject',
					url: 'https://static.wixstatic.com/media/47074e_fc91557ac96b476aa9487870836a515d~mv2.jpg/v1/fill/w_636,h_477,al_c,q_80,usm_0.66_1.00_0.01/47074e_fc91557ac96b476aa9487870836a515d~mv2.jpg',
					height: 477,
					width: 636
				},
				location: {
					'@type': 'Place',
					name: 'SoCal Rafting',
					address: {
						'@type': 'PostalAddress',
						streetAddress: '11101 Kernville Rd.',
						addressLocality: 'Kernville',
						addressRegion: 'CA',
						addressCountry: 'US',
						postalCode: 93238
					},
					openingHoursSpecification: [{
						'@type': 'OpeningHoursSpecification',
						dayOfWeek: 'Sunday',
						opens: '08:00',
						closes: '20:00',
					}, {
						'@type': 'OpeningHoursSpecification',
						dayOfWeek: 'Monday',
						opens: '08:00',
						closes: '18:00',
					}, {
						'@type': 'OpeningHoursSpecification',
						dayOfWeek: 'Tuesday',
						opens: '08:00',
						closes: '18:00',
					}, {
						'@type': 'OpeningHoursSpecification',
						dayOfWeek: 'Wednesday',
						opens: '08:00',
						closes: '18:00',
					}, {
						'@type': 'OpeningHoursSpecification',
						dayOfWeek: 'Thursday',
						opens: '08:00',
						closes: '18:00',
					}, {
						'@type': 'OpeningHoursSpecification',
						dayOfWeek: 'Friday',
						opens: '08:00',
						closes: '20:00',
					}, {
						'@type': 'OpeningHoursSpecification',
						dayOfWeek: 'Saturday',
						opens: '08:00',
						closes: '20:00',
					}],
				},
			},
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
		this.querySelector('.offers-container').append(new Offer());
	}
}, {
	extends: 'form',
})
