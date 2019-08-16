const CONTEXT = 'https://schema.org';
import {notify} from 'https://cdn.kernvalley.us/js/std-js/functions.js';
import './schema/thing.js';
class SchemaFormElement extends HTMLFormElement {
	constructor() {
		super();
		this.addEventListener('submit', async event => {
			event.preventDefault();
			try {
				await navigator.clipboard.writeText(JSON.stringify(this));

				await notify('Data copied', {
					body: 'Data has been generated and copied to the clipboard',
					icon: 'https://cdn.kernvalley.us/img/octicons/clippy.svg',
				});
			} catch (err) {
				console.error(err);
				await notify('An error occured', {
					body: 'Could not copy to clipboard',
					icon: 'https://cdn.kernvalley.us/img/octicons/bug.svg',
				});
			}
		});
	}

	toJSON() {
		return this.firstElementChild;
	}

	get context() {
		return this.getAttribute('context') || CONTEXT;
	}

	set context(val) {
		this.setAttribute('context', val);
	}

	get type() {
		return this.getAttribute('type') || 'Thing';
	}

	set type(val) {
		this.setAttribute('type', val);
	}

	async attributeChangedCallback(attr, oldVal, newVal) {
		switch(attr) {
		case 'context':
			console.error('Changing context is not currently supported');
			break;
		case 'type':
			console.info({attr, newVal, oldVal});
			break;
		default:
			throw new Error(`Unhandled attribute changed: "${attr}"`);
		}
	}

	static get observedAttributes() {
		return [
			'type',
			'context',
		];
	}
}

customElements.define('schema-form', SchemaFormElement, {extends: 'form'});
