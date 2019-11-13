import mongoose from 'mongoose';
const dotenv = require('dotenv').config();

mongoose.connect(process.env.DBURI);
mongoose.set('useFindAndModify', false);
const db = mongoose.connection;
db.on('error',console.error.bind(console, 'mongodb connection error'));

export default db;