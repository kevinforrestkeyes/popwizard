import fetch from 'node-fetch';

import { getAvailableProducts, updateProducts, getUpdateStatus, getIdFromStoreName } from './lib/controller';

const express = require('express');
const app = express();

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'https://wjisk.netlify.com');
	// res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
})

app.get('/', function (req, res) {
	res.send('POPWIZARD')
});

app.get('/get-store-id', async (req, res) => {
	const username = req.query.username;
	const id = await getIdFromStoreName(username);
	res.send({ id });
})

app.get('/get-depop-products', async (req, res, next) => {
	const userID = req.query.userid;
	getAvailableProducts(userID)
		.then((data) => res.send(data))
		.catch((err) => console.error(err));
});

app.get('/update-depop-products', function (req, res) {
	const userID = req.query.userid;
	res.send({ status: 'taking care of it 🐸' });
	updateProducts(userID);
});

app.get('/scrape-status', function (req, res) {
	res.send(getUpdateStatus());
})

const PORT = process.env.PORT || 2222;

app.listen(PORT, () => {
	console.log(`app running on port ${PORT}`);
});
