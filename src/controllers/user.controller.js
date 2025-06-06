import Users from '../models/user.model.js';

//GetAllUsers
export const getUsers = async (req, res) => {
    const users = await Users.findAll();
    res.json(users);
}

//GetUserById
export const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await Users.findByPk(id);
    if (!user) {
        return res.status(400).send({ message: 'Client not found' });
    }
    res.json(user);
}

//CreateUser
export const createUser = async (req, res) => {
    try {
        const { username, email } = req.body;

        const newUser = await Users.create({
            username,
            email,
            created_at: new Date()
        });
        res.status(201).json(newUser);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                message: "Username or email already exist",
                fields: error.errors.map(e => e.path)
            });
        }

        console.error("Error creating user: ", error);
        res.status(500).json({ message: "Failed to create user", error: error.message });
    }
}

//Delete User
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Please Provide an  ID" });
        }

        const user = await Users.findByPk(id);

        if (!user) {
            return res.status(404).send({ message: 'Users not found' });
        }

        await user.destroy();

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error("Error deleting user: ", error);
        res.status(500).json({ message: "Failed to delete user", error: error.message });
    }
}

//Update User
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Please provide an ID" });
        }

        // Validación del body
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ 
                message: "The request body is empty",
                details: "You must provide at least one field to update (username or email)"
            });
        }

        const { username, email } = req.body;

        // Validación de campos específicos
        if (!username && !email) {
            return res.status(400).json({
                message: "Invalid update data",
                details: "You must provide at least username or email to update"
            });
        }

        const user = await Users.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.update({
            username: username || user.username,
            email: email || user.email
        });

        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                message: "Username or email already exists",
                fields: error.errors.map(e => e.path)
            });
        }

        console.error("Error updating user: ", error);
        res.status(500).json({ message: "Failed to update user", error: error.message });
    }
}


