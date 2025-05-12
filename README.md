E-Commerce Backend API
This project is a RESTful API for an e-commerce system built with Node.js, Express, and Sequelize ORM connecting to a MySQL database.

- Table of Contents
- Project Structure
- Database Schema
- Setup Instructions
- API Endpoints
- Environment Variables

Database Schema
The application uses the following database tables:

Users: User accounts (id, username, email, created_at)
Categories: Product categories (id, name)
Products: Store products (id, title, price, category_id, stock)
Orders: Customer orders (id, user_id, total, status, created_at)
OrderDetails: Products within orders (order_id, product_id, quantity, price)

Setup Instructions
  1. Clone the repository
  2. Install dependencies:

npm install

  3. Create a MySQL database
  4. Create a .env file with required environment variables (see below)
  2. Run the application

API Endpoints
Users
- GET /api/users - Get all users
- GET /api/users/:id - Get user by ID
- POST /api/users - Create new user
- PATCH /api/users/:id - Update user
- DELETE /api/users/:id - Delete user

Products
- GET /api/products - Get all products
- GET /api/products/:id - Get product by ID
- POST /api/products - Create new product
- PATCH /api/products/:id - Update product
- DELETE /api/products/:id - Delete product

Categories
- GET /api/categories - Get all categories
- GET /api/categories/:id - Get category by ID
- POST /api/categories - Create new category
- PATCH /api/categories/:id - Update category
- DELETE /api/categories/:id - Delete category

Orders
- GET /api/orders - Get all orders
- GET /api/orders/:id - Get order by ID
- POST /api/orders - Create new order
- PATCH /api/orders/:id - Update order status
- DELETE /api/orders/:id - Delete order

Order Details
- GET /api/orderDeta - Get all order details
- GET /api/orderDeta/:id - Get order detail by ID
- POST /api/orderDeta - Add product to order
- PATCH /api/orderDeta/:orderId/:productId - Update order detail
- DELETE /api/orderDeta/:id - Delete order detail

Technologies Used
- Node.js
- Express.js
- Sequelize 
- MySQL
- Express Validator

