import { getDepopProductsFromUser } from './lib/depop';
import fetch from 'node-fetch';

getDepopProductsFromUser(4835511)
	.then((products) => {
		const slug = products[0].slug;
		const url = `https://popgoblin.kevinforrestkeyes.now.sh/https:/www.depop.com/products/${slug}`;
		fetch(url)
			.then(res => res.json())
			.then(res => console.log(res))
			.catch(function(err) {
				console.error(err);
			})
	})

