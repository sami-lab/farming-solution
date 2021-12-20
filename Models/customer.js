const mongoose = require("mongoose");


var CustomerSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A Customer must have name'],
        },
        phone: {
            type: String,
            required: [true, 'A Customer must have Phone'],
        },
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            require: [true, 'Customer Must have a UserID']
        },
        address: {
            country: {
                type: String,
                required: [true, "An address must contain Country field"]
            },
            state: {
                type: String,
                required: [true, "An address must contain State field"]
            },
            city: {
                type: String,
                required: [true, "An address must contain city field"]
            },
            postalCode: {
                type: String,
                required: [true, "An address must contain postal code field"]
            },
            street: {
                type: String,
                required: [true, "An address must contain Complete Street address"]
            }
        },
    }
);

const  Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;
