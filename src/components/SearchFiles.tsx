import { Search } from "lucide-react";
import { ChangeEvent, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";

const SearchFiles: React.FC = () => {
	const [fileSearch, setFileSearch] = useState<string>("");
	const [searchParam, setSearchParam] = useSearchParams();

	// Debounce the search input to avoid excessive URL updates
	const debouncedSearch = useDebounce(fileSearch, 500);

	// Initialize search input from URL parameter
	useEffect(() => {
		const urlSearchValue = searchParam.get("value") || "";
		setFileSearch(urlSearchValue);
	}, [searchParam]);

	// Update URL when debounced search changes
	useEffect(() => {
		const currentUrlValue = searchParam.get("value") || "";

		// Only update URL if the debounced value is different from current URL
		if (debouncedSearch !== currentUrlValue) {
			if (debouncedSearch.trim() === "") {
				const newParams = new URLSearchParams(searchParam);
				newParams.delete("value");
				setSearchParam(newParams, { replace: true });
			} else {
				const newParams = new URLSearchParams(searchParam);
				newParams.set("value", debouncedSearch.trim());
				setSearchParam(newParams, { replace: true });
			}
		}
	}, [debouncedSearch, searchParam, setSearchParam]);

	function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
		const element = e.target as HTMLInputElement;
		const value = element.value;
		setFileSearch(value);
	}

	return (
		<div className="w-full bg-background-primary rounded-[24px] items-center flex px-[18px] py-[8px] md:px-[24px] md:py-[10px] gap-[25px] border border-border/[72%]">
			<Search size={30} strokeWidth={3} color="#5c4033" />
			<input
				onChange={handleOnChange}
				value={fileSearch}
				className="w-full bg-transparent font-header2 outline-none text-[18px] md:text-[24px] text-text-100 placeholder:text-text-100/[77%] placeholder:italic"
				type="text"
				placeholder="Search files"
			/>
		</div>
	);
};

export default SearchFiles;
