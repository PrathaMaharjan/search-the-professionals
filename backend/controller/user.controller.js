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

export async function searchUser(req, res) {
    try {
        const { username, role } = req.query;
        let query = {};
        if (username && username.trim() !== "") {
            query.username = { $regex: username, $options: "i" };
        }
        if (role && role.trim() !== "") {
            query.role = { $regex: role, $options: "i" };
        }
        const users = await User.find(query, "-password");
        res.json({ users });
    } catch (e) {
        res.status(500).json({ message: "Error searching users" });
    }
}

export async function getUserById(req, res) {
    try {
        const user = await User.findById(req.params.id, "-password"); // exclude password
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateUser(req, res) {
  try {
    const userId = req.user._id; // from auth middleware
    const { email, role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { email, role } },
      { new: true, select: '-password' }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}