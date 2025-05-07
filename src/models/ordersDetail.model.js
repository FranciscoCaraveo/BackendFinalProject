import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const OrderDetail = sequelize.define('orderdetails', {
    order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Orders',
            key: 'id'
        }
    },
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Products',
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'orderdetails',
    timestamps: false
});

export default OrderDetail;