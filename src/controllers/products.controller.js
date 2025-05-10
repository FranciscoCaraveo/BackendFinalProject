import Products from '../models/products.model.js';
import OrderDetail from '../models/ordersDetail.model.js';

//Get All Produts
export const getProducts = async (req, res) => {
    const product = await Products.findAll();
    res.json(product);
}

//Get Prodcut By Id
export const getProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Products.findByPk(id);
    if (!product) {
        return res.status(404).send({ message: 'Product not found' });
    }
    res.json(product);
}

//Create Product
export const insertProduct = async (req, res) => {
    try {
        const { title, price, category_id, stock } = req.body;

        const newProduct = await Products.create({
            title,
            price,
            category_id,
            stock,
        });
        res.status(201).json(newProduct);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                message: 'Product already exists',
                fields: error.errors.map(e => e.path)
            });
        }

        console.error("Error creating product: ", error);
        res.status(500).json({ message: "Failed to create product", error: error.message });


    }
}

//Delete Product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(404).json({ meszsage: "Favor de introducir ID" });
        }

        const product = await Products.findByPk(id);

        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }

        const orderDetails = await OrderDetail.findAll({
            where: { product_id: id }
        });

        if (orderDetails.length > 0) {
            return res.status(400).json({
                message: 'Cannot delete product because it is associated with orders',
                orderCount: orderDetails.length
            });
        }

        await product.destroy();

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error("Error deleting product: ", error);
        res.status(500).json({ message: 'Failded to delete Product :(', error: error.message })

    }
}

//Update Product
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Favor de introducir ID" });
        }

      
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ 
                message: "El cuerpo de la petición está vacío",
                details: "Debe proporcionar al menos un campo para actualizar (title, price, category_id o stock)"
            });
        }

        const { title, price, category_id, stock } = req.body;

        const product = await Products.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

       
        await product.update({
            title: title ?? product.title,
            price: price ?? product.price,
            category_id: category_id ?? product.category_id,
            stock: stock ?? product.stock
        });

        res.json({ message: 'Product updated successfully', product });
    } catch (error) {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(404).json({
                message: "No puede cambiar ya que es otra llave foranea de otra tabla",
                details: "La categoría especificada no existe o está siendo utilizada por otra entidad."
            });
        }
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Failed to update product", error: error.message });
    }
}

