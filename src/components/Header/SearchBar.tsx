import React, { useEffect, useState } from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useDebounce } from 'use-hooks';

interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue, 300);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'SET_SEARCH', payload: debouncedSearch });
  }, [debouncedSearch, dispatch]);

  return (
    <div className={`flex flex-row items-center h-8 px-4 py-5 bg-gray-100 rounded-3xl ${className}`}>
      <MdOutlineSearch size={20} />
      <input
        type="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search for modules"
        className="w-full ml-2 text-base bg-transparent focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
