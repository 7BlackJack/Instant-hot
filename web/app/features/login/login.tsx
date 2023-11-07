import React from "react";
import Head from "next/head";

const login: React.FC = () => {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center py-2">
			<Head>
				<title>ChatGPT</title>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</Head>

			<main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
				<h1 className="text-6xl font-bold">
					Help me pick{" "}
					<span className="text-blue-600">an outfit</span> that will
					look good on camera
				</h1>

				<div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
					<a
						href="/login"
						className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
					>
						<h3 className="text-2xl font-bold">Log in &rarr;</h3>
					</a>

					<a
						href="/signup"
						className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
					>
						<h3 className="text-2xl font-bold">Sign up &rarr;</h3>
					</a>
				</div>
			</main>

			<footer className="flex h-24 w-full items-center justify-center border-t">
				<a
					className="flex items-center justify-center gap-4"
					href="https://openai.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{" "}
					<img
						src="/openai-logo.svg"
						alt="OpenAI Logo"
						className="h-4"
					/>
				</a>
			</footer>
		</div>
	);
};

export default login;
