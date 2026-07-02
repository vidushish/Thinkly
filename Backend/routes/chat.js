import express from "express";
import Thread from "../models/Thread.js";
import getGeminiResponse from "../utils/gemini.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/thread", auth, async (req, res) => {
	try {
		const threads = await Thread.find({
			userId: req.user.userId,
		}).sort({ updatedAt: -1 });
		res.json(threads);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Failed to fetch in DB" });
	}
});

router.get("/thread/:threadId", auth, async (req, res) => {
	const { threadId } = req.params;

	try {
		const thread = await Thread.findOne({ threadId });

		if (!thread) {
			res.status(404).json({ error: "Thread not found" });
		}

		res.json(thread.messages);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Failed to fetch in DB" });
	}
});

router.delete("/thread/:threadId", auth, async (req, res) => {
	const { threadId } = req.params;

	console.log("DELETE REQUEST:", threadId);

	try {
		const thread = await Thread.findOne({ threadId });
		console.log("FOUND:", thread);

		const deleteThread = await Thread.findOneAndDelete({ threadId });

		if (!deleteThread) {
			return res.status(404).json({ error: "Thread not found" });
		}

		res.json({ message: "Deleted Successfully" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Failed to delete in DB" });
	}
});

router.post("/chat", auth, async (req, res) => {
	const { threadId, message } = req.body;

	if (!threadId || !message) {
		res.status(400).json({ error: "Missing required fields" });
	}
	try {
		let thread = await Thread.findOne({ threadId });

		if (!thread) {
			thread = new Thread({
				userId: req.user.userId,
				threadId,
				title: message,
				messages: [
					{
						role: "user",
						content: message,
					},
				],
			});
		} else {
			thread.messages.push({ role: "user", content: message });
		}
		const assistantReply = await getGeminiResponse(message);

		if (!assistantReply) {
			return res.status(500).json({
				error: "Gemini failed to generate response",
			});
		}

		thread.messages.push({
			role: "assistant",
			content: assistantReply,
		});
		thread.updatedAt = new Date();

		await thread.save();
		res.json({ reply: assistantReply });
	} catch (err) {
		console.log("Gemini Error:", err.message);
		res.status(500).json({ error: "something went wrong" });
		return null;
	}
});

export default router;
