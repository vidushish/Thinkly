import "dotenv/config";

const getGeminiResponse = async (message) => {
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.Thinkly_key}`,
		},
		body: JSON.stringify({
			model: "gemini-3.5-flash",
			messages: [
				{
					role: "user",
					content: message,
				},
			],
		}),
	};
	try {
		const response = await fetch(
			"https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
			options,
		);
		const data = await response.json();
		console.log(data);
		if (data.error) {
			throw new Error(data.error.message);
		}
		return data.choices[0].message.content;
	} catch (err) {
		console.log(err);
	}
};

export default getGeminiResponse;
