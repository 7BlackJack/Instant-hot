import React, { useState, useEffect } from "react";
import SearchBar from "./Searchbar";
import DatePickerWrapper from "./DatePickerWrapper";
import TopicList from "./TopicList";
// import TopicChart from "./TopicChart"; // 导入 ECharts 组件
import { searchList, getTimeIdAndAllData, rankHistory } from "@/app/api/weibo"; // 假设你的API函数

interface IChartData {
	timestamp: string[];
	rank: number[];
	hotValue: number[];
}

const HotTopics: React.FC = () => {
	const [startDate, setStartDate] = useState(new Date());
	const [topics, setTopics] = useState<string[][]>([]);
	const [searchResults, setSearchResults] = useState<string[][]>([]);
	const [chartDataList, setChartDataList] = useState<IChartData[]>([]); // 存储所有话题的图表数据

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

	// const handleTopicClick = async (topicName: string, index: number) => {
	// 	let prevTopicName = index > 0 ? topics[index - 1][0] : "";
	// 	let nextTopicName =
	// 		index < topics.length - 1 ? topics[index + 1][0] : "";
	// 	const topicNames = [prevTopicName, topicName, nextTopicName];
	// 	let chartDataList = await rankHistory(topicNames);
	// 	console.log(chartDataList);

	// 	if (chartDataList[index]) {
	// 		// 假设 chartDataList 是一个包含三个话题数据的数组
	// 		// 每个话题数据是一个对象，包含 timestamp、rank 和 hotValue 数组
	// 		// 下面的代码将第index个话题（当前点击的话题）的数据用于图表
	// 		const currentTopicData = chartDataList[index].data;
	// 		setChartData({
	// 			timestamp: currentTopicData[0], // timestamp,
	// 			rank: currentTopicData[1].map(Number), // rank.map(Number), // 转换为数字类型
	// 			hotValue: currentTopicData[2].map(Number), // hotValue.map(Number), // 转换为数字类型
	// 		});
	// 	}
	// 	setSelectedTopicIndex(index); // 设置当前选中的话题索引
	// };
	const handleTopicClick = async (topicName: string, index: number) => {
		let prevTopicName = index > 0 ? topics[index - 1][0] : "";
		let nextTopicName =
			index < topics.length - 1 ? topics[index + 1][0] : "";
		const topicNames = [prevTopicName, topicName, nextTopicName];

		try {
			const chartDataResponses = await rankHistory(topicNames);
			// 更新chartDataList中对应话题的数据
			const updatedChartDataList = [...chartDataList];
			updatedChartDataList[index] = {
				timestamp: chartDataResponses[1].data[0],
				rank: chartDataResponses[1].data[1].map(Number),
				hotValue: chartDataResponses[1].data[2].map(Number),
			};
			setChartDataList(updatedChartDataList);
		} catch (error) {
			console.error("Error fetching rank history:", error);
		}
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
		<div className="bg-white p-6 rounded-lg shadow-md w-4/5 mx-auto mt-10">
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
			{/* 点击 TopicList 中的一个话题时，handleTopicClick 会被调用，它会请求数据，设置图表数据，并记录当前选中话题的索引。如果选中了话题（selectedTopicIndex 不为 null），并且有图表数据（chartData 不为 null），则会渲染 TopicChart 组件。 */}
			<TopicList
				topics={topics}
				onTopicClick={handleTopicClick}
				chartDataList={chartDataList} // 传递给TopicList组件
			/>
			{/* {selectedTopicIndex !== null && chartData && (
				<TopicChart data={chartData} />
			)} */}
		</div>
	);
};

export default HotTopics;
