import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";

interface TopicListProps {
	topics: string[][];
	onTopicClick: (topicName: string, index: number) => void;
}

const TopicList: React.FC<TopicListProps> = ({ topics, onTopicClick }) => {
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

	return (
		<div className="divide-y divide-gray-200">
			{topics.map((topic, index) => (
				<div
					key={index}
					className="py-2 flex justify-between items-center"
					onClick={() => onTopicClick(topic[0], index)}
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
	);
};

export default TopicList;
