import React from "react";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

interface DatePickerProps {
	setDate: (date: Date) => void;
	selectedDate: Date;
}

// interface CustomDateInputProps {
// 	value?: string;
// 	onClick?: () => void;
// }

const DatePickerWrapper: React.FC<DatePickerProps> = ({
	setDate,
	selectedDate,
}) => {
	const CustomDateInput = React.forwardRef(({ value, onClick }, ref) => (
		<div
			className="flex items-center cursor-pointer"
			onClick={onClick}
		>
			<span className="mr-2">{value || "选择日期和时间"}</span>
			<FontAwesomeIcon icon={faCalendarAlt} />
		</div>
	));

	return (
		<DatePicker
			selected={selectedDate}
			onChange={(date: Date) => setDate(date)}
			timeInputLabel="Time:"
			dateFormat="yyyy/MM/dd HH:mm:ss"
			showTimeInput
			customInput={<CustomDateInput />}
		/>
	);
};

export default DatePickerWrapper;
