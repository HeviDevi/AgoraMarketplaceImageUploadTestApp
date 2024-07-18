const mongoose = require('mongoose');
const imageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image_public_id: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;