import React, { useState, useEffect } from "react";
import { translateText } from "@/app/api/translate"; // Ensure this path is correct
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMicrophone,
	faGlobe,
	faBook,
	faGraduationCap,
	faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import { log } from "console";

const Fanyi: React.FC = () => {
	const [inputText, setInputText] = useState("");
	const [translationData, setTranslationData] = useState<any>(null);
	const [timeoutId, setTimeoutId] = useState<ReturnType<
		typeof setTimeout
	> | null>(null);

	// 音频播放的状态
	const [audioSrc, setAudioSrc] = useState({ uk: "", us: "" });

	useEffect(() => {
		if (timeoutId) clearTimeout(timeoutId);

		if (inputText) {
			const newTimeoutId = setTimeout(() => {
				handleTranslation();
			}, 1000);
			setTimeoutId(newTimeoutId);
		}

		return () => {
			if (timeoutId) clearTimeout(timeoutId);
		};
	}, [inputText]);

	const handleTranslation = async () => {
		try {
			const response = await translateText(inputText);
			if (!response || response.code === 40) {
				setTranslationData("提供的文本没有找到翻译.");
			} else {
				setTranslationData(response); // Set the entire response data

				// Check if dictionary results exist before setting audio source
				if (response.dictResult?.ec?.word) {
					const { word } = response.dictResult.ec;
					console.log(word);
					setAudioSrc({
						uk: `https://dict.youdao.com/dictvoice?audio=${word.ukspeech}`,
						us: `https://dict.youdao.com/dictvoice?audio=${word.usspeech}`,
					});
				}
			}
		} catch (error) {
			console.error("Error:", error);
			setTranslationData("翻译错误");
		}
	};

	const playAudio = (type) => {
		const audioUrl = type === "uk" ? audioSrc.uk : audioSrc.us;
		const audio = new Audio(audioUrl);
		audio
			.play()
			.catch((error) => console.error("Audio playback failed:", error));
	};

	const handleKeyUp = () => {
		if (timeoutId) clearTimeout(timeoutId);
		const newTimeoutId = setTimeout(() => {
			handleTranslation();
		}, 1000);
		setTimeoutId(newTimeoutId);
	};

	const renderTranslation = () => {
		if (!translationData) return null;

		if (typeof translationData === "string") {
			return (
				<p className="text-center text-red-500">{translationData}</p>
			);
		}

		const { translateResult, dictResult } = translationData;
		const dict = dictResult?.ec?.word;
		const examTypes = dictResult?.ec?.exam_type;
		const wordForms = dict?.wfs;

		return (
			<div className="mt-4 p-4 border-t border-gray-200">
				{translateResult[0].map((part, index) => (
					<div
						key={index}
						className="mt-2"
					>
						<div className="text-xl font-bold">{part.tgt}</div>
						<div className="text-sm text-gray-600">
							{part.tgtPronounce}
						</div>
					</div>
				))}
				<div className="flex flex-wrap text-sm text-gray">
					{dict?.usphone && (
						<div className="text-sm text-gray-600 mb-2 mr-2">
							<FontAwesomeIcon
								icon={faVolumeUp}
								className="inline mr-2 cursor-pointer"
								onClick={() => playAudio("uk")}
							/>
							英 / {dict.usphone}
						</div>
					)}
					{dict?.ukphone && (
						<div className="text-sm text-gray-600 mb-4">
							<FontAwesomeIcon
								icon={faGlobe}
								className="inline mr-2 cursor-pointer"
								onClick={() => playAudio("us")}
							/>
							美 / {dict.ukphone}
						</div>
					)}
				</div>
				{dict?.trs && (
					<div className="space-y-2">
						{dict.trs.map((item, index) => (
							<div
								key={index}
								className="flex items-center"
							>
								<span className="text-sm font-medium text-gray-500 w-8">
									{item.pos}
								</span>
								<span className="ml-2 text-gray-800">
									{item.tran}
								</span>
							</div>
						))}
					</div>
				)}
				{/* {translation.tgtPronounce && (
					<div className="text-sm text-gray-600">
						{translation.tgtPronounce}
					</div>
				)} */}
				{examTypes && examTypes.length > 0 && (
					<div className="flex items-center bg-gray-100 p-2 rounded mt-4">
						<FontAwesomeIcon
							icon={faGraduationCap}
							className="text-gray-500 mr-2"
						/>
						<span className="text-sm font-medium text-gray-500">
							考试类型 :
						</span>
						<div className="flex flex-wrap ml-2">
							{examTypes.map((type, index) => (
								<span
									key={index}
									className="ml-1 text-gray-500"
								>
									{type}/
								</span>
							))}
						</div>
					</div>
				)}
				{wordForms && wordForms.length > 0 && (
					<div className="bg-gray-100 p-2 rounded mt-4">
						<div className="text-sm text-gray-500 mb-1">
							<FontAwesomeIcon
								icon={faBook}
								className="inline mr-2"
							/>
							Word Forms:
						</div>
						<ul className="list-disc list-inside">
							{wordForms.map((form, index) => (
								<li
									key={index}
									className="text-gray-500"
								>
									{form.wf.name}: {form.wf.value}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		);
	};

	return (
		<div className="flex flex-col items-center h-screen bg-gray-100 p-5">
			<div className="w-full max-w-3xl bg-white p-5 rounded-lg shadow-lg">
				<textarea
					className="w-full p-2 mb-5 text-lg border-b focus:outline-none"
					placeholder="请输入文本"
					value={inputText}
					onChange={(e) => setInputText(e.target.value)}
					onKeyUp={handleKeyUp}
					rows={2}
				/>
				{renderTranslation()}
			</div>
		</div>
	);
};

export default Fanyi;
