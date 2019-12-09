var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: String },
    genre: { type: String },
    num_copy: { type: Number },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: "Author",
        required: true
    }
})
module.exports = mongoose.model("Book", BookSchema);
