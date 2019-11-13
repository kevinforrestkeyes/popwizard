import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProductsSchema = new Schema({
  id: String,
  slug: String,
	price: Number,
	size: String,
	images: [String],
	sold: Boolean,
	details: Boolean,
});

export default mongoose.model('Product', ProductsSchema);