import fetch from 'node-fetch';
import axios from 'axios';
import cheerio from 'cheerio';

export async function getUserIdFromUsername(username) {
	const targetUrl = `https://www.depop.com/${username}/`;
	const id = await axios.get(targetUrl)
		.then(response => {
			const $ = cheerio.load(response.data);
			const id = $('meta[name="twitter:app:url:iphone"]').attr('content').split('/').slice(-1).pop();
			return id;
		})
	return id;
}

export async function getDepopProductsFromUser(userId) {
	let products = [];
	let end = false;
	let offsetId = null;
	while (!end) {
		const result = await fetchProductData(userId, offsetId);
		offsetId = result.meta.last_offset_id;
		end = result.meta.end;
		products = [...products, ...result.products];
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