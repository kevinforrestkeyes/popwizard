import { getDepopProductsFromUser } from './lib/depop';
import fetch from 'node-fetch';

import { getDepopProducts, updateDepopProducts, getUpdateStatus } from './lib/controller';

const express = require('express');
const app = express();

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'https://wjisk.netlify.com');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
})

app.get('/', function (req, res) {
	res.send('POPWIZARD')
});

app.get('/get-depop-products', async (req, res, next) => {
	getDepopProducts()
		.then((data) => res.send(data))
		.catch((err) => console.error(err));
});

app.get('/update-depop-products', function (req, res) {
	res.send({ status: 'updating products' });
	updateDepopProducts();
});

app.get('/scrape-status', function (req, res) {
	res.send(getUpdateStatus());
})

const PORT = process.env.PORT || 2222;

app.listen(PORT, () => {
	console.log(`app running on port ${PORT}`);
});
