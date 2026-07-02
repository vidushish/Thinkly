import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
	try {
		const { name, email, password } = req.body;

		const userExists = await User.findOne({ email });

		if (userExists) {
			return res.status(400).json({
				message: "User already exists",
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		await User.create({
			name,
			email,
			password: hashedPassword,
		});

		res.status(201).json({
			message: "Signup successful",
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: "Something went wrong",
		});
	}
});

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({
				message: "Invalid credentials",
			});
		}

		const match = await bcrypt.compare(password, user.password);

		if (!match) {
			return res.status(400).json({
				message: "Invalid credentials",
			});
		}

		const token = jwt.sign(
			{
				userId: user._id,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: "7d",
			},
		);

		res.json({
			token,
			userId: user._id,
			name: user.name,
		});
	} catch (err) {
		console.log(err);
	}
});

export default router;
