import React, { useState, useRef } from "react";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCopy,
	faExchangeAlt,
	faArrowCircleUp,
	faArrowCircleDown,
	faArrowsAltH,
} from "@fortawesome/free-solid-svg-icons";

const base64_convert: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [message, setMessage] = useState("");
  const outputRef = useRef(null);

  const encode = () => {
		const encodedData = btoa(input);
		setOutput(encodedData);
		setMessage(
			`编码完成，原文本字节数：${input.length}，编码后字节数：${encodedData.length}`
		);
  };

  const decode = () => {
		try {
			const decodedData = atob(input);
			setOutput(decodedData);
			setMessage(
				`解码完成，原编码字节数：${input.length}，解码后字节数：${decodedData.length}`
			);
		} catch (e) {
			setOutput("");
			setMessage("错误: 输入的字符串不是有效的 Base64 编码。");
		}
  };

  const copyToClipboard = (text:any) => {
		navigator.clipboard.writeText(text).then(
			() => {
				setMessage("编码结果已复制到剪贴板。");
			},
			() => {
				setMessage("复制到剪贴板失败。");
			}
		);
  };

  const swapValues = () => {
		setInput(output);
		setOutput(input);
  };

  return (
		<div className="container mx-auto p-4">
			<Head>
				<title>Base64 编码解码工具</title>
			</Head>

			<h1 className="text-2xl font-bold text-center mb-4">
				Base64 编码解码工具
			</h1>

			<div className="mb-2">
				<textarea
					className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
					rows={4}
					placeholder="请输入文本"
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
			</div>

			<div className="flex justify-center gap-4 mb-4">
				<button
					className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none flex items-center"
					onClick={encode}
				>
					<FontAwesomeIcon
						icon={faArrowCircleUp}
						className="mr-2"
					/>{" "}
					编码
				</button>
				<button
					className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none flex items-center"
					onClick={decode}
				>
					<FontAwesomeIcon
						icon={faArrowCircleDown}
						className="mr-2"
					/>{" "}
					解码
				</button>
				<button
					className="px-4 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-700 focus:outline-none flex items-center"
					onClick={swapValues}
				>
					<FontAwesomeIcon
						icon={faArrowsAltH}
						className="mr-2"
					/>{" "}
					交换值
				</button>
			</div>

			<div className="mb-2">
				<textarea
					ref={outputRef}
					className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
					rows={4}
					value={output}
					readOnly
				/>
			</div>

			<div className="flex justify-center gap-4 mb-4">
				{output && (
					<button
						className="px-4 py-2 text-white bg-purple-500 rounded hover:bg-purple-700 focus:outline-none flex items-center"
						onClick={() => copyToClipboard(output)}
					>
						<FontAwesomeIcon
							icon={faCopy}
							className="mr-2"
						/>{" "}
						复制结果
					</button>
				)}
			</div>

			{message && (
				<div
					className="px-4 py-3 leading-normal text-blue-700 bg-blue-100 border border-blue-400 rounded-lg"
					role="alert"
				>
					<p>{message}</p>
				</div>
			)}
		</div>
  );
};

export default base64_convert;
