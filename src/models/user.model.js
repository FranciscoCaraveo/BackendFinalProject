import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    created_at: {
        type: DataTypes.DATE,
        default: DataTypes.NOW
    },
}, {
    tablename: 'Users',
    timestamps: false
});

export default User;