const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const UserSchema = require('../models/User');
const passport = require('passport');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'thisiscodeformediclapplicationwhich isbuiltinreactappproject';

// Configure session middleware
router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
    },
}));

// Initialize passport
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser((user, cb) => cb(null, user.id));
passport.deserializeUser((id, cb) => cb(null, id));

// Route 1: Register a New User
router.post('/register', [
    body('email', "Please Enter a Valid Email").isEmail(),
    body('name', "Username should be at least 4 characters").isLength({ min: 4 }),
    body('password', "Password should be at least 8 characters").isLength({ min: 8 }),
    body('phone', "Phone number should be 10 digits").isLength({ min: 10 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation Error:", errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const existingUser = await UserSchema.findOne({ email: req.body.email });
        if (existingUser) {
            console.log("User already exists with email:", req.body.email);
            return res.status(409).json({ error: "A user with this email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = await UserSchema.create({
            email: req.body.email,
            name: req.body.name,
            password: hashedPassword,
            phone: req.body.phone,
            createdAt: Date(),
        });

        const payload = { user: { id: newUser.id } };
        const authToken = jwt.sign(payload, JWT_SECRET);
        res.json({ authToken });

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route 2: Login a User
router.post('/login', [
    body('email', "Please Enter a Valid Email").isEmail(),
    body('password', "Password is required").exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation errors:", errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await UserSchema.findOne({ email: req.body.email });

        if (!user) {
            console.log("User not found:", req.body.email);
            return res.status(404).json({ error: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordValid) {
            console.log("Invalid password for email:", req.body.email);
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const payload = { user: { id: user.id } };
        const authToken = jwt.sign(payload, JWT_SECRET);

        res.status(200).json({ authToken });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route 3: Fetch User Data
router.get('/user', async (req, res) => {
    try {
        const email = req.header('Email');
        const user = await UserSchema.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({
            name: user.name,
            email: user.email,
            phone: user.phone,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Route 4: Update User Data
router.put('/user', async (req, res) => {
    try {
        const email = req.header('Email');
        const { name, phone } = req.body;

        const user = await UserSchema.findOneAndUpdate(
            { email },
            { $set: { name, phone } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({
            name: user.name,
            email: user.email,
            phone: user.phone,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
