// TopicChart.tsx
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { EChartsOption } from "echarts";

interface TopicChartProps {
	data: {
		timestamp: string[];
		rank: number[];
		hotValue: number[];
	};
}

const TopicChart: React.FC<TopicChartProps> = ({ data }) => {
	const chartRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (chartRef.current) {
			const chartInstance = echarts.init(chartRef.current);

			const option: EChartsOption = {
				tooltip: {
					trigger: "axis",
				},
				legend: {
					data: ["排名", "热度"],
				},
				xAxis: {
					type: "category",
					data: data.timestamp,
				},
				yAxis: [
					{
						type: "value",
						name: "排名",
						inverse: true,
						min: 1,
						max: (value) => Math.max(...data.rank) + 5, // 加5为了更好的视觉效果
					},
					{
						type: "value",
						name: "热度",
						min: 0,
						max: (value) => Math.max(...data.hotValue) + 100000, // 加上一些边界值
					},
				],
				series: [
					{
						name: "排名",
						type: "line",
						data: data.rank,
						yAxisIndex: 0,
						smooth: true,
						itemStyle: {
							color: "#FF0000",
						},
					},
					{
						name: "热度",
						type: "line",
						data: data.hotValue,
						yAxisIndex: 1,
						smooth: true,
						itemStyle: {
							color: "#00FF00",
						},
					},
				],
			};

			chartInstance.setOption(option);

			return () => {
				chartInstance.dispose(); // 在组件卸载时清理资源
			};
		}
	}, [data]);

	return (
		<div
			ref={chartRef}
			style={{ width: "100%", height: "400px" }}
		/>
	);
};

export default TopicChart;
