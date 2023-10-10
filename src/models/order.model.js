import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
    {
        order: { type: Object, required: true },
        cart: { type: Array, required: true },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Order', OrderSchema);
