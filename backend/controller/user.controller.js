// creating a controller to keep the list of the user in the database

import User from '../models/user.model.js';

export async function getUserList(req, res) {
    try {
        const users = await User.find({}, '-password'); // Exclude password field
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching user list:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
// This function retrieves the list of users from the database and excludes the password field for security.
// It handles errors and returns a 500 status code if something goes wrong.
// The user list is returned as a JSON response with a 200 status code.