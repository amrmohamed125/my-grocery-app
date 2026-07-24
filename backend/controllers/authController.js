const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "my_secret_key_12345";

exports.register = async (req , res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({message: 'this email is already signin'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, {expiresIn: '7d'});

        res.status(201).json({
            message: 'this account is created',
            token,
            user: {id: user._id, name: user.name, email: user.email}
        });
    } catch (error) {
        res.status(500).json({
            message: 'failed to create account',
            error: error.message
        });
    }
};

exports.login = async (req , res) => {
    const { email , password } = req.body;

    try {
        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({message: 'this email or password is wrong'});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({message: 'this email or password is wrong'});
        }

        const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: '7d'});

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {id: user._id, name: user.name, email: user.email}
        });
    } catch (error) {
        res.status(500).json({message: 'Login failed' , error: error.message});
    }
};