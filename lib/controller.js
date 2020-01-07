import { getDepopProductsFromUser, getUserIdFromUsername } from './depop.js'
import db from './db';
import Product from '../models/product';
import fetch from 'node-fetch';
let updateInProgress = false;

async function addNewProductsToDB(storeID) {
	await getDepopProductsFromUser(storeID)
		.then(products => {
			products.forEach(async product => {
				const { id, slug } = product;
				let sold = product.sold;
				const match = await findProductByID(id);
				if (match === null) {
					const price = product.price.price_amount;
					if (!sold && product.status.includes('DELETED')) {
						sold = true;
					}
					const productData = {
						id,
						slug,
						sold,
						price,
						storeID,
					}
					await addNewProductToDatabase(productData);
				} else {
					if (sold && !match.sold) {
						updateById(match.id, { sold });
					}
				}
			})
		});
}

async function addDetailsToProducts() {
	const products = await getProductsWithoutDetails();
	products.forEach(async product => {
		const details = await getProductDetailsFromSlug(product.slug);
		updateById(product.id, { ...details.data, details: true });
	})
}

export async function updateProducts(userID) {
	updateInProgress = true;
	await addNewProductsToDB(userID)
	await addDetailsToProducts();
	updateInProgress = false;
}

async function getProductDetailsFromSlug(slug) {
	const baseUrl = 'https://prodgoblin.now.sh/';
	const url = `${baseUrl}${slug}`;
	const details = await fetch(url)
		.then(res => res.json())
		.then(res => res)
		.catch(function(err) {
			console.error(err);
		})
	return details;
}

export function getUpdateStatus() {
	return { updateInProgress };
}

async function addNewProductToDatabase(productData) {
	const product = new Product();
	const { id, slug, sold, price, storeID } = productData;
	product.id = id;
	product.slug = slug;
	product.price = price;
	product.sold = sold;
	product.details = false;
	product.storeID = storeID;
	product.save(err => {
		if (err) {
			console.error(err);
		}
	})
	return { status: 'success' };
}

export async function getProducts() {
	const products = Product.find().exec();
	return products;
}

export async function getAvailableProducts(storeID) {
	const products = Product.find({ 
		details: true, 
		sold: false,
		storeID: storeID
	});
	return products;
}

export async function getProductsWithoutDetails() {
	const products = Product.find({ 
		details: false, 
		sold: false 
	});
	return products;
}

export async function findProductByID(id) {
	const product = Product.findOne({
    id: id
	});
	return product;
}

export async function updateById(id, data) {
	const result = await Product.findOneAndUpdate({ id: id }, data);
}

export async function getIdFromStoreName(id) {
	return getUserIdFromUsername(id);
}