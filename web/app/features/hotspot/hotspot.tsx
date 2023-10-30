"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { DebounceInput } from "react-debounce-input";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";
import {
	searchList,
	rankHistory,
	getTimeId,
	getTimeIdByName,
	getAllDataList,
	getTimeIdAndAllData,
} from "@/app/api/weibo";


function HotTopics() {
	const [topics, setTopics] = useState([]); // 从静态数据改为state，因为现在要从API获取
	const [searchQuery, setSearchQuery] = useState("");
	const [startDate, setStartDate] = useState(new Date());
	const [searchResults, setSearchResults] = useState([]);

	  const handleSearch = async (query:string) => {
			if (query) {
				try {
					const response = await searchList(query);
                    console.log(response.data)
					setSearchResults(response.data);
                    console.log(typeof searchResults);
                    console.log(searchResults);
                    
				} catch (error) {
					console.error("Error fetching search results:", error);
				}
			} else {
				setSearchResults([]);
			}
		};

	// const handleTopicClick = async (topic) => {
	//     // 例如，你可以根据点击的topic展示相关的历史排名
	//     // 以下是一个基本的例子
	//     const history = await rankHistory(topic);
	//     console.log(history);
	//     // 你可以在这里继续处理数据或更新组件状态以展示数据
	// }

	// 基于time_id 获取所有数据列表的api
	const fetchData = async () => {
		// 这里可以调用API根据日期获取话题
		// 假设你有一个API能这么做
		const allData = await getTimeIdAndAllData(startDate);
		if (allData && allData.data) {
			setTopics(allData.data);
		}
	};

	const fetchResults = async (quary:string) => {
		try {
			const response = await searchList(quary);
			console.log(response.data);
			setSearchResults(response.data);
		} catch (error) {
			console.error("Error fetching search results:", error);
		}
	};

	// 当选择日期变化时，我们也更新话题列表
	useEffect(() => {
		// 1、初始化此时此刻的time_id 数据列表渲染
		fetchData();
	}, [startDate, searchResults]);

	// 自定义组件，用于显示DatePicker的时间日期
	const CustomDateInput = React.forwardRef(({ value, onClick }, ref) => (
		<div
			className="flex items-center cursor-pointer"
			onClick={onClick}
		>
			<span className="mr-2">{value || "选择日期和时间"}</span>
			<FontAwesomeIcon icon={faCalendarAlt} />
		</div>
	));

	// 第三方图标svg库
	const getRankIcon = (index:number) => {
		return (
			<div className="flex items-center  mr-2">
				<FontAwesomeIcon
					icon={faCertificate}
					size="xs"
					className={`text-gray-500 ml-2 ${
						index < 3 ? "text-red-500" : ""
					}`}
				/>
			</div>
		);
	};

        const daysAgo = (dateStr:any) => {
			const now:any = new Date();
			const date:any = new Date(dateStr);
			const diff = now - date;
			const days = Math.floor(diff / (1000 * 60 * 60 * 24));
			return days;
		};

	return (
		<div className="bg-white p-6 rounded-lg shadow-md w-3/4 mx-auto mt-10">
			{/* 头部拦 */}
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center">
					<img
						src="/images/logo.png"
						alt="Logo"
						className="w-10 h-10 rounded-full mr-4"
					/>
					<span className="font-sans text-xl">热搜榜</span>
				</div>

				{/* 搜索框模块 */}
				<div className="relative">
					<DebounceInput
						minLength={2}
						debounceTimeout={300}
						onChange={(event) => {
							const query = event.target.value;
							setSearchQuery(query);
							if (query.trim() === "") {
								setSearchResults([]); // 当输入为空时，清空结果
							} else {
								handleSearch(query);
							}
						}}
						placeholder="搜索..."
						className="p-2 w-full sm:w-64 md:w-96 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
					/>
					{searchResults.length > 0 && (
						<div className="absolute top-full left-0 bg-white border border-gray-300 w-500 max-h-64 overflow-y-auto rounded-lg shadow-lg mt-3">
							{searchResults.map((item, index) => (
								<div
									key={item.id || index} // 使用item.id作为key更有意义，如果你的item有id字段的话
									className="p-2 hover:bg-gray-200 cursor-pointer flex justify-between items-center rounded-md transition-all duration-300 hover:shadow-lg"
									// onClick={() => {
									// 	// 添加点击事件，以便于用户可以点击某个搜索结果
									// 	handleResultClick(item);
									// }}
								>
									<div className="flex-1 pr-2">
										<div className="font-semibold text-xl font-mono">
											{item.title || item[0]}
										</div>
										<div className="text-gray-600 mt-2 text-base ">
											{item.description || item[1]}
										</div>
									</div>
									<div className="text-sm text-gray-500 ml-2 flex-none font-sans">
										{daysAgo(item.date || item[1])} 天前
									</div>
								</div>
							))}

							{/* {searchResults.length >= 10 && ( // 若搜索结果多于10条，提示用户还有更多
								<div className="p-2 text-gray-500 text-center">
									更多结果...
								</div>
							)} */}
						</div>
					)}
				</div>

				<div className="text-gray-500 text-xs flex items-center">
					<DatePicker
						selected={startDate}
						onChange={(date) => setStartDate(date)}
						timeInputLabel="Time:"
						dateFormat="yyyy/MM/dd HH:mm:ss"
						showTimeInput
						customInput={<CustomDateInput />}
					/>
				</div>
			</div>

			{/* 内容渲染 */}
			<div className="divide-y divide-gray-200">
				{topics.map((topic, index) => (
					<div
						key={index}
						className="py-2 flex justify-between items-center"
					>
						<div className="flex items-center">
							{getRankIcon(index)}
							<span className="text-gray-700 font-mono">
								{topic[0]}
							</span>
						</div>

						<div className="flex items-center">
							<span className="text-red-500 mr-1">🔥</span>
							<span className="text-sm text-gray-500 font-serif">
								{topic[3]}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default HotTopics;
