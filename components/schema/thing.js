import './image-object.js';

class SchemaThingElement extends HTMLElement {
	constructor() {
		super();

		if (this.shadowRoot === null) {
			this.attachShadow({mode: 'open'});
		}

		this.build();
		console.log({created: this, connected :this.isConnected});
	}

	async build() {
		if (super.connectedCallback instanceof Function) {
			await super.connectedCallback();
		}

		const {head, body} = await this.getTemplate(this.type.toLowerCase());
		this.shadowRoot.append(...head, ...body);
		console.log({connected: this, 'super': super.prototype});
	}

	get type() {
		return 'Thing';
	}

	toJSON() {
		return Object.fromEntries([...this.shadowRoot.querySelectorAll('[name]')].map(el => {
			return (el instanceof SchemaThingElement)
				? [el.getAttribute('name'), el.toJSON()]
				: [el.name, el.value];
		}));
	}

	async getTemplate(type = 'thing') {
			const resp = await fetch(new URL(`${type}.html`, import.meta.url));
			const parser = new DOMParser();
			const html = await resp.text();
			const doc = parser.parseFromString(html, 'text/html');
			return {
				head: [...doc.head.children],
				body: [...doc.body.children],
			}
	}
}

customElements.define('schema-thing', SchemaThingElement);

export default SchemaThingElement;
