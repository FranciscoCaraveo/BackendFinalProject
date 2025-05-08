import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Categories',
            key: 'id'
        }
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'products',
    timestamps: false
});

export default Product;