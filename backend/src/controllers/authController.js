const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Administrator, ActivityLog } = require('../models');
const { ValidationError } = require('sequelize');

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role_id },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// Register new user
const register = async (req, res) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      phone,
      department,
      accessLevel
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // Start transaction
    const result = await sequelize.transaction(async (t) => {
      // Create user
      const user = await User.create({
        email,
        password_hash: hashedPassword,
        role_id: 1, // Admin role
        status: 'active'
      }, { transaction: t });

      // Create administrator profile
      const admin = await Administrator.create({
        id: user.id,
        first_name: firstName,
        last_name: lastName,
        phone,
        department,
        access_level: accessLevel
      }, { transaction: t });

      // Log activity
      await ActivityLog.create({
        user_id: user.id,
        action_type: 'REGISTER',
        description: 'New administrator account created',
        ip_address: req.ip
      }, { transaction: t });

      return { user, admin };
    });

    const token = generateToken(result.user);

    res.status(201).json({
      token,
      user: {
        id: result.user.id,
        email: result.user.email,
        role: result.user.role_id,
        status: result.user.status,
        administrator: result.admin
      }
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ error: error.message });
    }
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ 
      where: { email },
      include: [{ model: Administrator }]
    });

    if (!user || !await bcrypt.compare(password, user.password_hash)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (user.status !== 'active') {
      return res.status(401).json({ error: 'Account is not active' });
    }

    const token = generateToken(user);

    // Update last login
    await user.update({ last_login: new Date() });

    // Log activity
    await ActivityLog.create({
      user_id: user.id,
      action_type: 'LOGIN',
      description: 'User logged in successfully',
      ip_address: req.ip
    });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role_id,
        status: user.status,
        administrator: user.Administrator
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get current user profile
const getProfile = async (req, res) => {
  try {
    res.json({
      message: 'Profile retrieved successfully',
      user: req.user.getPublicProfile()
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error getting profile',
      error: error.message 
    });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['profile', 'businessInfo', 'courierInfo', 'availability', 'workingHours'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).json({ message: 'Invalid updates' });
  }

  try {
    updates.forEach(update => {
      req.user[update] = req.body[update];
    });

    await req.user.save();

    res.json({
      message: 'Profile updated successfully',
      user: req.user.getPublicProfile()
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error updating profile',
      error: error.message 
    });
  }
};

// Change password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Check current password
    const isMatch = await req.user.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Update password
    req.user.password = newPassword;
    await req.user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error changing password',
      error: error.message 
    });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword
}; 