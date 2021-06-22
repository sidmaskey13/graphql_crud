const mongoose = require('mongoose');
const schema = mongoose.Schema;

const authorSchema = new schema({
    name: { type: String },
    age: { type: Number },
    // sender: { type: schema.Types.ObjectId, ref: 'user' },
});
module.exports = Author = mongoose.model('author', authorSchema);
