# E-Commerce Backend API

This project is a RESTful API for an e-commerce system built with Node.js, Express, and Sequelize ORM connecting to a MySQL database.

---

## Table of Contents
1. [Project Structure](#project-structure)
2. [Database Schema](#database-schema)
3. [Setup Instructions](#setup-instructions)
4. [API Endpoints](#api-endpoints)
5. [Environment Variables](#environment-variables)
6. [Technologies Used](#technologies-used)

---

## Database Schema

The application uses the following database tables:

- **Users**: User accounts (`id`, `username`, `email`, `created_at`)
- **Categories**: Product categories (`id`, `name`)
- **Products**: Store products (`id`, `title`, `price`, `category_id`, `stock`)
- **Orders**: Customer orders (`id`, `user_id`, `total`, `status`, `created_at`)
- **OrderDetails**: Products within orders (`order_id`, `product_id`, `quantity`, `price`)

---

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a MySQL database.

4. Create a `.env` file with required environment variables (see [Environment Variables](#environment-variables)).

5. Run the application:
   ```bash
   npm start
   ```

---

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PATCH /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create new category
- `PATCH /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id` - Update order status
- `DELETE /api/orders/:id` - Delete order

### Order Details
- `GET /api/orderDetails` - Get all order details
- `GET /api/orderDetails/:id` - Get order detail by ID
- `POST /api/orderDetails` - Add product to order
- `PATCH /api/orderDetails/:orderId/:productId` - Update order detail
- `DELETE /api/orderDetails/:id` - Delete order detail

---

## Environment Variables

Create a `.env` file in the root directory and include the following variables:
```env
DB_HOST=your_mysql_host
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
PORT=your_app_port
```

Replace the placeholders with your actual credentials and configuration.

---

## Technologies Used

- **Node.js**
- **Express.js**
- **Sequelize**
- **MySQL**
- **Express Validator**
