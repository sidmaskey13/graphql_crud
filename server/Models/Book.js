const mongoose = require('mongoose');
const schema = mongoose.Schema;

const BookSchema = new schema({
    name: { type: String },
    genre: { type: String },
    // author_id: { type: String },
    author_id: { type: schema.Types.ObjectId, ref: 'author' },
    // sender: { type: schema.Types.ObjectId, ref: 'user' },

});
module.exports = Book = mongoose.model('book', BookSchema);
