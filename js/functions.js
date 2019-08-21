export async function importTemplate(url) {
	const resp = await fetch(url);
	const parser = new DOMParser();
	const html = await resp.text();
	const doc = parser.parseFromString(html, 'text/html');
	const frag = document.createDocumentFragment();
	frag.append(...doc.head.children, ...doc.body.children);
	return frag;
}
