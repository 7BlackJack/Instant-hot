import React, { useState, useEffect } from "react";
import SearchBar from "./Searchbar";
import DatePickerWrapper from "./DatePickerWrapper";
import TopicList from "./TopicList";
import { searchList, getTimeIdAndAllData, rankHistory } from "@/app/api/weibo"; // 假设你的API函数

const HotTopics: React.FC = () => {
	const [startDate, setStartDate] = useState(new Date());
	const [topics, setTopics] = useState<string[][]>([]);
	const [searchResults, setSearchResults] = useState<string[][]>([]);

	const handleSearch = async (query: string) => {
		if (query) {
			try {
				const response = await searchList(query);
				setSearchResults(response.data);
			} catch (error) {
				console.error("Error fetching search results:", error);
			}
		} else {
			setSearchResults([]);
		}
	};

	const handleResultClick = (item: any) => {
		// 这里是点击搜索结果后的处理逻辑，你可以根据业务需要进行定义。
		console.log("Clicked result:", item);
	};

	const handleTopicClick = async (topicName: string, index: number) => {
		let prevTopicName = index > 0 ? topics[index - 1][0] : "";
		let nextTopicName =
			index < topics.length - 1 ? topics[index + 1][0] : "";
		const topicNames = [prevTopicName, topicName, nextTopicName];
		let chartDataList = await rankHistory(topicNames);
		console.log(chartDataList);
	};

	const fetchData = async () => {
		const allData = await getTimeIdAndAllData(startDate);
		if (allData && allData.data) {
			setTopics(allData.data);
		}
	};

	useEffect(() => {
		fetchData();
	}, [startDate, searchResults]);

	return (
		<div className="bg-white p-6 rounded-lg shadow-md w-3/4 mx-auto mt-10">
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center">
					<img
						src="/images/logo.png"
						alt="Logo"
						className="w-10 h-10 rounded-full mr-4"
					/>
					<span className="font-sans text-xl">热搜榜</span>
				</div>

				<SearchBar
					onSearch={handleSearch}
					searchResults={searchResults}
					onResultClick={handleResultClick}
				/>

				<DatePickerWrapper
					setDate={setStartDate}
					selectedDate={startDate}
				/>
			</div>

			<TopicList
				topics={topics}
				onTopicClick={handleTopicClick}
			/>
		</div>
	);
};

export default HotTopics;
