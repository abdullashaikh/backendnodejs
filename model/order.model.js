const mongoose = require("../config/mogo-connection");
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    order_id: Schema.Types.Number,
    item_name: Schema.Types.String,
    cost: Schema.Types.Number,
    order_date: Schema.Types.Date,
    delivery_date: Schema.Types.Date
});

const Order = mongoose.model('orders', orderSchema);
module.exports = Order;