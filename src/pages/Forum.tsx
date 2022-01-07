import React, { useEffect, useState } from 'react';

import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { ModuleCondensed } from '../types/modules';

const Forum = () => {
  const { searchValue, mods, semester } = useAppSelector((state) => ({
    searchValue: state.search.value,
    mods: state.modules,
    semester: state.metadata.semester,
  }));
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
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
  }, [searchValue, mods]);

  useEffect(() => {
    console.log(searchValue);
  }, [searchValue]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />
        {/* <div className=""> */}
        {location.pathname === '/forum' ? (
          <div className="w-full h-full px-5 pt-2 pb-5">
            {filteredMods.map((mod) => {
              return (
                <button
                  className="flex flex-row items-center w-full py-2 mt-3 bg-gray-200 rounded-lg"
                  onClick={() => {
                    console.log(mod.moduleCode);
                    navigate(`/forum/${mod.moduleCode}`);
                    dispatch({ type: 'CLEAR_SEARCH' });
                  }}
                >
                  <p className="w-32 px-5 text-lg font-semibold tracking-wider text-left">{mod.moduleCode}</p>
                  <p className="text-base">{mod.title}</p>
                </button>
              );
            })}
          </div>
        ) : (
          <Outlet />
        )}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Forum;
