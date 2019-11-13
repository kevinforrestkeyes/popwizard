import { getDepopProductsFromUser } from './depop.js'

const dotenv = require('dotenv').config();
const storeId = process.env.STOREID;
let updateInProgress = false;

export function getDepopProducts() {
	console.log('getDepopProducts');
}

export function updateDepopProducts() {
	getDepopProductsFromUser(storeId)
		.then(data => console.log(data[0]));
}

export function getUpdateStatus() {
	return { updateInProgress };
}

// getDepopProductsFromUser(4835511)
// .then((products) => {
// 	const slug = products[0].slug;
// 	const url = `https://popgoblin.kevinforrestkeyes.now.sh/https:/www.depop.com/products/${slug}`;
// 	fetch(url)
// 		.then(res => res.json())
// 		.then(res => console.log(res))
// 		.catch(function(err) {
// 			console.error(err);
// 		})
// })