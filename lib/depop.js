import fetch from 'node-fetch';

export async function getDepopProductsFromUser(userId) {
	let products = [];
	let end = false;
	let offsetId = null;
	while (!end) {
		const result = await fetchProductData(userId, offsetId);
		offsetId = result.meta.last_offset_id;
		end = result.meta.end;
		products = [...products, ...result.products.filter(product => !product.status.includes('DELETED'))];
	}
	return products;
}

async function fetchProductData(userId, offset) {
	const url = `https://webapi.depop.com/api/v1/shop/${userId}/products?limit=24${offset !== null ? `&offset_id=${offset}` : '' }`;
	const result = await fetch(url)
		.then(res => res.json())
		.then(res => res)
		.catch(function(err) {
			console.error(err);
		})
	return result;
}