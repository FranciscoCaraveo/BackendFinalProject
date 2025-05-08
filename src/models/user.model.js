import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,        
    },
    created_at: {
        type: DataTypes.DATE,
        default: DataTypes.NOW
    },
}, {
    tableName: 'users',
    timestamps: false
});

export default User;