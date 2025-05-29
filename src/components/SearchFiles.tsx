import { Search } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SearchFiles: React.FC = () => {
	const [fileSearch, setFileSearch] = useState<string>("");
	const [searchParam, setSearchParam] = useSearchParams();

	function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
		const element = e.target as HTMLInputElement;
		const value = element.value.trim();
		setSearchParam({ value });

		if (value === "") {
			const newParams = new URLSearchParams(searchParam);
			newParams.delete("value");
			setSearchParam(newParams);
		}
		setFileSearch(value);
	}

	return (
		<div className="w-[90%] bg-background-primary rounded-[24px] items-center flex px-[24px] py-[10px] gap-[25px]  border border-border/[72%]">
			<Search size={30} strokeWidth={3} color="#5c4033" />
			<input
				onChange={(e) => handleOnChange(e)}
				value={fileSearch}
				className="w-full bg-transparent font-header2 outline-none text-[24px] text-text-100 placeholder:text-text-100/[77%] placeholder:italic"
				type="text"
				placeholder="Search files"
			/>
		</div>
	);
};

export default SearchFiles;
