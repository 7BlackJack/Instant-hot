import React from "react";
import { DebounceInput } from "react-debounce-input";

interface SearchBarProps {
	onSearch: (query: string) => void;
	onResultClick?: (item: any) => void;
	searchResults: any[];
}

const SearchBar: React.FC<SearchBarProps> = ({
	onSearch,
	onResultClick,
	searchResults,
}) => {
	const daysAgo = (dateStr: string | number) => {
		const now = new Date();
		const date = new Date(dateStr);
		const diff = now.getTime() - date.getTime();
		return Math.floor(diff / (1000 * 60 * 60 * 24));
	};

	return (
		<div className="relative">
			<DebounceInput
				minLength={2}
				debounceTimeout={300}
				onChange={(event) => {
					const query = event.target.value;
					onSearch(query);
				}}
				placeholder="搜索..."
				className="p-2 w-500 sm:w-64 md:w-96 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
			/>
			{searchResults && searchResults.length > 0 && (
				<div className="absolute top-full left-0 bg-white border border-gray-300 w-500 max-h-64 overflow-y-auto rounded-lg shadow-lg mt-3">
					{searchResults.map((item, index) => (
						<div
							key={item.id || index}
							className="p-2 hover:bg-gray-200 cursor-pointer flex justify-between items-center rounded-md transition-all duration-300 hover:shadow-lg"
							onClick={() => {
								if (onResultClick) {
									onResultClick(item);
								}
							}}
						>
							<div className="flex-1 pr-2">
								<div className="font-semibold text-xl font-mono">
									{item.title || item[0]}
								</div>
								<div className="text-gray-600 mt-2 text-base">
									{item.description || item[1]}
								</div>
							</div>
							<div className="text-sm text-gray-500 ml-2 flex-none font-sans">
								{daysAgo(item.date || item[1])} 天前
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default SearchBar;
