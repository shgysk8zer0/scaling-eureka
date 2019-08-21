customElements.whenDefined('schema-thing').then(() => {
	const SchemaThingElement = customElements.get('schema-thing');

	class SchemaPersonElement extends SchemaThingElement {
		get type() {
			return 'Person';
		}
	}

	customElements.define('schema-person', SchemaPersonElement);
});
