import "./Chat.css";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Chat() {
	const { prevChats, newChat, reply } = useContext(MyContext);
	const [latestReply, setLatestReply] = useState(null);

	const headings = [
		"How can Thinkly help today?",
		"What are you thinking about today?",
		"Your next answer is one question away.",
		"Curious? Let's dive in.",
		"Start a conversation with Thinkly.",
		"Let's turn ideas into answers.",
	];

	const [heading] = useState(
		headings[Math.floor(Math.random() * headings.length)],
	);

	useEffect(() => {
		if (reply === null) {
			setLatestReply(null);
			return;
		}

		if (!prevChats?.length) return;

		const content = reply.split(" ");

		let idx = 0;
		const interval = setInterval(() => {
			setLatestReply(content.slice(0, idx + 1).join(" "));

			idx++;
			if (idx >= content.length) clearInterval(interval);
		}, 40);

		return () => clearInterval(interval);
	}, [prevChats, reply]);

	return (
		<>
			{newChat && <h1 className="welcomeHeading">{heading}</h1>}
			<div className="chats">
				{prevChats?.slice(0, -1).map((chat, idx) => (
					<div
						className={
							chat.role === "user" ? "userDiv" : "thinklyDiv"
						}
						key={idx}
					>
						{chat.role === "user" ? (
							<p className="userMessage">{chat.content}</p>
						) : (
							<ReactMarkdown rehypePlugins={rehypeHighlight}>
								{chat.content}
							</ReactMarkdown>
						)}
					</div>
				))}

				{prevChats.length > 0 && (
					<>
						{latestReply === null ? (
							<div
								className="thinklyDiv"
								key={"typing"}
							>
								<ReactMarkdown rehypePlugins={rehypeHighlight}>
									{prevChats[prevChats.length - 1].content}
								</ReactMarkdown>
							</div>
						) : (
							<div
								className="thinklyDiv"
								key={"typing"}
							>
								<ReactMarkdown rehypePlugins={rehypeHighlight}>
									{latestReply}
								</ReactMarkdown>
							</div>
						)}
					</>
				)}
			</div>
		</>
	);
}

export default Chat;
