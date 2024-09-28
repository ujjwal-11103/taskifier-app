import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);

export default Item;
