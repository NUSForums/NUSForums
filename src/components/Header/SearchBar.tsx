import React, { useEffect, useState } from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-hooks';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue, 300);
  const dispatch = useAppDispatch();
  const resetIndicator = useAppSelector((state) => state.search.shouldClear);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: 'SET_SEARCH', payload: debouncedSearch });
  }, [debouncedSearch, dispatch]);

  useEffect(() => {
    if (resetIndicator) {
      setSearchValue('');
    }
  }, [resetIndicator, dispatch]);

  return (
    <div
      onClick={() => navigate('/forum')}
      className={`flex flex-row items-center h-8 px-4 py-5 bg-forum-searchbar rounded-3xl ${className}`}
    >
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
