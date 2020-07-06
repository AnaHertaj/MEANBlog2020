const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        //id: Number,
        titulo: String,
        categoria: String,
        contenido: String,
        url_imagen: String
    }
);

module.exports = mongoose.model('post', postSchema);
