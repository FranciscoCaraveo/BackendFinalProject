import Orders from '../models/orders.model.js';

//GetAllUsers
export const getOrders = async (req, res) => {
    const orders = await Orders.findAll();
    res.json(orders);
}

//GetUserById
export const getOrder = async (req, res) => {
    const { id } = req.params;
    const orders = await Orders.findByPk(id);
    if (!orders) {
        return res.status(400).send({ message: 'Client not found' });
    }
    res.json(orders);
}

// Create Order
export const createOrder = async (req, res) => {
    try {
        const { total, status, user_id } = req.body;

        const newOrder = await Orders.create({
            user_id,
            total,
            status,
            created_at: new Date()
        });

        res.status(201).json({
            message: "Order created successfully",
            order: newOrder
        });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Failed to create order", error: error.message });
    }
}

// Update Order Status
export const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await Orders.findByPk(id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        await order.update({ status });

        res.json({ message: 'Order updated successfully', order });
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ message: "Failed to update order", error: error.message });
    }
}

//Delete Order
export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Orders.findByPk(id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        await order.destroy();

        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({
                message: "Cannot delete because it is a foreign key in another table",
                details: "The specified category does not exist or is being used by another entity."
            })
        }
        console.error("Error deleting order:", error);
        res.status(500).json({ message: "Failed to delete order", error: error.message });
    }
}