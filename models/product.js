import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProductsSchema = new Schema({
  id: String,
	storeID: String,
	slug: String,
	description: String,
	price: Number,
	size: String,
	images: [String],
	sold: Boolean,
	details: Boolean,
	timestamp: String,
});

export default mongoose.model('Product', ProductsSchema);