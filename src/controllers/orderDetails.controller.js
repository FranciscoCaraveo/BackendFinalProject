import OrderDetail from '../models/ordersDetail.model.js';
import Order from '../models/orders.model.js';
import Product from '../models/products.model.js';

export const getOrderDetails = async (req, res) => {
    const orderDetails = await OrderDetail.findAll();
    res.json(orderDetails);
}

export const getOrderDetail = async (req, res) => {
    const { id } = req.params;
    const orderDetails = await OrderDetail.findByPk(id);
    if (!orderDetails) {
        return res.status(400).send({ message: 'Client not found' });
    }
    res.json(orderDetails);
}

//Create Order Detail
export const createOrderDetail = async (req, res) => {
    try {
        const { order_id, product_id, quantity, price } = req.body;
        

        const orderExists = await Order.findByPk(order_id);
        if (!orderExists) {
            return res.status(404).json({ 
                message: "La orden especificada no existe"
            });
        }
        

        const productExists = await Product.findByPk(product_id);
        if (!productExists) {
            return res.status(404).json({ 
                message: "El producto especificado no existe" 
            });
        }
        
 
        const existingDetail = await OrderDetail.findOne({
            where: {
                order_id,
                product_id
            }
        });
        
        if (existingDetail) {
            return res.status(400).json({ 
                message: "Este producto ya existe en esta orden", 
                orderDetail: existingDetail 
            });
        }
        
 
        const newOrderDetail = await OrderDetail.create({
            order_id,
            product_id,
            quantity,
            price
        });

        res.status(201).json({
            message: "Order detail created successfully",
            orderDetail: newOrderDetail
        });
    } catch (error) {
        console.error("Error creating order detail:", error);
        res.status(500).json({ message: "Failed to create order detail", error: error.message });
    }
}



// Update Order Detail (PATCH)
export const updateOrderDetail = async (req, res) => {
    try {
        
        const { orderId, productId } = req.params;
        const { quantity, price } = req.body;

        const orderDetail = await OrderDetail.findOne({
            where: {
                order_id: orderId,
                product_id: productId
            }
        });

        if (!orderDetail) {
            return res.status(404).json({ message: 'Order detail not found' });
        }


        const updateFields = {};
        if (quantity !== undefined) updateFields.quantity = quantity;
        if (price !== undefined) updateFields.price = price;

        await orderDetail.update(updateFields);

        res.json({
            message: 'Order detail updated successfully',
            orderDetail
        });
    } catch (error) {
        console.error("Error updating order detail:", error);
        res.status(500).json({ message: "Failed to update order detail", error: error.message });
    }
}

//Delete order
export const deleteOrderDetail = async (req, res) => {
    try {
        const { id } = req.params;

        const orderDetails = await OrderDetail.findByPk(id);

        if (!orderDetails) {
            return res.status(404).json({ message: 'Details of order not found' });
        }

        await orderDetails.destroy();

        res.json({ message: 'Order deleted successfully' });

    } catch (error) {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({
                message: "No puede cambiar ya que es otra llave foranea de otra tabla",
                details: "La categoría especificada no existe o está siendo utilizada por otra entidad."
            })
        }
        console.error("Error deleting order:", error);
        res.status(500).json({ message: "Failed to delete order", error: error.message });
    }
}