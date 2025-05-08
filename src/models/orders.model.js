import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Order = sequelize.define('Orders', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    status: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        default: DataTypes.NOW
    },
}, {
    tableName: 'orders',
    timestamps: false
});

export default Order;