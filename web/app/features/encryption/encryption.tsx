import React, { useState } from "react";
import CryptoJS from "crypto-js";
import forge from "node-forge";

// 加密和解密的模式和填充选项
const modes = {
  CBC: CryptoJS.mode.CBC,
  CFB: CryptoJS.mode.CFB,
  CTR: CryptoJS.mode.CTR,
  ECB: CryptoJS.mode.ECB,
  OFB: CryptoJS.mode.OFB
};
const paddings = {
  Pkcs7: CryptoJS.pad.Pkcs7,
  AnsiX923: CryptoJS.pad.AnsiX923,
  Iso10126: CryptoJS.pad.Iso10126,
  Iso97971: CryptoJS.pad.Iso97971,
  ZeroPadding: CryptoJS.pad.ZeroPadding,
  NoPadding: CryptoJS.pad.NoPadding
};

const encryption: React.FC = () => {
	// 状态声明
	const [method, setMethod] = useState<string>("AES");
	const [hashMethod, setHashMethod] = useState<string>("MD5");
	const [modeSelected, setModeSelected] = useState<string>("CBC");
	const [paddingSelected, setPaddingSelected] = useState<string>("Pkcs7");
	const [inputText, setInputText] = useState<string>("");
	const [key, setKey] = useState<string>("");
	const [iv, setIv] = useState<string>("");
	const [rsaKey, setRsaKey] = useState<forge.pki.rsa.KeyPair | null>(null);
	const [output, setOutput] = useState<string>("");

	// RSA密钥生成
	const generateRSAKeys = () => {
		const generatedKeys = forge.pki.rsa.generateKeyPair({ bits: 2048 });
		setRsaKey(generatedKeys);
	};

	// 加密函数
	const handleEncryptClick = () => {
		if (method === "AES" || method === "DES") {
			const mode = modes[modeSelected as keyof typeof modes];
			const padding = paddings[paddingSelected as keyof typeof paddings];
			const encrypted = CryptoJS[method].encrypt(
				inputText,
				CryptoJS.enc.Utf8.parse(key),
				{
					iv: CryptoJS.enc.Utf8.parse(iv),
					mode: mode,
					padding: padding,
				}
			);
			setOutput(encrypted.toString());
		} else if (method === "RSA" && rsaKey) {
			const encrypted = rsaKey.publicKey.encrypt(inputText, "RSA-OAEP");
			setOutput(forge.util.encode64(encrypted));
		} else if (method === "Hash") {
			const hashed = CryptoJS[hashMethod](inputText).toString();
			setOutput(hashed);
		}
	};

	// 解密函数
	const handleDecryptClick = () => {
		if (method === "AES" || method === "DES") {
			const mode = modes[modeSelected as keyof typeof modes];
			const padding = paddings[paddingSelected as keyof typeof paddings];
			const decrypted = CryptoJS[method].decrypt(
				output,
				CryptoJS.enc.Utf8.parse(key),
				{
					iv: CryptoJS.enc.Utf8.parse(iv),
					mode: mode,
					padding: padding,
				}
			);
			setOutput(decrypted.toString(CryptoJS.enc.Utf8));
		} else if (method === "RSA" && rsaKey) {
			const decrypted = rsaKey.privateKey.decrypt(
				forge.util.decode64(output),
				"RSA-OAEP"
			);
			setOutput(decrypted);
		}
		// 哈希算法没有解密过程
	};

	return (
		<div className="container mx-auto p-4">
			<div className="mb-4">
				<label
					className="block mb-2 text-sm font-bold text-gray-700"
					htmlFor="method"
				>
					加密方法
				</label>
				<select
					id="method"
					value={method}
					onChange={(e) => setMethod(e.target.value)}
					className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
				>
					<option value="AES">AES</option>
					<option value="DES">DES</option>
					<option value="RSA">RSA</option>
					<option value="Hash">哈希</option>
				</select>
			</div>

			{/* 根据加密方法展示不同的输入框 */}
			{method === "AES" || method === "DES" ? (
				<>
					{/* 模式选择 */}
					<div className="mb-4">
						<label
							className="block mb-2 text-sm font-bold text-gray-700"
							htmlFor="mode"
						>
							模式
						</label>
						<select
							id="mode"
							value={modeSelected}
							onChange={(e) => setModeSelected(e.target.value)}
							className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						>
							{Object.keys(modes).map((mode) => (
								<option
									key={mode}
									value={mode}
								>
									{mode}
								</option>
							))}
						</select>
					</div>
					{/* 填充选择 */}
					<div className="mb-4">
						<label
							className="block mb-2 text-sm font-bold text-gray-700"
							htmlFor="padding"
						>
							填充
						</label>
						<select
							id="padding"
							value={paddingSelected}
							onChange={(e) => setPaddingSelected(e.target.value)}
							className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						>
							{Object.keys(paddings).map((padding) => (
								<option
									key={padding}
									value={padding}
								>
									{padding}
								</option>
							))}
						</select>
					</div>
				</>
			) : null}

			{/* RSA和哈希不需要模式和填充选择，哈希还需要选择算法 */}
			{method === "Hash" && (
				<div className="mb-4">
					<label
						className="block mb-2 text-sm font-bold text-gray-700"
						htmlFor="hashMethod"
					>
						哈希算法
					</label>
					<select
						id="hashMethod"
						value={hashMethod}
						onChange={(e) => setHashMethod(e.target.value)}
						className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
					>
						<option value="MD5">MD5</option>
						<option value="SHA1">SHA-1</option>
						<option value="SHA256">SHA-256</option>
						{/* 其他哈希算法 */}
					</select>
				</div>
			)}

			{/* 输入文本 */}
			<div className="mb-4">
				<label
					className="block mb-2 text-sm font-bold text-gray-700"
					htmlFor="inputText"
				>
					输入文本
				</label>
				<textarea
					id="inputText"
					value={inputText}
					onChange={(e) => setInputText(e.target.value)}
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
				/>
			</div>

			{/* AES和DES需要密钥和IV */}
			{method === "AES" || method === "DES" ? (
				<>
					<div className="mb-4">
						<label
							className="block mb-2 text-sm font-bold text-gray-700"
							htmlFor="key"
						>
							密钥
						</label>
						<input
							type="text"
							id="key"
							value={key}
							onChange={(e) => setKey(e.target.value)}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>
					<div className="mb-4">
						<label
							className="block mb-2 text-sm font-bold text-gray-700"
							htmlFor="iv"
						>
							向量IV
						</label>
						<input
							type="text"
							id="iv"
							value={iv}
							onChange={(e) => setIv(e.target.value)}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>
				</>
			) : null}

			{/* 输出结果 */}
			<div className="mb-4">
				<label
					className="block mb-2 text-sm font-bold text-gray-700"
					htmlFor="output"
				>
					输出结果
				</label>
				<textarea
					id="output"
					value={output}
					readOnly
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				/>
			</div>

			{/* 按钮 */}
			<div className="flex items-center justify-between">
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					onClick={handleEncryptClick}
				>
					加密
				</button>
				{method !== "Hash" && (
					<button
						className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						onClick={handleDecryptClick}
					>
						解密
					</button>
				)}
			</div>
		</div>
	);
};

export default encryption;
