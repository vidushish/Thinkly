import "./Sidebar.css";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";

function Sidebar() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const API_URL = import.meta.env.VITE_API_URL;
	const {
		allThreads,
		setAllThreads,
		currThreadId,
		setNewChat,
		setPrompt,
		setReply,
		setCurrThreadId,
		setPrevChats,
	} = useContext(MyContext);

	const getAllThreads = async () => {
		try {
			const response = await fetch(`${API_URL}/api/thread`, {
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			});
			const res = await response.json();
			const filteredData = res.map((thread) => ({
				threadId: thread.threadId,
				title: thread.title,
			}));
			setAllThreads(filteredData);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getAllThreads();
	}, [currThreadId]);

	const createNewChat = () => {
		setNewChat(true);
		setPrompt("");
		setReply(null);
		setCurrThreadId(uuidv1());
		setPrevChats([]);
		if (window.innerWidth <= 768) {
			setSidebarOpen(false);
		}
	};

	const changeThread = async (newThreadId) => {
		setCurrThreadId(newThreadId);
		if (window.innerWidth <= 768) {
			setSidebarOpen(false);
		}
		try {
			const response = await fetch(
				`${API_URL}/api/thread/${newThreadId}`,
				{
					headers: {
						Authorization: localStorage.getItem("token"),
					},
				},
			);
			const res = await response.json();
			setPrevChats(res);
			setNewChat(false);
			setReply(null);
		} catch (err) {
			console.log(err);
		}
	};

	const deleteThread = async (threadId) => {
		try {
			const response = await fetch(`${API_URL}/api/thread/${threadId}`, {
				method: "DELETE",
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			});
			const res = await response.json();
			setAllThreads((prev) =>
				prev.filter((thread) => thread.threadId !== threadId),
			);

			if (threadId === currThreadId) {
				createNewChat();
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<button
				className="menu-btn"
				onClick={() => setSidebarOpen(true)}
			>
				☰
			</button>

			{sidebarOpen && (
				<div
					className="overlay"
					onClick={() => setSidebarOpen(false)}
				></div>
			)}

			<section className={`sidebar ${sidebarOpen ? "open" : ""}`}>
				<button onClick={createNewChat}>
					<span>
						<i className="fa-brands fa-openai"></i>
					</span>
					<span>
						<i className="fa-regular fa-pen-to-square"></i>
					</span>
				</button>

				<ul className="history">
					{allThreads?.map((thread, idx) => (
						<li
							key={idx}
							onClick={(e) => changeThread(thread.threadId)}
							className={
								thread.threadId === currThreadId
									? "highlighted"
									: " "
							}
						>
							{thread.title}
							<i
								className="fa-regular fa-trash-can"
								onClick={(e) => {
									e.stopPropagation();
									deleteThread(thread.threadId);
								}}
							></i>
						</li>
					))}
				</ul>

				<div className="sign">
					<p>By Vidushi Sharma &hearts;</p>
				</div>
			</section>
		</>
	);
}

export default Sidebar;
