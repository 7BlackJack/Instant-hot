import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCertificate,
	faClock,
	faHourglassEnd,
	faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import TopicChart from "./TopicChart"; // 确保导入 TopicChart 组件
import { differenceInMinutes, format } from "date-fns"; // 导入 date-fns 库中的函数

interface TopicListProps {
	topics: string[][];
	onTopicClick: (topicName: string, index: number) => void;
	chartDataList: any[]; // 从 hotspot 传递的所有话题的图表数据
}

const TopicList: React.FC<TopicListProps> = ({
	topics,
	onTopicClick,
	chartDataList,
}) => {
	const [selectedTopicIndex, setSelectedTopicIndex] = useState<number | null>(
		null
	);

	const handleTopicClick = (topicName: string, index: number) => {
		setSelectedTopicIndex(selectedTopicIndex === index ? null : index); // 如果点击已选中的项，则关闭图表
		onTopicClick(topicName, index);
	};

	const getRankIcon = (index: number) => {
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

	// Function to format date (make sure you define this function within your component or module)
	const formatDate = (dateString: string): string => {
		const date = new Date(dateString);
		return date.toLocaleString("zh-CN", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		});
	};

	// Function to calculate the duration in minutes
	const calculateDuration = (start: string, end: string): number => {
		const startTime = new Date(start).getTime();
		const endTime = new Date(end).getTime();
		return Math.round((endTime - startTime) / (1000 * 60));
	};

	return (
		<div className="divide-y divide-gray-200">
			{topics.map((topic, index) => (
				<React.Fragment key={index}>
					<div
						className="py-2 flex justify-between items-center cursor-pointer"
						onClick={() => handleTopicClick(topic[0], index)}
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
					{/* {selectedTopicIndex === index &&
						chartDataList &&
						chartDataList[index] && (
							<TopicChart data={chartDataList[index]} />
						)} */}
					{selectedTopicIndex === index && (
						<div className="mt-4 mb-4 p-4 border rounded-lg shadow-lg bg-white">
							<div className="flex flex-col md:flex-row justify-between items-center mb-4">
								<div className="flex items-center mb-2 md:mb-0">
									<FontAwesomeIcon
										icon={faClock}
										className="text-gray-400 mr-2"
									/>
									<div className="text-sm text-gray-600">
										<span className="font-semibold">
											上榜时间:
										</span>{" "}
										{formatDate(topic[2])}
									</div>
								</div>
								<div className="flex items-center mb-2 md:mb-0">
									<FontAwesomeIcon
										icon={faHourglassEnd}
										className="text-gray-400 mr-2"
									/>
									<div className="text-sm text-gray-700">
										<span className="font-semibold">
											最后在榜:
										</span>{" "}
										{formatDate(topic[1])}
									</div>
								</div>
								<div className="flex items-center">
									<FontAwesomeIcon
										icon={faChartLine}
										className="text-gray-400 mr-2"
									/>
									<div className="text-sm text-gray-700">
										<span className="font-semibold">
											在榜总计:
										</span>
										{calculateDuration(topic[2], topic[1])}
										分钟
									</div>
								</div>
							</div>
							{chartDataList && chartDataList[index] && (
								<TopicChart data={chartDataList[index]} />
							)}
						</div>
					)}
				</React.Fragment>
			))}
		</div>
	);
};

export default TopicList;
