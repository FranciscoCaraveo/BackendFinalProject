import Categories from "./category.model.js";
import User from "./user.model.js";
import Products from "./products.model.js";
import Orders from "./orders.model.js";
import OrderDetail from "./user.model.js";

User.hasMany(Orders, { foreignKey: 'user_id' });
Orders.belongsTo(User, { foreignKey: 'user_id' });

Categories.hasMany(Products, { foreignKey: 'category_id' });
Products.belongsTo(Categories, { foreignKey: 'category_id' });

Orders.belongsToMany(Products, {
    through: OrderDetail,
    foreignKey: 'order_id',
    otherKey: 'product_id',
    as: 'products'
});

Products.belongsToMany(Orders, {
    through: OrderDetail,
    foreignKey: 'order_id',
    otherKey: 'product_id',
    as: 'orders'
});

console.log("Sequelize associations defined."); 