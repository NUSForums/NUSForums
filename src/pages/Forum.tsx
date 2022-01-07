import React, { useEffect, useState } from 'react';

import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHooks';
import { ModuleCondensed } from '../types/modules';
import { SearchCard } from '../components/SearchCard';

const Forum = () => {
  const { searchValue, mods, semester } = useAppSelector((state) => ({
    searchValue: state.search.value,
    mods: state.modules,
    semester: state.metadata.semester,
  }));
  let location = useLocation();

  const [filteredMods, setFilteredMods] = useState<ModuleCondensed[]>([]);

  useEffect(() => {
    if (mods) {
      const lowerCaseSearchVal = searchValue.toLowerCase();
      const upperCaseSearchVal = searchValue.toUpperCase();

      setFilteredMods([
        ...Object.values(mods).filter((mod) => {
          return (
            mod.semesters.includes(semester) &&
            (mod.moduleCode.includes(upperCaseSearchVal) || mod.title.toLowerCase().includes(lowerCaseSearchVal))
          );
        }),
      ]);
    }
  }, [searchValue, mods, semester]);

  useEffect(() => {
    console.log(searchValue);
  }, [searchValue]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full h-screen">
        <Header />
        <div className="w-full h-auto overflow-y-auto">
          {location.pathname === '/forum' ? (
            <div className="w-full h-full px-5 pt-2 pb-5">
              {filteredMods.map((mod) => {
                return <SearchCard moduleCode={mod.moduleCode} title={mod.title} />;
              })}
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
};

export default Forum;
