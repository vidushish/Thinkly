import { useState } from "react";
import "./Auth.css";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";


function Auth() {
	const API_URL = import.meta.env.VITE_API_URL;
	const [isLogin, setIsLogin] = useState(true);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		const url = isLogin
			? `${API_URL}/api/auth/login`
			: `${API_URL}/api/auth/signup`;

		const body = isLogin ? { email, password } : { name, email, password };

		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});

			const data = await response.json();

			if (!response.ok) {
				toast.error(data.message);
				return;
			}

			if (isLogin) {
				localStorage.setItem("token", data.token);

				toast.success(`Welcome back, ${data.name}!`);

				setTimeout(() => {
					window.location.reload();
				}, 1000);
			} else {
				toast.success("Account created successfully!");

				setName("");
				setEmail("");
				setPassword("");

				setIsLogin(true);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Toaster
				position="top-center"
				toastOptions={{
					style: {
						background: "#202123",
						color: "#fff",
					},
				}}
			/>
			<div className="authPage">
				<div className="authCard">
					<h1>Thinkly</h1>
					<p>{isLogin ? "Welcome back" : "Create your account"}</p>

					<form onSubmit={handleSubmit}>
						{!isLogin && (
							<input
								type="text"
								placeholder="Full Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						)}

						<input
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>

						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						<button type="submit">
							{isLogin ? "Login" : "Sign Up"}
						</button>
					</form>

					<span
						className="switchAuth"
						onClick={() => setIsLogin(!isLogin)}
					>
						{isLogin
							? "Don't have an account? Sign Up"
							: "Already have an account? Login"}
					</span>
				</div>
			</div>
		</>
	);
}

export default Auth;
