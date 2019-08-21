customElements.whenDefined('schema-thing').then(() => {
	const SchemaThingElement = customElements.get('schema-thing');
	class SchemaImageObjectElement extends SchemaThingElement {
		get type() {
			return 'image-object';
		}
	}

	customElements.define('schema-image-object', SchemaImageObjectElement);
});
