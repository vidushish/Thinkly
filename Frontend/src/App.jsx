import "./App.css";
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import { MyContext } from "./MyContext.jsx";
import { useState } from "react";
import { v1 as uuidv1 } from "uuid";
import Auth from "./Auth";

function App() {
	const [prompt, setPrompt] = useState("");
	const [reply, setReply] = useState(null);
	const [currThreadId, setCurrThreadId] = useState(uuidv1());
	const [prevChats, setPrevChats] = useState([]);
	const [newChat, setNewChat] = useState(true);
	const [allThreads, setAllThreads] = useState([]);
	const token = localStorage.getItem("token");

	const providerValues = {
		prompt,
		setPrompt,
		reply,
		setReply,
		currThreadId,
		setCurrThreadId,
		prevChats,
		setPrevChats,
		newChat,
		setNewChat,
		allThreads,
		setAllThreads,
	};

	if (!token) {
		return <Auth />;
	}

	return (
		<div className="main">
			<MyContext.Provider value={providerValues}>
				<Sidebar />
				<ChatWindow />
			</MyContext.Provider>
		</div>
	);
}

export default App;
