"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Icon from "./Icon";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim()) {
      router.push(`/search?query=${encodeURIComponent(value)}`);
    } else {
      router.push(`/`);
    }
  };

  return (
    <div className="relative">
      <Icon type="search" className="my-2 pt-1 absolute left-2 text-gray-500" />
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        className="w-[17rem] py-2 pl-8 pr-4 bg-boardBG border-[1px] border-border text-[1rem] rounded-md focus:outline-none focus:border-primary focus:bg-white placeholder:text-grayText"
        placeholder="검색어를 입력하세요."
      />
    </div>
  );
};

export default SearchBar;
