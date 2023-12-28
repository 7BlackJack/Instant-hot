"use client";
import React, { useState } from "react";
import { loginUser, registerUser } from "@/app/api/userService"; // 假设这是封装好的API服务

export default function UserAuthPage() {
	const [isLoginMode, setIsLoginMode] = useState(true);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const formTitle = isLoginMode
		? "Sign in to your account"
		: "Create your account";

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = isLoginMode
				? await loginUser(username, password)
				: await registerUser(username, password);
			console.log(response); // 处理登录或注册后的操作
		} catch (error) {
			setErrorMessage("An error occurred.");
		}
	};

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<img
					className="mx-auto h-10 w-auto"
					src="/images/ToolsLogo.png"
					alt="Logo"
				/>
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					{formTitle}
				</h2>
			</div>
			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form
					onSubmit={handleFormSubmit}
					className="space-y-6"
				>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						className="block w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
						placeholder="Username"
					/>

					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className="block w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
						placeholder="Password"
					/>

					<button
						type="submit"
						className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						{isLoginMode ? "Sign in" : "Sign up"}
					</button>
					{errorMessage && (
						<p className="text-red-500 text-center">
							{errorMessage}
						</p>
					)}
				</form>
				<div className="mt-6 text-center">
					<button
						onClick={() => setIsLoginMode(!isLoginMode)}
						className="text-indigo-600 hover:text-indigo-500"
					>
						{isLoginMode
							? "Need an account? Sign up"
							: "Have an account? Sign in"}
					</button>
				</div>
			</div>
		</div>
	);
}
