import React from "react";
import {
	DateTimePicker as MuiDateTimePicker,
	LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

interface DatePickerProps {
	setDate: (date: Date | null) => void;
	selectedDate: Date;
}

interface CustomDateInputProps {
	value?: string;
	onClick?: () => void;
}

const DatePickerWrapper: React.FC<DatePickerProps> = ({
	setDate,
	selectedDate,
}) => {
	const CustomDateInput = React.forwardRef<
		HTMLInputElement,
		CustomDateInputProps
	>(({ value, onClick }, ref) => (
		<button
			onClick={onClick}
			className="flex items-center cursor-pointer"
			ref={ref}
		>
			<span className="mr-2">{value || "选择日期和时间"}</span>
			<FontAwesomeIcon icon={faCalendarAlt} />
		</button>
	));

	CustomDateInput.displayName = "CustomDateInput";

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<MuiDateTimePicker
				value={selectedDate}
				onChange={setDate}
				renderInput={(params) => (
					<TextField
						{...params}
						InputProps={{
							...params.InputProps,
							endAdornment: (
								<React.Fragment>
									{params.InputProps?.endAdornment}
									<CustomDateInput
										value={
											params.inputProps?.value as string
										}
										onClick={params.inputProps?.onClick}
									/>
								</React.Fragment>
							),
						}}
					/>
				)}
				ampm={false} // Use 24-hour clock
				inputFormat="yyyy/MM/dd HH:mm:ss" // The format string
			/>
		</LocalizationProvider>
	);
};

export default DatePickerWrapper;
