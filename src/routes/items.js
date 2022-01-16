import items from '$lib/items.json';
export async function get() {
	return {
		body: items
	};
}
