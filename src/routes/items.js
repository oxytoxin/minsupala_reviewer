import fs from 'fs';
export async function get() {
	let file = fs.readFileSync('src/lib/items.json');
	let items = JSON.parse(file);
	return {
		body: items
	};
}
