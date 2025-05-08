import Category from "../models/category.model.js";

export const getCategories = async (req, res) => {
    const category = await Category.findAll();
    res.json(category);
}

export const getCategory = async (req, res) => {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
        return res.status(400).send({ message: 'Client not found' });
    }
    res.json(category);
}


export const createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const newCategory = await Category.create({
            name,
        });
        res.status(201).json(newCategory);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                message: "Category already exist",
                fields: error.errors.map(e => e.path)
            });
        }
        console.error('Error creating category :(', error);
        res.status(500).json({ message: 'Failded to create categort', error: error.message });
    }

}

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Favor de introducir ID" });
        }

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).send({ message: 'Category not found' });
        }

        await category.destroy();

        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error("Error deleting Category: ", error);
        res.status(500).json({ message: "Failed to delete Category", error: error.message });
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Favor de introducir ID" });
        }

        const { name } = req.body;

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        await category.update({
            name: name || category.name
        });
        res.json({ message: 'Category updated succesfully', category });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                message: "Category already exist",
                fields: error.errors.map(e => e.path)
            });
        }
        console.error('Error creating category :(', error);
        res.status(500).json({ message: 'Failded to create categort', error: error.message });
    }
}